import api from "./api.js";
import { clearAdminSession, getAdmin, getAdminToken, saveAdminSession } from "./authStorage.js";
export const adminLogin = async (email, password) => { const response = await api.post("/api/auth/login", { email, password }); saveAdminSession(response.data.token, response.data.admin); return response.data; };
export const adminLogout = () => clearAdminSession();
export { getAdminToken, getAdmin };
export const isAdminAuthenticated = () => Boolean(getAdminToken());
