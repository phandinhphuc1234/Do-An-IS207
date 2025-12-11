// src/components/ProductGrid.js
import React from "react";
import Card from "./Card"; // Đảm bảo bạn có file Card.js
import images from "../assets/assets";
import phone1 from "../assets/phone1.png"
export default function CardSection() {
    // Thêm nhiều sản phẩm để thấy rõ hiệu ứng xuống dòng
    const products = [
        { title: "Galaxy S25 Ultra", imageSrc: phone1 },
        { title: "Galaxy Tab S11 Ultra", imageSrc: "https://via.placeholder.com/380x380/f0f0f0/333?text=Tab+S11+Ultra" },
        { title: "Galaxy Z Flip7", imageSrc: "https://via.placeholder.com/380x380/f0f0f0/333?text=Z+Flip7" },
        { title: "Galaxy Watch8", imageSrc: "https://via.placeholder.com/380x380/f0f0f0/333?text=Watch8" }
    ];

    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-12">
                    This week's offers
                </h2>
            </div>
            
            {/* 1. Container bên ngoài cho phép cuộn ngang khi cần */}
            <div className="w-full">

                {/* 2. Container bên trong có chiều rộng full và dùng flexbox để bọc các card */}
                <div className="min-w-full mx-auto px-4 flex flex-wrap justify-center gap-10">
                    
                    {/* Lặp qua các sản phẩm */}
                    {products.map((product) => (
                        <Card
                            key={product.title}
                            title={product.title}
                            imageSrc={product.imageSrc}
                            // 3. Quan trọng: Cung cấp một chiều rộng cơ sở cho mỗi Card
                            //    và ngăn nó co lại
                            className="w-[380px] flex-shrink-0"
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}