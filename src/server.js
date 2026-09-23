require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "incidenthub-backend"
  });
});

app.listen(PORT, () => {
  console.log(`IncidentHub backend running on port ${PORT}`);
});
