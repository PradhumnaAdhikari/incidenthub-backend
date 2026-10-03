require("dotenv").config();

const express = require("express");
const cors = require("cors");

const incidentRoutes = require("./routes/incidents");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "incidenthub-backend"
  });
});

app.use("/api/incidents", incidentRoutes);

app.listen(PORT, () => {
  console.log(`IncidentHub backend running on port ${PORT}`);
});
