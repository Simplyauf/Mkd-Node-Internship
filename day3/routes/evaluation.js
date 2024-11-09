const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const { variable } = req.query;
      if (!variable) {
        return res
          .status(400)
          .json({ error: "Variable parameter is required" });
      }

      // Decode base64 and parse JSON
      const decodedVariables = JSON.parse(
        Buffer.from(variable, "base64").toString()
      );

      // Get all rules and variables
      const [rules, dbVariables] = await Promise.all([
        db.rules.findAll(),
        db.variables.findAll(),
      ]);

      // Create a map of variable types
      const variableTypes = {};
      dbVariables.forEach((v) => {
        variableTypes[v.name] = v.type;
      });

      // Cast variables according to their types
      const typedVariables = {};
      Object.entries(decodedVariables).forEach(([key, value]) => {
        if (variableTypes[key]) {
          switch (variableTypes[key]) {
            case "INTEGER":
              typedVariables[key] = parseInt(value);
              break;
            case "FLOAT":
              typedVariables[key] = parseFloat(value);
              break;
            case "STRING":
              typedVariables[key] = String(value);
              break;
          }
        }
      });

      // Evaluate rules
      const results = rules
        .map((rule) => {
          try {
            // Create a function from the condition
            const conditionFn = new Function(
              ...Object.keys(typedVariables),
              `return ${rule.condition}`
            );
            const isValid = conditionFn(...Object.values(typedVariables));

            if (isValid) {
              return {
                rule_id: rule.id,
                result: rule.action,
              };
            }
          } catch (error) {
            console.error(`Error evaluating rule ${rule.id}:`, error);
          }
          return null;
        })
        .filter(Boolean);

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
