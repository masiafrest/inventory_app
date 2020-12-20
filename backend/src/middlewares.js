const errorType = {
  validationError: 422,
  uniqueViolationError: 409,
};

const errorMessages = {
  uniqueViolationError: "🤷‍♂️ ya existe 🤷‍♀️",
};

function notFound(req, res, next) {
  console.log("not found");
  const error = new Error(`No encontrado ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  console.log("error handler: ", error);
  const statusCode =
    res.statusCode === 200 ? errorType[error.name] || 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: errorMessages[error.name] || error.message,
    stack: process.env.NODE_ENV === "production" ? "hello" : error.stack,
    errors: error.errors || undefined,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
