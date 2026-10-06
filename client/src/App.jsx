import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
export default function App(){const location=useLocation();const isAdminArea=location.pathname.startsWith("/admin");return <>{!isAdminArea&&<Navbar/>}<AppRoutes/>{!isAdminArea&&<Footer/>}</>}
