class AppError extends Error {
  constructor(message, statusCode) {
    // message is taken by the build in error -> Like new Error("Something went wrong!")
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Mark this error as an operational error because this handler will always handle operational errors
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
