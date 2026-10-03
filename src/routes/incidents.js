const express = require("express");

const {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident
} = require("../controllers/incidentsController");

const router = express.Router();

router.get("/", getIncidents);
router.get("/:id", getIncidentById);
router.post("/", createIncident);
router.patch("/:id", updateIncident);
router.delete("/:id", deleteIncident);

module.exports = router;
