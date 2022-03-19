const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const passwordToHash = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASSWORD_HASH_KEY).toString();
};

const hashToPassword = (hashKey) => {
  var bytes = CryptoJS.AES.decrypt(hashKey, process.env.PASSWORD_HASH_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const generateAcessToken = (user) => {
  return JWT.sign({ name: user.email, ...user }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "1w" });
};

const generateRefreshToken = (user) => {
  return JWT.sign({ name: user.email, ...user }, process.env.REFRESH_TOKEN_SECRET_KEY);
};

module.exports = {
  passwordToHash,
  hashToPassword,
  generateAcessToken,
  generateRefreshToken,
};
