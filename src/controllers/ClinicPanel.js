const AppointmentService = require("../services/Appointments");
const UserService = require("../services/Users");
const BlogService = require("../services/Blogs");
const DialysisCenterService = require("../services/DialysisCenters");
const Promotions = require("../models/Promotions");

const passport = require("passport");
require("../scripts/utils/passport-local-config")(passport);

const { passwordToHash, hashToPassword } = require("../scripts/utils/helper");
const ErrorMessage = require("../scripts/utils/errorMessages");
const HtmlMessage = require("../scripts/utils/htmlMessages");

const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");

class ClinicPanelController {
  async index(req, res, next) {
    const center = req.query.clinic;

    if (req.user.centerList.length > 0) {
      if (center) {
        DialysisCenterService.findById(center)
          .then((center) => {
            res.cookie("clinic", center);
            return res.render("clinic-panel/pages/panel/index", { layout: "clinic-panel/layouts/panel", user: req.user, center });
          })
          .catch((err) => {
            console.log(err);
            return res.redirect("/panel");
          });
      } else {
        await res.cookie("clinic", req.user.centerList[0]);
        return res.render("clinic-panel/pages/panel/index", { layout: "clinic-panel/layouts/panel", user: req.user, center: req.user.centerList[0] });
      }
    } else {
      res.redirect("/panel/choose-personel");
    }
  }

  loginView(req, res) {
    res.render("clinic-panel/pages/clinic-login", { layout: "clinic-panel/layouts/index" });
  }

  login(req, res, next) {
    req.flash("email", req.body.email);
    req.flash("password", req.body.password);
    if (req.errors) {
      const htmlMessage = new HtmlMessage(req.errors, "danger");
      req.flash("validationErrors", htmlMessage);
      return res.redirect("/panel/register");
    } else {
      UserService.find({ email: req.body.email, isAdmin: true })
        .then((user) => {
          console.log(user);
          if (user) {
            passport.authenticate("local", {
              successRedirect: "/panel",
              failureRedirect: "/panel/login",
              failureFlash: true,
            })(req, res, next);
          } else {
            res.redirect("/panel/login");
          }
        })
        .catch((err) => {
          console.log("Hata :", err);
        });
    }
  }

  logout(req, res, next) {
    req.logout();
    req.session.destroy((error) => {
      res.clearCookie("connect.sid");
      res.render("clinic-panel/pages/clinic-login", { layout: "clinic-panel/layouts/index" });
    });
  }

  registerView(req, res) {
    res.render("clinic-panel/pages/clinic-register", { layout: "clinic-panel/layouts/index" });
  }

