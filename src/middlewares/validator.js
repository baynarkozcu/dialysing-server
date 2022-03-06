const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details?.map((detail) => detail.message).join(", ");
    req.errors = errorMessage;
  }

  Object.assign(req.body, value);
  next();
};

module.exports = validate;
