require("dotenv").config();

const express = require("express");
const cors = require("cors");

const healthRouter = require("./routes/health");
const prayerTimesRouter = require("./routes/prayerTimes");
const settingsRouter = require("./routes/settings");
const adminRouter = require("./routes/admin");
const donationsRouter = require("./routes/donations");
const eventsRouter = require("./routes/events");
const announcementsRouter = require("./routes/announcements");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/health", healthRouter);
app.use("/api/v1/prayer-times", prayerTimesRouter);
app.use("/api/v1/settings", settingsRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/donations", donationsRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/announcements", announcementsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
