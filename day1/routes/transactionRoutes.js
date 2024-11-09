const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.get("/", transactionController.getAll);
router.get("/:id", transactionController.getOne);
router.post("/", transactionController.create); // Note: README had /:id which is incorrect for POST
router.put("/:id", transactionController.update);
router.delete("/:id", transactionController.delete);

module.exports = router;