  async register(req, res, next) {
    const enterPassword = req.body.password;
    if (req.errors) {
      const htmlMessage = new HtmlMessage(req.errors, "danger");
      req.flash("validationErrors", htmlMessage);
      req.flash("nameSurname", req.body.nameSurname);
      req.flash("email", req.body.email);
      req.flash("phone", req.body.phone);
      req.flash("password", enterPassword);
      req.flash("birthDate", req.body.birthDate);
      return res.redirect("/panel/login");
    } else {
      try {
        req.body.password = passwordToHash(enterPassword);
        req.body.birthDate = new Date(req.body.birthDate);
        req.body.isAdmin = true;

        const data = await UserService.create(req.body);
        const token = jwt.sign(
          {
            id: data._id,
            email: data.email,
          },
          process.env.CONFIRM_SECRET,
          { expiresIn: "1d" }
        );

        const verifyURL = process.env.MAIL_VERIFY_URL + "panel/activation?token=" + token;
        let transporter = mailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
          },
        });
        await transporter.sendMail(
          {
            from: "@Dialysing <info@dialysing.com",
            to: data.email,
            subject: "Emailinizi Onaylayınız.",
            text: "Emailinizi Onaylamak için Linke Tıklayın " + verifyURL,
          },
          (error) => {
            if (error) {
              console.log("Send Mail Error: " + error);
            }
            transporter.close();
          }
        );
        return res.render("clinic-panel/pages/clinic-activation", { layout: "clinic-panel/layouts/index" });
      } catch (err) {
        console.log("Hata Çıktı :", err);
        const message = ErrorMessage.printMessage(err);
        if (message != undefined) {
          const htmlMessage = new HtmlMessage(message, "danger");
          req.flash("validationErrors", htmlMessage);
          req.flash("nameSurname", req.body.nameSurname);
          req.flash("email", req.body.email);
          req.flash("phone", req.body.phone);
          req.flash("password", enterPassword);
          return res.redirect("/panel/login");
        }
        const htmlMessage = new HtmlMessage("Kayıt İşlemi Sırasında Hata Oluştu.", "danger");
        req.flash("validationErrors", htmlMessage);
        req.flash("nameSurname", req.body.nameSurname);
        req.flash("email", req.body.email);
        req.flash("phone", req.body.phone);
        req.flash("password", enterPassword);
        return res.redirect("/panel/login");
      }
    }
  }

  activation(req, res) {
    console.log("Buradaa", req.query.token);
    const token = req.query.token;
    if (token) {
      try {
        jwt.verify(token, process.env.CONFIRM_SECRET, async (e, decoded) => {
          if (e) {
            req.flash("validationErrors", [{ msg: "Geçersiz Token. Lütfen Yeniden Kayıt Olun.." }]);
            res.redirect("/panel/login");
          } else {
            const userID = decoded.id;
            const result = await UserService.update(userID, { emailConfirmed: true });
            if (result) {
              req.flash("validationErrors", [{ msg: "Emailiniz Onaylanmıştır.", result: "success" }]);
              res.redirect("/panel/login");
            } else {
              req.flash("validationErrors", [{ msg: "Bir Hata Çıktı Daha Sonra Tekrar Deneyin.." }]);
              res.redirect("/panel/login");
            }
          }
        });
      } catch (error) {
        console.log("authController verify Error" + error);
      }
    } else {
      console.log("Token is NULL");
    }
  }

  choosePersonel(req, res) {
    const user = req.user;
    if (user.isAdmin) {
      res.render("clinic-panel/pages/add-clinic/choose-personel", { layout: "clinic-panel/layouts/index", user });
    } else {
      req.logout();
      req.session.destroy((error) => {
        res.clearCookie("connect.sid");
        res.render("clinic-panel/pages/clinic-login", { layout: "clinic-panel/layouts/index" });
      });
    }
  }

  chooseCenter(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    if (dialysingCenter != undefined) {
    

      dialysingCenter.personalInformation.nameSurname = req.body.nameSurname;
      dialysingCenter.personalInformation.email = req.body.email;
      dialysingCenter.personalInformation.phone = req.body.phone;
      dialysingCenter.personalInformation.job = req.body.job;
      res.cookie("selectedDialysingCenter", dialysingCenter);
    }
    res.render("clinic-panel/pages/add-clinic/choose-center", { layout: "clinic-panel/layouts/index", list: undefined });
  }

  chooseCenterView(req, res) {
    res.render("clinic-panel/pages/add-clinic/choose-center", { layout: "clinic-panel/layouts/index", list: undefined, center: req.cookies.selectedDialysingCenter });
  }

  getClinicList(req, res) {
    console.log("getClinicList");
    DialysisCenterService.indexTop10({ "companyInformation.companyName": { $regex: req.body.companyName, $options: "i" } })
      .then((centers) => {
        res.render("clinic-panel/pages/add-clinic/choose-center", { layout: "clinic-panel/layouts/index", list: centers || [] });
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  companyInformationView(req, res) {
    res.render("clinic-panel/pages/add-clinic/company-information", { layout: "clinic-panel/layouts/index", center: req.cookies.selectedDialysingCenter });
  }

  companyInformation(req, res) {
    DialysisCenterService.findById(req.body.companyId)
      .then((center) => {
        if (center) {
          res.cookie("selectedDialysingCenter", center);
          res.render("clinic-panel/pages/add-clinic/company-information", { layout: "clinic-panel/layouts/index", center });
        } else {
          res.render("clinic-panel/pages/add-clinic/company-information", { layout: "clinic-panel/layouts/index" });
        }
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  chooseAddressView(req, res) {
    res.render("clinic-panel/pages/add-clinic/choose-address", { layout: "clinic-panel/layouts/index", center: req.cookies.selectedDialysingCenter });
  }

  chooseAddress(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;

    dialysingCenter.companyInformation.companyName = req.body.companyName;
    dialysingCenter.address.addressDetailText = req.body.addressDetailText;
    dialysingCenter.companyInformation.taxNumber = req.body.taxNumber;
    dialysingCenter.companyInformation.taxOffice = req.body.taxOffice;

    res.cookie("selectedDialysingCenter", dialysingCenter);

    if (req.cookies.selectedDialysingCenter) {
      res.render("clinic-panel/pages/add-clinic/choose-address", { layout: "clinic-panel/layouts/index", center: req.cookies.selectedDialysingCenter });
    } else {
      res.render("clinic-panel/pages/add-clinic/choose-address", { layout: "clinic-panel/layouts/index" });
    }
  }

  addressCorrectionView(req, res) {
    res.render("clinic-panel/pages/add-clinic/address-correction", { layout: "clinic-panel/layouts/index" });
  }

  async addressCorrection(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;

    dialysingCenter.address.country = req.body.country;
    dialysingCenter.address.city = req.body.city;
    dialysingCenter.address.addressDetailText = req.body.addressDetailText;
    dialysingCenter.address.zipCode = req.body.zipCode;

    dialysingCenter.contactInformation.phone = req.body.phone;
    dialysingCenter.contactInformation.whatsapp = req.body.whatsapp;
    dialysingCenter.contactInformation.website = req.body.website;
    dialysingCenter.companyInformation.bio = req.body.bio;

    await res.cookie("selectedDialysingCenter", dialysingCenter);

    res.render("clinic-panel/pages/add-clinic/address-correction", { layout: "clinic-panel/layouts/index" });
  }

  clinicDetail(req, res) {
    res.render("clinic-panel/pages/add-clinic/clinic-detail", { layout: "clinic-panel/layouts/index" });
  }

  clinicServices(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;

    dialysingCenter.centerDetails.buildType = req.body.buildType;
    dialysingCenter.centerDetails.centerType = req.body.centerType;
    dialysingCenter.centerDetails.parkingType = req.body.parkingType;
    dialysingCenter.centerDetails.centerServices = req.body.centerServices;

    res.cookie("selectedDialysingCenter", dialysingCenter);

    res.render("clinic-panel/pages/add-clinic/clinic-services", { layout: "clinic-panel/layouts/index" });
  }

  paymentOption(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;

    dialysingCenter.services.dialysisType = req.body.dialysisType;
    dialysingCenter.services.inSessionService = req.body.inSessionService;
    dialysingCenter.services.languages = req.body.languages;
    dialysingCenter.services.interpreterPrice = req.body.interpreterPrice;

    res.cookie("selectedDialysingCenter", dialysingCenter);

    res.render("clinic-panel/pages/add-clinic/payment-option", { layout: "clinic-panel/layouts/index" });
  }

  doctors(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    //res.clearCookie("selectedDialysingCenter");

    dialysingCenter.Payment.paymentTypes = req.body.paymentTypes;
    dialysingCenter.Payment.abroadPatientPaymentTypes = req.body.abroadPatientPaymentTypes;

    res.cookie("selectedDialysingCenter", dialysingCenter);

    res.render("clinic-panel/pages/add-clinic/doctors", { layout: "clinic-panel/layouts/index" });
  }

  clinicSummary(req, res) {
    res.render("clinic-panel/pages/add-clinic/clinic-summary", { layout: "clinic-panel/layouts/index" });
  }

  clinicSave(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    dialysingCenter.personalInformation = req.user;
    DialysisCenterService.update(dialysingCenter._id, dialysingCenter)
      .then((center) => {
        req.user.centerList.push(center._id);
        UserService.update(req.user._id, req.user)
          .then((user) => {
            res.clearCookie("selectedDialysingCenter");
            res.redirect("/panel");
          })
          .catch((error) => {
            console.log("Hata Çıktı :", error);
          });
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  // createDialysisCenter(req, res, next) {
  //   DialysisCenterService.create(req.body).then(data => {
  //     res.redirect("panel");
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

  analysis(req, res, next) {
    res.render("clinic-panel/pages/panel/analysis", { layout: "clinic-panel/layouts/panel", user: req.user  });
  }

  answerWaitingRezervations(req, res, next) {
    var center = req.cookies.clinic;

    AppointmentService.index({ dialysisCenter: center._id, isActive: false, isCancelled: false })
      .then((appointments) => {
        res.render("clinic-panel/pages/panel/answer-waiting-rezervations", { layout: "clinic-panel/layouts/panel", user: req.user, center, appointments });
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  acceptAppointment(req, res, next) {
    var appointmentId = req.params.id;
    AppointmentService.update(appointmentId, { isActive: true })
      .then((appointment) => {
        res.redirect("/panel/answer-waiting-rezervations");
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  oncomingRezervations(req, res, next) {
    var center = req.cookies.clinic;

    AppointmentService.index({ dialysisCenter: center._id, isActive: true, isCancelled: false, checkInDate: { $gte: new Date() } })
      .then((appointments) => {
        res.render("clinic-panel/pages/panel/oncoming-rezervations", { layout: "clinic-panel/layouts/panel", user: req.user, center, appointments });
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  completedRezervations(req, res, next) {
    var center = req.cookies.clinic;

    AppointmentService.index({ dialysisCenter: center._id, isActive: true, checkInDate: { $lte: new Date() } })
      .then((appointments) => {
        res.render("clinic-panel/pages/panel/completed-rezervations", { layout: "clinic-panel/layouts/panel", user: req.user, center, appointments });
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  canceledRezervations(req, res, next) {
    var center = req.cookies.clinic;

    AppointmentService.index({ dialysisCenter: center._id, isCancelled: true })
      .then((appointments) => {
        res.render("clinic-panel/pages/panel/canceled-rezervations", { layout: "clinic-panel/layouts/panel", user: req.user, center, appointments });
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  calender(req, res, next) {
    var center = req.cookies.clinic;
    res.render("clinic-panel/pages/panel/calender", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  changePasswordView(req, res, next) {
    var center = req.cookies.clinic;
    res.render("clinic-panel/pages/panel/change-password", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  changePassword(req, res, next) {
    var center = req.cookies.clinic;
    if (req.body.oldPassword == hashToPassword(req.user.password)) {
      if (req.body.newPassword == req.body.repeatPassword) {
        UserService.update(req.user._id, { password: passwordToHash(req.body.newPassword) })
          .then((user) => {
            console.log("İşlem Başarılı");
            res.redirect("/panel/change-password");
          })
          .catch((err) => {
            console.log("Hata Çıktı :", err);
          });
      } else {
        res.render("clinic-panel/pages/panel/change-password", { layout: "clinic-panel/layouts/panel", user: req.user, center });
        console.log("Şifreler Uyuşmuyor");
      }
    } else {
      console.log("Eski şifre Yanlış");
      res.render("clinic-panel/pages/panel/change-password", { layout: "clinic-panel/layouts/panel", user: req.user, center });
    }
  }

  contact(req, res, next) {
    var center = req.cookies.clinic;
    res.render("clinic-panel/pages/panel/contact", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  saveContact(req, res, next) {
    var center = req.cookies.clinic;

    center.contactInformation.phone = req.body.phone;
    center.contactInformation.alternativePhone = req.body.alternativePhone;
    center.contactInformation.email = req.body.email;
    center.contactInformation.alternativeEmail = req.body.alternativeEmail;
    center.contactInformation.website = req.body.website;
    center.address.addressDetailText = req.body.addressDetailText;

    console.log("Center :", center);

    DialysisCenterService.update(center._id, center)
      .then((center) => {
        res.cookie("clinic", center);
        res.redirect("/panel/contact");
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  addNewClinic(req, res, next) {
    var center = req.cookies.clinic;

    res.render("clinic-panel/pages/panel/add-new-clinic", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  addUser(req, res, next) {
    var center = req.cookies.clinic;

    res.render("clinic-panel/pages/panel/add-user", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  clinicPoint(req, res, next) {
    res.render("clinic-panel/pages/panel/clinic-point", { layout: "clinic-panel/layouts/panel", user: req.user });
  }

  competition(req, res, next) {
    res.render("clinic-panel/pages/panel/competition", { layout: "clinic-panel/layouts/panel", user: req.user  });
  }

  messageOptions(req, res, next) {
    res.render("clinic-panel/pages/panel/message-options", { layout: "clinic-panel/layouts/panel", user: req.user });
  }

  paymentOptions(req, res, next) {
    res.render("clinic-panel/pages/panel/payment-options", { layout: "clinic-panel/layouts/panel", user: req.user });
  }

  async promotions(req, res, next) {
    var center = req.cookies.clinic;
    const promotions = await Promotions.find({});

    res.render("clinic-panel/pages/panel/promotions", { layout: "clinic-panel/layouts/panel", user: req.user, center, promotions });
  }

  buyPromotions(req, res, next) {
    const id = req.params.id;

    DialysisCenterService.update(req.cookies.clinic._id, { $push: { promotions: id } })
      .then(() => {
        UserService.update(req.user._id, { priceCount: req.user.priceCount - 10 })
          .then(() => {
            res.redirect("/panel/promotions");
          })
          .catch((err) => {
            console.log("Hata Çıktı :", err);
          });
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  propertiesAndServices(req, res, next) {
    res.render("clinic-panel/pages/panel/properties-and-services", { layout: "clinic-panel/layouts/panel", user: req.user });
  }

  questionsNew(req, res, next) {
    res.render("clinic-panel/pages/panel/questions-new", { layout: "clinic-panel/layouts/panel" });
  }

  rezervationMessages(req, res, next) {
    var center = req.cookies.clinic;
    res.render("clinic-panel/pages/panel/rezervation-messages", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  messages(req, res, next) {
    var center = req.cookies.clinic;
    res.render("clinic-panel/pages/panel/messages", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  questionsAnswered(req, res, next) {
    var center = req.cookies.clinic;
    res.render("clinic-panel/pages/panel/questions-answered", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  evaluation(req, res, next) {
    //TODO DEVAM EDECEK...
    var center = req.cookies.clinic;
    res.render("clinic-panel/pages/panel/evaluation", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  updateUser(req, res, next) {
    res.render("clinic-panel/pages/panel/update-user", { layout: "clinic-panel/layouts/panel", user: req.user  });
  }

  uploadImage(req, res, next) {
    res.render("clinic-panel/pages/panel/upload-image", { layout: "clinic-panel/layouts/panel", user: req.user });
  }

  async visibility(req, res, next) {
    var center = req.cookies.clinic;
    const promotions = await Promotions.find({});
    res.render("clinic-panel/pages/panel/visibility", { layout: "clinic-panel/layouts/panel", user: req.user, center });
  }

  whatClosest(req, res, next) {
    res.render("clinic-panel/pages/panel/what-closest", { layout: "clinic-panel/layouts/panel", user: req.user });
  }
}

module.exports = new ClinicPanelController();
