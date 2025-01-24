const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// CRUD routes
router.get("/", emailController.getAll);
router.get("/:id", emailController.getById);
router.post("/", emailController.create);
router.put("/:id", emailController.update);
router.delete("/:id", emailController.delete);

module.exports = router;
