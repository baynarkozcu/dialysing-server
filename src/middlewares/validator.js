const httpStatus = require("http-status");
const AppError = require("../errors/AppError");

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details?.map((detail) => detail.message).join(", ");
    next(new AppError(errorMessage, httpStatus.BAD_REQUEST));
    return;
  }

  Object.assign(req.body, value);
  next();
};

module.exports = validate;
