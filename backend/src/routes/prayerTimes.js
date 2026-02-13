const express = require("express");
const { prisma } = require("../db");

const router = express.Router();

// Public: get prayer times for a single date (YYYY-MM-DD)
router.get("/", async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "date is required (YYYY-MM-DD)" });
  }

  const start = new Date(`${date}T00:00:00.000Z`);
  const end = new Date(`${date}T23:59:59.999Z`);

  const item = await prisma.prayerTime.findFirst({
    where: {
      date: { gte: start, lte: end }
    }
  });

  if (!item) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json(item);
});

// Public: get prayer times range
router.get("/range", async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) {
    return res.status(400).json({ error: "from and to are required (YYYY-MM-DD)" });
  }

  const start = new Date(`${from}T00:00:00.000Z`);
  const end = new Date(`${to}T23:59:59.999Z`);

  const items = await prisma.prayerTime.findMany({
    where: {
      date: { gte: start, lte: end }
    },
    orderBy: { date: "asc" }
  });

  return res.json(items);
});

// Admin: upsert prayer time for a date
router.post("/", async (req, res) => {
  const body = req.body || {};
  const { date, fajr, sunrise, dhuhr, asr, maghrib, isha, source } = body;

  if (!date || !fajr || !sunrise || !dhuhr || !asr || !maghrib || !isha) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const dateOnly = new Date(`${date}T00:00:00.000Z`);

  const item = await prisma.prayerTime.upsert({
    where: { date: dateOnly },
    update: {
      fajr: new Date(fajr),
      sunrise: new Date(sunrise),
      dhuhr: new Date(dhuhr),
      asr: new Date(asr),
      maghrib: new Date(maghrib),
      isha: new Date(isha),
      source: source || "manual"
    },
    create: {
      date: dateOnly,
      fajr: new Date(fajr),
      sunrise: new Date(sunrise),
      dhuhr: new Date(dhuhr),
      asr: new Date(asr),
      maghrib: new Date(maghrib),
      isha: new Date(isha),
      source: source || "manual"
    }
  });

  return res.json(item);
});

module.exports = router;
