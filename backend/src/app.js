const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("./db");

const middlewares = require("./middlewares");
const api = require("./api");
const project = require("./constants/project");

const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({
    message: project.message,
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.yupErrorhandler);
app.use(middlewares.signInErrorHandler);
app.use(middlewares.dbErrorHandler);
app.use(middlewares.errorHandler);

// http://localhost:5050/uploads/images-1609800574239-723.9052966130504.png
module.exports = app;
