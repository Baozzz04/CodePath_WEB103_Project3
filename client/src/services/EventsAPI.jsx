const API_URL = "/api/events/";

const getEventsById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("⚠️ Error fetching event by ID:", error);
    throw error;
  }
};

export default {
  getEventsById,
};
