const express = require("express");
const router = express.Router();
const JwtService = require("../../../../services/JwtService");

router.post("/token", (req, res) => {
  // This is for testing purposes only
  const token = JwtService.createAccessToken({
    user_id: 1,
    role: "admin", // or whatever portal name you want to test
  });

  res.json({
    token: token,
  });
});

module.exports = router;
