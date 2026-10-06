import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import EquipmentDetailPage from "../pages/EquipmentDetailPage.jsx";
import AdminBookingsPage from "../pages/AdminBookingsPage.jsx";
import AdminLoginPage from "../pages/AdminLoginPage.jsx";
import AdminDashboardPage from "../pages/AdminDashboardPage.jsx";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import ProtectedAdminRoute from "./ProtectedAdminRoute.jsx";
export default function AppRoutes(){return <Routes><Route path="/" element={<LandingPage/>}/><Route path="/equipment/:id" element={<EquipmentDetailPage/>}/><Route path="/admin/login" element={<AdminLoginPage/>}/><Route element={<ProtectedAdminRoute/>}><Route element={<AdminLayout/>}><Route path="/admin/dashboard" element={<AdminDashboardPage/>}/><Route path="/admin/bookings" element={<AdminBookingsPage/>}/></Route></Route><Route path="*" element={<div className="container state-panel"><p className="state-panel__title">Page not found</p><p className="state-panel__body"><Link to="/">Return to the equipment catalog</Link></p></div>}/></Routes>}
