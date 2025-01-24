const config = require("../config/config");

const maintenanceMiddleware = (req, res, next) => {
  if (config.maintenance) {
    return res.status(503).json({
      status: 503,
      message: "Service temporarily unavailable due to maintenance",
    });
  }
  next();
};

module.exports = maintenanceMiddleware;
