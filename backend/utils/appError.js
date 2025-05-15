class AppError extends Error {
  constructor(message, statusCode, statusText) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusText;
  }
}

module.exports = {
  create: (message, statusCode, statusText) =>
    new AppError(message, statusCode, statusText),
};