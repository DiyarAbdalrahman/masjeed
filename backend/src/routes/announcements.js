const express = require("express");
const { prisma } = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await prisma.announcement.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }]
  });
  return res.json(items);
});

router.post("/", async (req, res) => {
  const body = req.body || {};
  const item = await prisma.announcement.create({ data: body });
  return res.json(item);
});

module.exports = router;
