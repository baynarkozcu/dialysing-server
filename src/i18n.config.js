// const path = require("path");

// var i18n = require("i18n");

// i18n.configure({
//   locales: ["en", "uk", "tr"],
//   directory: path.resolve(__dirname, "../public", "locales"),
//   defaultLocale: "en",
// });

// module.exports = i18n;

const { I18n } = require("i18n");
const path = require("path");

const i18n = new I18n({
  //locales: ["en", "uk", "tr", "ps"],
  defaultLocale: "en",
  directory: path.resolve(__dirname, "../public/", "locales"),
});

module.exports = function (req, res, next) {
  
  i18n.init(req, res);
  if (req.cookies.lang) {
    i18n.setLocale(req.cookies.lang);
  }
  res.setLocale(i18n.getLocale());
  return next();
};
