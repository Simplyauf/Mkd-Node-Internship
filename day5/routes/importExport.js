const express = require("express");
const router = express.Router();
const importExportController = require("../controllers/importExportController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/import",
  upload.single("file"),
  importExportController.importFile
);
router.get("/export", importExportController.exportData);

module.exports = router;
