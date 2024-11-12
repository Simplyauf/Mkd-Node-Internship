const db = require("../models");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.importFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const results = [];
    const errors = [];

    if (path.extname(req.file.originalname) === ".csv") {
      // Handle CSV
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          await processImportData(results, errors, res);
        });
    } else if (path.extname(req.file.originalname) === ".xlsx") {
      // Handle Excel
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
      await processImportData(data, errors, res);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.exportData = async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll({
      raw: true,
      attributes: [
        "id",
        "order_id",
        "user_id",
        "shipping_dock_id",
        "amount",
        "discount",
        "tax",
        "total",
        "notes",
        "status",
      ],
    });

    const csvWriter = createCsvWriter({
      path: "exports/transactions.csv",
      header: [
        { id: "id", title: "ID" },
        { id: "order_id", title: "Order ID" },
        { id: "user_id", title: "User ID" },
        { id: "shipping_dock_id", title: "Shipping Dock ID" },
        { id: "amount", title: "Amount" },
        { id: "discount", title: "Discount" },
        { id: "tax", title: "Tax" },
        { id: "total", title: "Total" },
        { id: "notes", title: "Notes" },
        { id: "status", title: "Status" },
      ],
    });

    await csvWriter.writeRecords(transactions);
    res.download("exports/transactions.csv");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function processImportData(data, errors, res) {
  try {
    for (const row of data) {
      try {
        await db.Transaction.create(row);
      } catch (error) {
        errors.push(`Row ${data.indexOf(row) + 1}: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
    } else {
      res.json({ message: "Import successful" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
