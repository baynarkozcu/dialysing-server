class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }
}
module.exports = AppError;
