const AppointmentService = require("../services/Appointments");
const UserService = require("../services/Users");
const BlogService = require("../services/Blogs");

const passport = require("passport");
require("../scripts/utils/passport-local-config")(passport);

const { passwordToHash, hashToPassword } = require("../scripts/utils/helper");
const ErrorMessage = require("../scripts/utils/errorMessages");
const HtmlMessage = require("../scripts/utils/htmlMessages");

const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");

class HomeController {
  index(req, res, next) {
    res.render("user/pages/index", { layout: "user/layouts/main" });
  }
  clinicMain(req, res, next) {
    res.render("user/pages/clinic/clinic-main", { layout: "user/layouts/clinic" });
  }

  singleClinic(req, res, next) {
    console.log(req.body);
    res.render("user/pages/clinic/clinic", { layout: "user/layouts/clinic" });
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

    res.render("user/pages/clinic/clinic-appointment", { layout: "user/layouts/clinic", cookieValue, user, birthDate });
  }

  clinicAppointment(req, res, next) {
    res.render("user/pages/clinic/clinic-appointment", { layout: "user/layouts/clinic" });
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
    res.render("user/pages/clinic/clinic-list", { layout: "user/layouts/clinic-list" });
  }

  allView(req, res, next) {
    res.render("user/pages/clinic/all-view", { layout: "user/layouts/all-view" });
  }

  clinicLogin(req, res, next) {
    res.render("user/pages/clinic/clinic-login", { layout: "user/layouts/clinic" });
  }

  gfrCalculator(req, res, next) {
    res.render("user/pages/gfr-calculate", { layout: "user/layouts/gfr-calculate" });
  }

  user(req, res, next) {
    UserService.index({})
      .then((users) => {
        users[0].password = hashToPassword(users[0].password);
        users[0].appointments = users[0].appointments.sort().reverse();
        res.render("user/pages/user", { layout: "user/layouts/user", user: users[0], errors: null });
      })
      .catch((err) => {
        res.render("/", { layout: "user/layouts/main" });
      });
  }

  userProfileUpdate(req, res, next) {
    if (req.errors) {
      res.redirect("/user");
      // console.log("Adım 1");
      // UserService.index({})
      //   .then((users) => {
      //     console.log("Adım 2");
      //     users[0].password = hashToPassword(users[0].password);
      //     users[0].appointments = users[0].appointments.sort().reverse();
      //     console.log("Adım 3");
      //     res.render("user/pages/user", { layout: "user/layouts/user", user: users[0], errors: req.errors });
      //   })
      //   .catch((err) => {
      //     res.render("/", { layout: "user/layouts/main" });
      //   });
    }
    req.body.password = passwordToHash(req.body.password);
    UserService.update(req.user._id, req.body)
      .then((user) => {
        res.redirect("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  registerView(req, res, next) {
    res.render("user/pages/register", { layout: "user/layouts/auth" });
  }

  register(req, res, next) {
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
      console.log("Body : ", req.body);
      console.log("Cookies : ", req.cookies);
      req.body.password = passwordToHash(enterPassword);
      //req.body.birthDate = new Date();
      UserService.create(req.body)
        .then((data) => {
          console.log("Register Controller", data);
          //TODO Onay Mail Gönderimi
          // //JWT
          // console.log("1 JWT", data);
          // const token = jwt.sign(
          //   {
          //     id: "data._id",
          //     email: data.email,
          //   },
          //   process.env.CONFIRM_SECRET,
          //   { expiresIn: "1d" }
          // );
          // //NodeMailer
          // const verifyURL = process.env.MAIL_VERIFY_URL + "auth/verify?token=" + token;
          // let transporter = mailer.createTransport({
          //   service: "gmail",
          //   auth: {
          //     user: process.env.GMAIL_USER,
          //     pass: process.env.GMAIL_PASSWORD,
          //   },
          // });
          // transporter.sendMail({
          //       from: "@baynarkozcu <baynarkozcuu@gmail.com",
          //       to: data.email,
          //       subject: "Emailinizi Onaylayınız.",
          //       text: "Emailinizi ONaylamak için Linke Tıklayın " + verifyURL,
          //     },
          //     (error, info) => {
          //       if (error) {
          //         console.log("Send Mail Error: " + error);
          //       }
          //       transporter.close();
          //     }
          //   )
          //   .then(() => {
          //     console.log("4 NodeMailer", transporter);
          //     const email = data.email;
          //     return res.render("user/pages/activation", { layout: "user/layouts/auth.ejs", email });
          //   });

          return res.render("user/pages/activation", { layout: "user/layouts/auth.ejs", email: data.email });
        })
        .catch((err) => {
          console.log("Hata : ", err);
          const message = ErrorMessage.printMessage(err);
          if (message != undefined) {
            const htmlMessage = new HtmlMessage(message, "danger");
            req.flash("validationErrors", htmlMessage);
            req.flash("nameSurname", req.body.nameSurname);
            req.flash("email", req.body.email);
            req.flash("phone", req.body.phone);
            req.flash("password", enterPassword);
            req.flash("birthDate", req.body.birthDate);
            return res.redirect("/register");
          }
          const htmlMessage = new HtmlMessage("Kayıt İşlemi Sırasında Hata Oluştu.", "danger");
          req.flash("validationErrors", htmlMessage);
          req.flash("nameSurname", req.body.nameSurname);
          req.flash("email", req.body.email);
          req.flash("phone", req.body.phone);
          req.flash("password", enterPassword);
          req.flash("birthDate", req.body.birthDate);
          return res.redirect("/register");
        });
    }
  }

  login(req, res, next) {
    console.log("Login Controller", req.body);
    req.flash("email", req.body.email);
    req.flash("password", req.body.password);
    if (req.errors) {
      const htmlMessage = new HtmlMessage(req.errors, "danger");
      req.flash("validationErrors", htmlMessage);
      return res.redirect("register");
    } else {
      console.log(req.body);
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
    //TODO User Confirmations
    // const token = req.query.token;
    // if (token) {
    //   try {
    //     jwt.verify(token, process.env.CONFIRM_SECRET, async (e, decoded) => {
    //       if (e) {
    //         req.flash("validationErrors", [{ msg: "Geçersiz Token. Lütfen Yeniden Kayıt Olun.." }]);
    //         res.redirect("/login");
    //       } else {
    //         const userID = decoded.id;
    //         const result = await User.findByIdAndUpdate(userID, { emailConfirmation: true });
    //         if (result) {
    //           req.flash("validationErrors", [{ msg: "Emailiniz Onaylanmıştır.", result: "success" }]);
    //           res.redirect("/login");
    //         } else {
    //           req.flash("validationErrors", [{ msg: "Bir Hata Çıktı Daha Sonra Tekrar Deneyin.." }]);
    //           res.redirect("/login");
    //         }
    //       }
    //     });
    //   } catch (error) {
    //     console.log("authController verify Error" + error);
    //   }
    // } else {
    //   console.log("Token is NULL");
    // }
  }

  allBlogs(req, res, next) {
    console.log("Denemeee");
    BlogService.index()
      .then((blogs) => {
        res.render("user/pages/articles/blogs", { layout: "user/layouts/blogs", blogs });
      })
      .catch((err) => {
        console.log("Hata : ", err);
      });
  }

  singleBlog(req, res, next) {
    console.log("burada");
    var id = req.params.id;
    BlogService.findById(id).then((blog) => {
      res.render("user/pages/articles/single-blog", { layout: "user/layouts/blogs", blog });
    });
  }
}

module.exports = new HomeController();
