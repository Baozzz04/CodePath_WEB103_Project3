import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import "../css/LocationEvents.css";

const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(index);
    const fetchLocation = async () => {
      try {
        const locationResponse = await fetch(`/api/locations/${index}`);
        if (!locationResponse.ok) {
          throw new Error("Failed to fetch location");
        }
        const locationData = await locationResponse.json();
        setLocation(locationData);

        const eventsResponse = await fetch(
          `/api/events/venue/${locationData.venue}`
        );
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
      } catch (err) {
        console.error("⚠️ Error fetching location or events:", err);
        setError(err.message);
      }
    };

    fetchLocation();
  }, [index]);

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image} />
        </div>

        <div className="location-info">
          <h2>{location.location}</h2>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              image={event.image}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
