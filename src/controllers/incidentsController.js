const pool = require("../db");

const getIncidents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM incidents ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching incidents:", error);

    res.status(500).json({
      error: "Failed to fetch incidents"
    });
  }
};

const getIncidentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM incidents WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Incident not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching incident:", error);

    res.status(500).json({
      error: "Failed to fetch incident"
    });
  }
};

const createIncident = async (req, res) => {
  try {
    const {
      title,
      description,
      severity,
      service
    } = req.body;

    if (!title || !description || !service) {
      return res.status(400).json({
        error: "Title, description and service are required"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO incidents
      (title, description, severity, service)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        title,
        description,
        severity || "medium",
        service
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating incident:", error);

    res.status(500).json({
      error: "Failed to create incident"
    });
  }
};

const updateIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, severity } = req.body;

    const result = await pool.query(
      `
      UPDATE incidents
      SET
        status = COALESCE($1, status),
        severity = COALESCE($2, severity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
      `,
      [status, severity, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Incident not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating incident:", error);

    res.status(500).json({
      error: "Failed to update incident"
    });
  }
};

const deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM incidents WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Incident not found"
      });
    }

    res.json({
      message: "Incident deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting incident:", error);

    res.status(500).json({
      error: "Failed to delete incident"
    });
  }
};

module.exports = {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident
};
