var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var quizRouter = require("./routes/quiz");

const db = require("./models");
var cors = require("cors");

var app = express();
app.set("db", db);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Serve quiz.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "quiz.html"));
});

// API routes
app.use("/api/v1/quiz", quizRouter);

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
