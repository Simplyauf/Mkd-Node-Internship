var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const db = require("./models");
var cors = require("cors");

const maintenanceMiddleware = require("./middleware/Maintenance");
const authMiddleware = require("./middleware/Auth");

var app = express();
app.set("db", db);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(maintenanceMiddleware);
app.use("/api", authMiddleware);
app.use("/api/v1/auth", require("./routes/api/v1/auth/token"));
app.use("/api/v1/admin", require("./routes/api/v1/admin/users"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9;
// .eyJ1c2VyX2lkIjoxLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzM5NTM2MTcsImV4cCI6MTczMzk1NzIxN30
// .NBUXRWCU4NCK0U5O8lbiT0uu72I_wc - wA0upgPI2Mos;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
