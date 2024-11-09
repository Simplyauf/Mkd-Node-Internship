const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get all rules
  router.get("/", async (req, res) => {
    try {
      const rules = await db.rules.findAll();
      res.json(rules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get one rule
  router.get("/:id", async (req, res) => {
    try {
      const rule = await db.rules.findByPk(req.params.id);
      if (!rule) return res.status(404).json({ error: "Rule not found" });
      res.json(rule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create rule
  router.post("/", async (req, res) => {
    try {
      const rule = await db.rules.create(req.body);
      res.status(201).json(rule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update rule
  router.put("/:id", async (req, res) => {
    try {
      const rule = await db.rules.findByPk(req.params.id);
      if (!rule) return res.status(404).json({ error: "Rule not found" });
      await rule.update(req.body);
      res.json(rule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete rule
  router.delete("/:id", async (req, res) => {
    try {
      const rule = await db.rules.findByPk(req.params.id);
      if (!rule) return res.status(404).json({ error: "Rule not found" });
      await rule.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
