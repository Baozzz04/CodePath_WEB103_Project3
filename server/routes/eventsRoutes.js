import express from "express";
import {
  getEvents,
  getEventById,
  getEventsByVenue,
} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.get("/venue/:venue", getEventsByVenue);

export default router;
