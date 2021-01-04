const {
  ValidationError,
  NotFoundError,
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} = require("objection");

const errorType = {
  validationError: 422,
  uniqueViolationError: 409,
};

const errorMessages = {
  uniqueViolationError: "🤷‍♂️ ya existe 🤷‍♀️",
};

function notFound(req, res, next) {
  const error = new Error(`No encontrado ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function yupErrorhandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    // yup
    res.status(500);
    let errors = {};
    errors[err.path] = err.message;
    res.json(errors);
  } else {
    next(err);
  }
}

function signInErrorHandler(err, req, res, next) {
  if (err.message === "invalid login") {
    res.json({ general: err.message });
  } else {
    next(err);
  }
}

function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.status(404).send({
      error: "multer",
      message: err,
    });
    // A Multer error occurred when uploading.
  } else if (err) {
    ç;
    next(err);
    // An unknown error occurred when uploading.
  }
}
// In this example `res` is an express response object.
function dbErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case "ModelValidation":
        res.status(400).send({
          message: err.message,
          type: err.type,
          data: err.data,
        });
        break;
      case "RelationExpression":
        res.status(400).send({
          message: err.message,
          type: "RelationExpression",
          data: {},
        });
        break;
      case "UnallowedRelation":
        res.status(400).send({
          message: err.message,
          type: err.type,
          data: {},
        });
        break;
      case "InvalidGraph":
        res.status(400).send({
          message: err.message,
          type: err.type,
          data: {},
        });
        break;
      default:
        res.status(400).send({
          message: err.message,
          type: "UnknownValidationError",
          data: {},
        });
        break;
    }
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      message: err.message,
      type: "NotFound",
      data: {},
    });
  } else if (err instanceof UniqueViolationError) {
    res.status(409).send({
      message: err.message,
      type: "UniqueViolation",
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof NotNullViolationError) {
    res.status(400).send({
      message: err.message,
      type: "NotNullViolation",
      data: {
        column: err.column,
        table: err.table,
      },
    });
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      message: err.message,
      type: "ForeignKeyViolation",
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof CheckViolationError) {
    res.status(400).send({
      message: err.message,
      type: "CheckViolation",
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof DataError) {
    res.status(400).send({
      message: err.message,
      type: "InvalidData",
      data: {},
    });
  } else if (err instanceof DBError) {
    res.status(500);
    res.json({
      message: err.message,
      type: "UnknownDatabaseError",
      data: {},
    });
  } else {
    next(err);
  }
}

function errorHandler(error, req, res, next) {
  console.log(error);
  if (error.code === "ECONNREFUSED") {
    res.statusCode = 500;
    res.json("base de dato no esta conectado");
  }
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
  yupErrorhandler,
  signInErrorHandler,
  dbErrorHandler,
  errorHandler,
};
