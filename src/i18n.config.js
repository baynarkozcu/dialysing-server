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



// console.log("Languages", i18n.getLocales());
// console.log("Language", i18n.getLocale());
// console.log(i18n.__("1"));
// i18n.setLocale("uk");
// console.log(i18n.__("1"));
// i18n.setLocale("tr");
// console.log(i18n.__("1"));
// i18n.setLocale("en");
// console.log(i18n.__("1"));

module.exports = i18n;