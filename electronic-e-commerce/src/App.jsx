// src/App.jsx (Đã sửa lỗi)
import React from "react";
// Đổi các imports cũ thành import Home mới
import Home from "./pages/Home.jsx"; // Hoặc đường dẫn tương ứng
import "./global.css"; // Giữ lại global CSS ở đây

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Cart from "./pages/Cart.jsx";
import Career from "./pages/Career";
import AboutUs from "./pages/About_Us";
import ContactUs from "./pages/Contact_Us";
import DashBoard from "./pages/Dash_Board";
import VerifiedEmail from "./pages/VerifiedEmail";
import Profile from "./pages/Profile";
import MyRewards from "./pages/MyRewards";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";
import AdminDashboard from "./pages/AdminDashboard";
import MobilePage from "./pages/MobilePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import SearchResults from './components/SearchResults';
import TVAVPage from "./pages/TV-AVPage.jsx";
import ComputingPage from "./pages/ComputingPage.jsx";

function App() {
  return (
    <Router>
        <Routes> 
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/order-success" element={<OrderSuccess/>} />
            <Route path="/my-orders" element={<MyOrders/>} />
            <Route path="/order/:orderId" element={<OrderDetail/>} />
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/career" element={<Career/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/contact-us" element={<ContactUs/>} />
            <Route path="/dashboard" element={<DashBoard/>} />
            <Route path="/verified_email" element={<VerifiedEmail/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/my-rewards" element={<MyRewards/>} />
            <Route path="/mobile/:child_slug" element={<MobilePage />} />
            <Route path="/mobile" element={<Navigate to="/mobile/galaxy-smartphone" replace />} />
            <Route path="/tv-av/:child_slug" element={<TVAVPage />} />
            <Route path="/tv-av" element={<Navigate to="/tv-av/premium-flagship-tvs" replace />} />
            <Route path="/computing-displays/:child_slug" element={<ComputingPage />} />
            <Route path="/computing-displays" element={<Navigate to="/computing-displays/galaxy-book-laptop" replace />} />
            <Route path="/shop" element={<ShopPage/>}/>
            <Route path="/product/:product_id" element={<ProductDetailPage />} />
            <Route path="/resultsearch" element={<SearchResults />} />
        </Routes> 
    </Router>
  );
}

export default App;
