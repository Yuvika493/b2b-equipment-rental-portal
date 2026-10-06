import { NavLink, useNavigate } from "react-router-dom";
import { adminLogout, getAdmin } from "../../services/authService.js";
export default function AdminSidebar() {
  const navigate = useNavigate(); const admin = getAdmin();
  const logout = () => { adminLogout(); navigate("/admin/login", { replace: true }); };
  return <aside className="admin-sidebar">
    <div className="admin-sidebar__brand"><span className="navbar__brand-mark" aria-hidden="true" /><div><strong>Equipment Rental</strong><span>ADMIN PORTAL</span></div></div>
    <nav className="admin-sidebar__nav" aria-label="Admin navigation">
      <NavLink to="/admin/dashboard" className={({isActive}) => `admin-nav-link${isActive ? " admin-nav-link--active" : ""}`}><span>▦</span> Dashboard</NavLink>
      <NavLink to="/admin/bookings" className={({isActive}) => `admin-nav-link${isActive ? " admin-nav-link--active" : ""}`}><span>▤</span> Bookings</NavLink>
      <a href="/#equipment" className="admin-nav-link"><span>◫</span> View Catalog</a>
    </nav>
    <div className="admin-sidebar__bottom"><div className="admin-sidebar__user"><div className="admin-avatar">A</div><div><strong>Administrator</strong><span>{admin?.email || "Admin account"}</span></div></div><button type="button" className="admin-logout" onClick={logout}>↪ Logout</button></div>
  </aside>;
}
