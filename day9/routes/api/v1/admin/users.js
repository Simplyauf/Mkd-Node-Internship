const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  // req.user is available here with user_id and role
  res.json({
    status: 200,
    data: {
      user_id: req.user.id,
      role: req.user.role,
    },
  });
});

module.exports = router;
