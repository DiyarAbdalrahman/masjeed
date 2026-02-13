const express = require("express");
const { prisma } = require("../db");

const router = express.Router();

// Public: fetch mosque settings
router.get("/", async (req, res) => {
  const settings = await prisma.mosqueSettings.findFirst();
  return res.json(settings);
});

// Admin: update settings
router.put("/", async (req, res) => {
  const body = req.body || {};

  const existing = await prisma.mosqueSettings.findFirst();
  if (!existing) {
    const created = await prisma.mosqueSettings.create({ data: body });
    return res.json(created);
  }

  const updated = await prisma.mosqueSettings.update({
    where: { id: existing.id },
    data: body
  });

  return res.json(updated);
});

module.exports = router;
