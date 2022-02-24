const httpStatus = require("http-status");

module.exports = (error, req, res, next) => {
  res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    message: error.message || "Sistem Hatası. Lütfen Sistem Yöneticisine Başvurunuz.",
  });
};
