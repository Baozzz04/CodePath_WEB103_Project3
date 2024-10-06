import { pool } from "../config/database.js";

export const getEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM event");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("⚠️ Error retrieving events", err);
    res.status(500).json({ error: "Failed to retrieve events" });
  }
};
