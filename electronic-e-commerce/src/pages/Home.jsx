// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar.jsx"; 
import Footer from "../components/Footer.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Home_Phone from "../components/Home_Phone.jsx";
import CardSection from "../components/CardSection.jsx";
import RecommendedCardSection from "../components/RecommendedCardSection.jsx";

// Lưu ý: Không cần import "./global.css" ở đây vì nó đã được import ở App.jsx (hoặc main.jsx)

function Home() {
  return (
    // THAY ĐỔI: Giữ lại cấu trúc Flexbox nhưng loại bỏ min-h-screen để App.jsx quản lý nó
    <div className="flex flex-grow flex-col items-center justify-center">
      <Navbar/>
      
      {/* THÊM flex-grow để main chiếm hết không gian còn lại */}
      <main className="flex-grow overflow-x-hidden">
        <HeroSection/>
        <Home_Phone></Home_Phone>
        <CardSection></CardSection>

        <Home_Phone></Home_Phone>
        <CardSection></CardSection>

        <Home_Phone></Home_Phone>
        <CardSection></CardSection>
        
        <RecommendedCardSection></RecommendedCardSection>

      </main>

      <Footer/>
    </div>
  );
}

export default Home;