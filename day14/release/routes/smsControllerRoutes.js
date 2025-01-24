const express = require("express");
const router = express.Router();
const smsController = require("../controllers/smsController");

// CRUD routes
router.get("/", smsController.getAll);
router.get("/:id", smsController.getById);
router.post("/", smsController.create);
router.put("/:id", smsController.update);
router.delete("/:id", smsController.delete);

module.exports = router;
