const express = require("express");
const router = express.Router();

const variablesRouter = (db) => {
  // Get all variables
  router.get("/", async (req, res) => {
    try {
      const variables = await db.variables.findAll();
      res.json(variables);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get one variable
  router.get("/:id", async (req, res) => {
    try {
      const variable = await db.variables.findByPk(req.params.id);
      if (!variable)
        return res.status(404).json({ error: "Variable not found" });
      res.json(variable);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create variable
  router.post("/", async (req, res) => {
    try {
      const variable = await db.variables.create(req.body);
      res.status(201).json(variable);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update variable
  router.put("/:id", async (req, res) => {
    try {
      const variable = await db.variables.findByPk(req.params.id);
      if (!variable)
        return res.status(404).json({ error: "Variable not found" });
      await variable.update(req.body);
      res.json(variable);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete variable
  router.delete("/:id", async (req, res) => {
    try {
      const variable = await db.variables.findByPk(req.params.id);
      if (!variable)
        return res.status(404).json({ error: "Variable not found" });
      await variable.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};

module.exports = variablesRouter;
