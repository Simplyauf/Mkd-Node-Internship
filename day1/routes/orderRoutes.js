const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAll);
router.get("/:id", orderController.getOne);
router.post("/", orderController.create); // Note: README had /:id which is incorrect for POST
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);

module.exports = router;
