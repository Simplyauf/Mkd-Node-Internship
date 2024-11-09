const db = require("../models");

exports.getAll = async (req, res) => {
  try {
    const docks = await db.ShippingDock.findAll();
    res.json(docks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dock = await db.ShippingDock.findByPk(req.params.id);
    if (!dock) {
      return res.status(404).json({ error: "Shipping dock not found" });
    }
    res.json(dock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    console.log("Available models:", Object.keys(db));
    console.log("ShippingDock model:", db.ShippingDock);

    if (!req.body.name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const dockData = {
      name: req.body.name,
      status: req.body.status === undefined ? 1 : Number(req.body.status),
    };

    console.log("Attempting to create dock with data:", dockData);

    if (!db.ShippingDock) {
      throw new Error("ShippingDock model not found in db object");
    }

    const dock = await db.ShippingDock.create(dockData);
    console.log("Dock created successfully:", dock);

    return res.status(201).json({
      success: true,
      data: dock,
    });
  } catch (error) {
    console.error("Error in create method:", error);
    return res.status(400).json({
      error: error.message || "Failed to create shipping dock",
      details: error.errors || [],
      stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const dock = await db.ShippingDock.findByPk(req.params.id);
    if (!dock) {
      return res.status(404).json({ error: "Shipping dock not found" });
    }
    await dock.update(req.body);
    res.json(dock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const dock = await db.ShippingDock.findByPk(req.params.id);
    if (!dock) {
      return res.status(404).json({ error: "Shipping dock not found" });
    }
    await dock.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
