const HtmlMessage = require("../scripts/utils/htmlMessages");

const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const htmlMessage = new HtmlMessage("Lütfen Giriş Yapınız.", "danger");
    req.flash("authorizationErrors", htmlMessage);
    res.redirect("/auth/register");
  }
};

const currentUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

module.exports = {
  authenticate,
  currentUser,
};
