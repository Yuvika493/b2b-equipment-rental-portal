import api from "./api";

// GET /api/equipment
// The backend supports optional ?search= and ?category= query params, but
// category filtering here is done client-side (see utils/categoryMap.js)
// because the backend does an exact-string match and the UI's required
// category groups don't map 1:1 to the seeded category values. We fetch
// the full list once and filter in memory.
export const getAllEquipment = async () => {
  const response = await api.get("/api/equipment");
  return response.data;
};

// GET /api/equipment/:id
export const getEquipmentById = async (id) => {
  const response = await api.get(`/api/equipment/${id}`);
  return response.data;
};
