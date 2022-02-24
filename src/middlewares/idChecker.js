const AppError = require("../errors/AppError");
const httpStatus = require("http-status");

const idChecker = (field) => (req, res, next) => {
  if (!req?.params[field || "id"]?.match(/^[0-9a-fA-F]{24}$/)) {
    next(new AppError("Lütfen geçerli bir ID giriniz.", httpStatus.BAD_REQUEST));
    //res.json(new AppError("Lütfen geçerli bir ID giriniz.", httpStatus.BAD_REQUEST));
    return;
  }
  next();
};

module.exports = idChecker;
