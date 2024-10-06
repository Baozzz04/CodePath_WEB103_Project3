import { pool } from "../config/database.js";

export const getLocations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM location");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("⚠️ Error retrieving locations", err);
    res.status(500).json({ error: "Failed to retrieve locations" });
  }
};

export const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM location WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("⚠️ Error retrieving location", err);
    res.status(500).json({ error: "Failed to retrieve location" });
  }
};
