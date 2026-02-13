const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ ok: true, service: "masjeed-api" });
});

module.exports = router;
