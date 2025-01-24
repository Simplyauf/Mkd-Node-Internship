var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express app" });
});

const locationControllerRoutes = require("./locationControllerRoutes");
router.use("/location", locationControllerRoutes);
const emailControllerRoutes = require("./emailControllerRoutes");
router.use("/email", emailControllerRoutes);
const smsControllerRoutes = require("./smsControllerRoutes");
router.use("/sms", smsControllerRoutes);
const userControllerRoutes = require("./userControllerRoutes");
router.use("/user", userControllerRoutes);

module.exports = router;
