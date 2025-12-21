// src/components/ProductGrid.js
import React from "react";
import Card from "./Card"; // Đảm bảo bạn có file Card.js

export default function CardSection() {
    // Thêm nhiều sản phẩm để thấy rõ hiệu ứng xuống dòng
    const products = [
        {
            title: "Galaxy S25 Ultra",
            imageSrc: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra.jpg"
        },
        {
            title: "Galaxy Tab S10 Ultra",
            imageSrc: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s10-ultra.jpg"
        },
        {
            title: "Galaxy Z Flip6",
            imageSrc: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip6.jpg"
        },
        {
            title: "Galaxy Watch7",
            imageSrc: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch7.jpg"
        }
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