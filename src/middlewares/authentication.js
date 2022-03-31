const HtmlMessage = require("../scripts/utils/htmlMessages");

const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const htmlMessage = new HtmlMessage("Lütfen Giriş Yapınız.", "danger");
    req.flash("authorizationErrors", htmlMessage);
    res.redirect("/register");
  }
};

const currentUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

const clinicAuthenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const htmlMessage = new HtmlMessage("Lütfen Giriş Yapınız.", "danger");
    req.flash("authorizationErrors", htmlMessage);
    res.redirect("/panel/login");
  }
};

const clinicCurrentUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/panel");
  }
};

module.exports = {
  authenticate,
  currentUser,
  clinicAuthenticate,
  clinicCurrentUser,
};
