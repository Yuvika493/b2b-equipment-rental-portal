const TOKEN_KEY = "equipment_rental_admin_token";
const ADMIN_KEY = "equipment_rental_admin";
export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);
export const saveAdminSession = (token, admin) => { localStorage.setItem(TOKEN_KEY, token); localStorage.setItem(ADMIN_KEY, JSON.stringify(admin)); };
export const clearAdminSession = () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(ADMIN_KEY); };
export const getAdmin = () => { try { return JSON.parse(localStorage.getItem(ADMIN_KEY) || "null"); } catch { return null; } };
