const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/odd", orderController.getOddOrders);
router.get("/cursor", orderController.getCursorPagination);
router.get("/", orderController.getOrders);

module.exports = router;
