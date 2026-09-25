import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import EquipmentDetailPage from "../pages/EquipmentDetailPage.jsx";
import AdminBookingsPage from "../pages/AdminBookingsPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/equipment/:id" element={<EquipmentDetailPage />} />
      <Route path="/admin/bookings" element={<AdminBookingsPage />} />
      <Route
        path="*"
        element={
          <div className="container state-panel">
            <p className="state-panel__title">Page not found</p>
            <p className="state-panel__body">
              <Link to="/">Return to the equipment catalog</Link>
            </p>
          </div>
        }
      />
    </Routes>
  );
}
