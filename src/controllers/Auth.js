const Service = require("../services/Users");


const { passwordToHash } = require("../scripts/utils/helper");
const ErrorMessage = require("../scripts/utils/errorMessages");
const passport = require("passport");
require("../scripts/utils/passport-local-config")(passport);
const HtmlMessage = require("../scripts/utils/htmlMessages");

const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");

class AuthController {
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
      return res.redirect("/auth/register");
    } else {
      req.body.password = passwordToHash(enterPassword);
      req.body.birthDate = new Date();
      Service.create(req.body)
        .then((data) => {
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
        })
        .catch((err) => {
          const message = ErrorMessage.printMessage(err);
          if (message != undefined) {
            const htmlMessage = new HtmlMessage(message, "danger");
            req.flash("validationErrors", htmlMessage);
            req.flash("nameSurname", req.body.nameSurname);
            req.flash("email", req.body.email);
            req.flash("phone", req.body.phone);
            req.flash("password", enterPassword);
            req.flash("birthDate", req.body.birthDate);
            return res.redirect("/auth/register");
          }
          const htmlMessage = new HtmlMessage("Kayıt İşlemi Sırasında Hata Oluştu.", "danger");
          req.flash("validationErrors", htmlMessage);
          req.flash("nameSurname", req.body.nameSurname);
          req.flash("email", req.body.email);
          req.flash("phone", req.body.phone);
          req.flash("password", enterPassword);
          req.flash("birthDate", req.body.birthDate);
          return res.redirect("/auth/register");
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
}

module.exports = new AuthController();
