const JwtService = require("../services/JwtService");

const authMiddleware = (req, res, next) => {
  const token = JwtService.getToken(req);

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "No authentication token provided",
    });
  }

  const decoded = JwtService.verifyAccessToken(token);

  if (!decoded) {
    return res.status(401).json({
      status: 401,
      message: "Invalid or expired authentication token",
    });
  }

  // Check portal role for /api/v1/<portal> routes
  if (req.path.startsWith("/api/v1/")) {
    const pathParts = req.path.split("/");
    const portal = pathParts[3];

    if (portal && decoded.role !== portal) {
      return res.status(403).json({
        status: 403,
        message: "Unauthorized access: Invalid role for this portal",
      });
    }
  }

  // Add user info to request
  req.user = {
    id: decoded.user_id,
    role: decoded.role,
  };

  next();
};

module.exports = authMiddleware;
