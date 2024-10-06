import { pool } from "./database.js";
import "./dotenv.js";
import eventData from "../data/events.js";
import locationData from "../data/locations.js";

const createTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS event;
        DROP TABLE IF EXISTS location;

        CREATE TABLE IF NOT EXISTS event (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            venue VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS location (
            id SERIAL PRIMARY KEY,
            image VARCHAR(255) NOT NULL,
            venue VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL
        );
    `;

  console.log("Executing SQL:\n", createTableQuery); // Log the SQL

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 Tables created successfully");
  } catch (err) {
    console.error("⚠️ Error creating tables", err);
  }
};

const seedTable = async () => {
  await createTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO event (title, image, date, venue) VALUES ($1, $2, $3, $4)",
    };
    const values = [event.title, event.image, event.date, event.venue];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ Error inserting event", err);
        return;
      }
      console.log(`✅ ${event.title} added successfully`);
    });
  });

  locationData.forEach((location) => {
    const insertQuery = {
      text: "INSERT INTO location (image, venue, location) VALUES ($1, $2, $3)",
    };
    const values = [location.image, location.venue, location.location];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ Error inserting location", err);
        return;
      }
      console.log(`✅ ${location.venue} added successfully`);
    });
  });
};

seedTable();
