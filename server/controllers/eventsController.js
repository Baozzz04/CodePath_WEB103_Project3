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

export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM event WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("⚠️ Error retrieving event", err);
    res.status(500).json({ error: "Failed to retrieve event" });
  }
};

export const getEventsByVenue = async (req, res) => {
  const { venue } = req.params;
  try {
    const result = await pool.query("SELECT * FROM event WHERE venue = $1", [
      venue,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No events found for this venue" });
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("⚠️ Error retrieving events by venue", err);
    res.status(500).json({ error: "Failed to retrieve events by venue" });
  }
};
