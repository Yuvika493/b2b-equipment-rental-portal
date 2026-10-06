import api from "./api.js";
export const getDashboardStats = async () => (await api.get("/api/admin/dashboard")).data;
