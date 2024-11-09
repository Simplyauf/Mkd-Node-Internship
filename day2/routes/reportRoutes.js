const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/sale", reportController.getSales);
router.get("/monthly", reportController.getMonthlySales);
router.get("/user", reportController.getUserSales);
router.get("/shipping_dock", reportController.getShippingDockSales);
router.get("/user/count", reportController.getUserOrderCount);

module.exports = router;
