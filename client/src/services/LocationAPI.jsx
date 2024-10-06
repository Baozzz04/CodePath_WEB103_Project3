const API_URL = "/api/locations";

const getAllLocations = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("⚠️ Error fetching locations:", error);
    throw error;
  }
};

export default {
  getAllLocations,
};
