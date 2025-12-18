// src/App.jsx (Đã sửa lỗi)
import React from "react";
// Đổi các imports cũ thành import Home mới
import Home from "./pages/Home.jsx"; // Hoặc đường dẫn tương ứng
import "./global.css"; // Giữ lại global CSS ở đây

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Cart from "./pages/Cart.jsx";
import Career from "./pages/Career";
import AboutUs from "./pages/About_Us";
import ContactUs from "./pages/Contact_Us";
import DashBoard from "./pages/Dash_Board";
import VerifiedEmail from "./pages/VerifiedEmail";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
        <Routes> 
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/career" element={<Career/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/contact-us" element={<ContactUs/>} />
            <Route path="/dashboard" element={<DashBoard/>} />
            <Route path="/verified_email" element={<VerifiedEmail/>} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
    </Router>
  );
}

export default App;
