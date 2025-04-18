import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Checkout from "../pages/Checkout.tsx";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/checkout/:orderId" element={<Checkout />} />
    </Routes>
);

export default AppRoutes;
