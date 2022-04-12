const AppointmentService = require("../services/Appointments");
const UserService = require("../services/Users");
const BlogService = require("../services/Blogs");
const DialysisCenterService = require("../services/DialysisCenters");

const adad = require("../models/DialysisCenters");

const mongoose = require("mongoose");

const passport2 = require("passport");
require("../scripts/utils/passport-local-config")(passport2);

const { passwordToHash, hashToPassword } = require("../scripts/utils/helper");
const ErrorMessage = require("../scripts/utils/errorMessages");
const HtmlMessage = require("../scripts/utils/htmlMessages");

const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");

class HomeController {
  index(req, res, next) {
    const user = req.user;
    res.render("user/pages/index", { layout: "user/layouts/index", user });
  }
  clinicMain(req, res, next) {
    res.render("user/pages/clinic/clinic-main", { layout: "user/layouts/clinic-main" });
  }

  singleClinic(req, res, next) {
    const id = req.params.id;
    DialysisCenterService.findById(id)
      .then((center) => {
        res.render("user/pages/clinic/single-clinic", { layout: "user/layouts/clinic-main", center });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  async viewAppointment(req, res, next) {
    res.cookie("tmpAppointment", req.body);

    const birthDate = ("0" + req.user.birthDate.getDate()).slice(-2) + "." + ("0" + (req.user.birthDate.getMonth() + 1)).slice(-2) + "." + req.user.birthDate.getFullYear();
    const user = req.user;

    DialysisCenterService.findById(req.body.centerId)
      .then((center) => {
        res.render("user/pages/clinic/appointment", { layout: "user/layouts/clinic-main", cookieValue: req.body, user, birthDate, center });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  // clinicAppointment(req, res, next) {
  //   res.render("user/pages/clinic/appointment", { layout: "user/layouts/clinic-main" });
  // }

  createAppointment(req, res, next) {
    const appointment = {
      nameSurname: req.user.nameSurname,
      email: req.user.email,
      phone: req.user.phone,
      birthDate: req.user.birthDate,
      patientNameSurname: req.body.patientNameSurname,
      situation: req.body.situation,
      insurance: req.body.insurance,
      address: {
        city: req.body.city,
        district: req.body.district,
        street: req.body.street,
        addressDetailText: req.body.addressDetailText,
        zipCode: req.body.zipCode,
      },
      checkInDate: req.cookies.tmpAppointment.checkInDate,
      checkOutDate: req.cookies.tmpAppointment.checkOutDate,
      treatmentMethod: req.cookies.tmpAppointment.treatmentMethod,
      sessionsDay: req.cookies.tmpAppointment.sessionsDay,
      session: req.cookies.tmpAppointment.session,
      dialysisCenter: req.cookies.tmpAppointment.centerId,
      note: req.body.note,
    };
    AppointmentService.create(appointment)
      .then((data) => {
        req.user.appointments.push(data._id);
        UserService.update(req.user._id, { appointments: req.user.appointments })
          .then((data) => {
            res.clearCookie("tmpAppointment");
            res.redirect("/user");
          })
          .catch((err) => {
            console.log("Hata : ", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addressCorrection(req, res, next) {
    res.render("user/pages/clinic/clinic-address-correction", { layout: "user/layouts/clinic" });
  }

  clinicList(req, res, next) {
    if (req.query.city) {
      const query = {
        "address.city": req.query.city,
      };
      DialysisCenterService.index(query)
        .then((list) => {
          return res.render("user/pages/clinic/clinic-list", { layout: "user/layouts/clinic-main", list, user: req.user });
        })
        .catch((err) => {
          console.log("Error", err);
          return res.redirect("/");
        });
    } else {
      return res.redirect("/clinic/all");
    }
  }

  async allView(req, res, next) {
    const countries = await DialysisCenterService.groupBy("$address.country");
    const cities = await DialysisCenterService.groupBy("$address.country", "$address.city");

    res.render("user/pages/clinic/all-view", { layout: "user/layouts/clinic-main", countries, cities });
  }
  clinicLogin(req, res, next) {
    res.render("user/pages/clinic/clinic-login", { layout: "user/layouts/clinic-main" });
  }

  gfrCalculator(req, res, next) {
    res.render("user/pages/gfr-calculate", { layout: "user/layouts/gfr-calculate" });
  }

  user(req, res, next) {
    UserService.findById(req.user._id)
      .then((user) => {
        user.password = hashToPassword(user.password);
        user.appointments = user.appointments.reverse();
        res.render("user/pages/user", { layout: "user/layouts/user", user, errors: null });
      })
      .catch((err) => {
        res.redirect("/");
      });
  }

  userProfileUpdate(req, res, next) {
    if (req.errors) {
      UserService.findById(req.user._id)
        .then((user) => {
          user.password = hashToPassword(user.password);
          user.appointments = user.appointments.reverse();
          return res.render("user/pages/user", { layout: "user/layouts/user", user, errors: req.errors });
        })
        .catch((err) => {
          console.log("Hata : ", err);
        });
    } else {
      req.body.password = passwordToHash(req.body.password);
      UserService.update(req.user._id, req.body)
        .then((user) => {
          res.redirect("/user");
        })
        .catch((err) => {
          const message = ErrorMessage.printMessage(err);
          if (message != undefined) {
            console.log("User", req.user);
            return res.render("user/pages/user", { layout: "user/layouts/user", user: req.user, errors: message });
          } else {
            return res.render("user/pages/user", { layout: "user/layouts/user", user: req.user, errors: "Güncelleme Sırasında Hata Oluştu." });
          }
        });
    }
  }

  registerView(req, res, next) {
    res.render("user/pages/register", { layout: "user/layouts/clinic-main" });
  }

  async register(req, res, next) {
    console.log("Body :", req.body);
    console.log("Cookies :", req.cookies);
    const enterPassword = req.body.password;
    if (req.errors) {
      const htmlMessage = new HtmlMessage(req.errors, "danger");
      req.flash("validationErrors", htmlMessage);
      req.flash("nameSurname", req.body.nameSurname);
      req.flash("email", req.body.email);
      req.flash("phone", req.body.phone);
      req.flash("password", enterPassword);
      req.flash("birthDate", req.body.birthDate);
      return res.redirect("/register");
    } else {
      try {
        req.body.password = passwordToHash(enterPassword);
        req.body.birthDate = new Date(req.body.birthDate);

        const data = await UserService.create(req.body);
        const token = jwt.sign(
          {
            id: data._id,
            email: data.email,
          },
          process.env.CONFIRM_SECRET,
          { expiresIn: "1d" }
        );

        const verifyURL = process.env.MAIL_VERIFY_URL + "user/verify?token=" + token;
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
        return res.render("user/pages/verify", { layout: "user/layouts/clinic-main", email: data.email });
      } catch (err) {
        const message = ErrorMessage.printMessage(err);
        if (message != undefined) {
          const htmlMessage = new HtmlMessage(message, "danger");
          req.flash("validationErrors", htmlMessage);
          req.flash("nameSurname", req.body.nameSurname);
          req.flash("email", req.body.email);
          req.flash("phone", req.body.phone);
          req.flash("password", enterPassword);
          return res.redirect("/register");
        }
        const htmlMessage = new HtmlMessage("Kayıt İşlemi Sırasında Hata Oluştu.", "danger");
        req.flash("validationErrors", htmlMessage);
        req.flash("nameSurname", req.body.nameSurname);
        req.flash("email", req.body.email);
        req.flash("phone", req.body.phone);
        req.flash("password", enterPassword);
        return res.redirect("/register");
      }
    }
  }

  login(req, res, next) {
    console.log("Burada Başladı..");
    req.flash("email", req.body.email);
    req.flash("password", req.body.password);
    if (req.errors) {
      const htmlMessage = new HtmlMessage(req.errors, "danger");
      req.flash("validationErrors", htmlMessage);
      return res.redirect("register");
    } else {
      console.log("Burada");
      passport2.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "register",
        failureFlash: true,
      })(req, res, next);
    }
  }

  logout(req, res, next) {
    req.logout();
    req.session.destroy((error) => {
      res.clearCookie("connect.sid");
      res.render("user/pages/register", { layout: "user/layouts/clinic-main" });
    });
  }

  verify(req, res, next) {
    console.log("Buradaa", req.query.token);
    const token = req.query.token;
    if (token) {
      try {
        jwt.verify(token, process.env.CONFIRM_SECRET, async (e, decoded) => {
          if (e) {
            req.flash("validationErrors", [{ msg: "Geçersiz Token. Lütfen Yeniden Kayıt Olun.." }]);
            res.redirect("/register");
          } else {
            const userID = decoded.id;
            const result = await UserService.update(userID, { emailConfirmed: true });
            if (result) {
              req.flash("validationErrors", [{ msg: "Emailiniz Onaylanmıştır.", result: "success" }]);
              res.redirect("/register");
            } else {
              req.flash("validationErrors", [{ msg: "Bir Hata Çıktı Daha Sonra Tekrar Deneyin.." }]);
              res.redirect("/register");
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

  allBlogs(req, res, next) {
    BlogService.index()
      .then((blogs) => {
        console.log("Blogs :", blogs);
        res.render("user/pages/blogs/all-blogs", { layout: "user/layouts/blog", blogs });
      })
      .catch((err) => {
        console.log("Hata : ", err);
      });
  }

  singleBlog(req, res, next) {
    var seflink = req.params.seflink;
    BlogService.find({ seflink: seflink }).then((blog) => {
      res.render("user/pages/blogs/blog", { layout: "user/layouts/blog", blog });
    });
  }
}

module.exports = new HomeController();
