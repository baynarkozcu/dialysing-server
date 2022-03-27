const AppointmentService = require("../services/Appointments");
const UserService = require("../services/Users");
const BlogService = require("../services/Blogs");
const DialysisCenterService = require("../services/DialysisCenters");

const passport = require("passport");
require("../scripts/utils/passport-local-config")(passport);

const { passwordToHash, hashToPassword } = require("../scripts/utils/helper");
const ErrorMessage = require("../scripts/utils/errorMessages");
const HtmlMessage = require("../scripts/utils/htmlMessages");

const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");

class HomeController {
  index(req, res, next) {
    res.render("user/pages/index", { layout: "user/layouts/index" });
  }
  clinicMain(req, res, next) {
    console.log("Burada");
    res.render("user/pages/clinic/clinic-main", { layout: "user/layouts/clinic-main" });
  }

  singleClinic(req, res, next) {
    res.render("user/pages/clinic/single-clinic", { layout: "user/layouts/clinic-main" });
  }

  viewAppointment(req, res, next) {
    //! TODO Cookies Kaydedilmiyor Sayfa Refresh Edildikten Sonra Kaydediliyor.

    res.cookie("treatmentMethod", req.body.treatmentMethod);
    res.cookie("sessionsDayCount", req.body.sessionsDayCount);
    res.cookie("sessionsDay", req.body.sessionsDay);
    res.cookie("session", req.body.session);
    res.cookie("checkOutDate", req.body.checkOutDate);
    res.cookie("checkInDate", req.body.checkInDate);

    
    const birthDate = ("0" + req.user.birthDate.getDate()).slice(-2) + "." + ("0" + (req.user.birthDate.getMonth() + 1)).slice(-2) + "." + req.user.birthDate.getFullYear();
    const user = req.user;
    const cookieValue = req.cookies;

    res.render("user/pages/clinic/appointment", { layout: "user/layouts/clinic-main", cookieValue, user, birthDate });
  }

  clinicAppointment(req, res, next) {
    res.render("user/pages/clinic/appointment", { layout: "user/layouts/clinic-main" });
  }

  createAppointment(req, res, next) {
    console.log("Body :", req.body);
    console.log("Cookies :", req.cookies);

    var appointment = {
      nameSurname: req.user.nameSurname,
      email: req.user.email,
      phone: req.user.phone,
      birthDate: req.user.birthDate,
      patientNameSurname: req.body.patientNameSurname,
      situation: req.body.situation,
      insurance: "SSK",
      adress: {
        city: req.body.city,
        district: req.body.district,
        street: req.body.street,
        adressDetailText: req.body.adressDetailText,
        zipCode: req.body.zipCode,
      },
      checkInDate: req.cookies.checkInDate,
      checkOutDate: req.cookies.checkOutDate,
      treatmentMethod: req.cookies.treatmentMethod,
      sessionsDay: req.cookies.sessionsDay,
      session: req.cookies.session,
      dialysisCenter: "Türkmed Diyaliz Merkezi",
    };
    AppointmentService.create(appointment)
      .then((data) => {
        req.user.appointments.push(data._id);
        UserService.update(req.user._id, { appointments: req.user.appointments })
          .then((data) => {
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
    const query = {
      //'address.city': "İstanbul",
    };

    DialysisCenterService.index(query)
      .then((list) => {
        res.render("user/pages/clinic/clinic-list", { layout: "user/layouts/clinic-main", list });
      })
      .catch((err) => {
        console.log("Error", err);
        res.redirect("/");
      });

    

    // console.log("Body :",req.body);
    // if (req.body.city != undefined) {
    //   console.log("City Boş");
    //   var city = req.body.city;

    // } else {
    //   res.redirect("/clinic/all");
    // }
  }

  allView(req, res, next) {
    res.render("user/pages/clinic/all-view", { layout: "user/layouts/clinic-main" });
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
        user.appointments = user.appointments.sort().reverse();
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
          user.appointments = user.appointments.sort().reverse();
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
    req.flash("email", req.body.email);
    req.flash("password", req.body.password);
    if (req.errors) {
      const htmlMessage = new HtmlMessage(req.errors, "danger");
      req.flash("validationErrors", htmlMessage);
      return res.redirect("register");
    } else {
      passport.authenticate("local", {
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
      res.render("user/pages/register", { layout: "user/layouts/auth" });
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
        res.render("user/pages/articles/blogs", { layout: "user/layouts/blogs", blogs });
      })
      .catch((err) => {
        console.log("Hata : ", err);
      });
  }

  singleBlog(req, res, next) {
    var id = req.params.id;
    BlogService.findById(id).then((blog) => {
      res.render("user/pages/articles/single-blog", { layout: "user/layouts/blogs", blog });
    });
  }
}

module.exports = new HomeController();
