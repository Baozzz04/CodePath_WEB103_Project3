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
