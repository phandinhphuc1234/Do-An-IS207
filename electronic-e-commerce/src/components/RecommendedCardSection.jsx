import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useRef, useCallback, useEffect } from "react";

// Component RecommendedCard
export function RecommendedCard({ 
    imageSrc = "https://via.placeholder.com/300x300", 
    description, 
    price, 
    saveAmount, 
    originalPrice 
}) {
    return (
        <div className="group min-w-[300px] flex flex-col cursor-pointer">
            <div className="w-full h-64 flex justify-center items-center bg-gray-50 rounded-lg mb-4 
                            group-hover:bg-gray-100 transition-colors overflow-hidden">
                <img 
                    src={imageSrc} 
                    alt={description} 
                    className="max-w-[85%] max-h-[85%] object-contain" 
                />
            </div>
            
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-black leading-tight mb-4 flex-grow">
                    {description}
                </h3>
                
                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-3xl font-bold text-black">
                            ${price}
                        </span>
                        <span className="text-base font-semibold text-red-600">
                            Save ${saveAmount}
                        </span>
                    </div>
                    <p className="text-base text-gray-500 line-through">
                        ${originalPrice}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function RecommendedCardSection() {
    const scrollContainerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0); // 0-100%
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const products = [
        {
            id: 1,
            imageSrc: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=300&h=300&fit=crop",
            description: "5.0 cu. ft. Extra Large Capacity Smart Front Load Washer with Super Speed Wash and Steam in Brushed Black",
            price: 849,
            saveAmount: 350,
            originalPrice: 1199
        },
        {
            id: 2,
            imageSrc: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=300&h=300&fit=crop",
            description: "7.5 cu. ft. Smart Gas Dryer with Steam Sanitize+ and Sensor Dry in Ivory",
            price: 949,
            saveAmount: 350,
            originalPrice: 1299
        },
        {
            id: 3,
            imageSrc: "https://images.unsplash.com/photo-1626806664770-cbdfc8fa96ec?w=300&h=300&fit=crop",
            description: "7.5 cu. ft. Smart Electric Dryer with Steam Sanitize+ and Sensor Dry in Brushed Black",
            price: 849,
            saveAmount: 350,
            originalPrice: 1199
        },
        {
            id: 4,
            imageSrc: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
            description: "Galaxy Buds3 Pro, Silver",
            price: 199.99,
            saveAmount: 50,
            originalPrice: 249.99
        },
        {
            id: 5,
            imageSrc: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop",
            description: "Galaxy Z Fold7 512GB (Unlocked)",
            price: 1819.99,
            saveAmount: 300,
            originalPrice: 2119.99
        }
    ];

    // ✅ THEO DÕI SCROLL - Cập nhật progress bar dựa trên vị trí scroll thực tế
    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        
        // Tính toán khoảng cách có thể scroll tối đa
        const maxScroll = scrollWidth - clientWidth;
        
        // Tính phần trăm đã scroll (0-100%)
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        setScrollProgress(Math.min(progress, 100));
        
        // Cập nhật trạng thái nút
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < maxScroll - 1); // -1 để tránh lỗi làm tròn
    }, []);

    // Lắng nghe sự kiện scroll
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        // Gọi lần đầu để set trạng thái ban đầu
        handleScroll();

        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollAmount = 320; // Card 300px + Gap 20px
    
    const scrollLeft = useCallback(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    }, [scrollAmount]);

    const scrollRight = useCallback(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, [scrollAmount]);

    return (
        <div className="w-full max-w-7xl mx-auto py-8">
            
            <h2 className="text-4xl font-bold text-black mb-8 px-6">
                Recommended for you
            </h2>

            <div className="relative">
                <div 
                    ref={scrollContainerRef} 
                    className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-6"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <RecommendedCard
                            key={product.id}
                            imageSrc={product.imageSrc}
                            description={product.description}
                            price={product.price}
                            saveAmount={product.saveAmount}
                            originalPrice={product.originalPrice}
                        />
                    ))}
                </div>
            </div>

            {/* THANH TIẾN TRÌNH VÀ NÚT ĐIỀU HƯỚNG */}
            <div className="flex items-center justify-between w-full mt-6 px-6">
                
                {/* Thanh Tiến trình - Dựa trên scroll position thực tế */}
                <div className="flex-grow mr-8 h-1 relative max-w-lg">
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-full"></div>
                    <div 
                        className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-300"
                        style={{ width: `${scrollProgress}%` }}
                    ></div>
                </div>
                
                {/* Nút Điều hướng */}
                <div className="flex space-x-3">
                    <button
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors 
                                    ${!canScrollLeft
                                        ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'border-black hover:bg-gray-100'}`
                        }
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors 
                                    ${!canScrollRight
                                        ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'border-black hover:bg-gray-100'}`
                        }
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}