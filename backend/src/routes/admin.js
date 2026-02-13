const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../db");

const router = express.Router();

function signToken(admin) {
  const payload = { sub: admin.id, email: admin.email, role: admin.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// Admin login (email/password)
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken(admin);
  return res.json({ token });
});

module.exports = router;
