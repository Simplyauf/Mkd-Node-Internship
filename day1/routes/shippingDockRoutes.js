const express = require("express");
const router = express.Router();
const shippingDockController = require("../controllers/shippingDockController");

router.get("/", shippingDockController.getAll);
router.get("/:id", shippingDockController.getOne);
router.post("/", shippingDockController.create);
router.put("/:id", shippingDockController.update);
router.delete("/:id", shippingDockController.delete);

module.exports = router;
