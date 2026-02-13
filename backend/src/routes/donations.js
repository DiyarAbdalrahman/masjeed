const express = require("express");
const { prisma } = require("../db");

const router = express.Router();

// Public: active campaign
router.get("/active", async (req, res) => {
  const campaign = await prisma.donationCampaign.findFirst({
    where: { active: true },
    orderBy: { updatedAt: "desc" }
  });
  return res.json(campaign);
});

// Admin: update campaign
router.post("/", async (req, res) => {
  const body = req.body || {};
  const campaign = await prisma.donationCampaign.create({ data: body });
  return res.json(campaign);
});

module.exports = router;
