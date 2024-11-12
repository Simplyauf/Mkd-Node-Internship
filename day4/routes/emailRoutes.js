const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.get("/", emailController.getAll);
router.get("/:id", emailController.getOne);
router.post("/", emailController.create);
router.put("/:id", emailController.update);
router.delete("/:id", emailController.delete);

module.exports = router;
