import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useRef, useCallback, useEffect } from "react";

// Component RecommendedCard - Same size as CardSection (w-[295px] h-[350px])
export function RecommendedCard({ 
    imageSrc = "https://via.placeholder.com/300x300", 
    description, 
    price, 
    saveAmount, 
    originalPrice 
}) {
    return (
        <div className="group flex-shrink-0 w-[295px] flex flex-col cursor-pointer">
            {/* Image Container - same as Card.jsx */}
            <div className="w-[295px] h-[350px] flex justify-center items-center bg-white rounded-lg mb-4 
                            group-hover:bg-gray-50 transition-colors overflow-hidden shadow-xl">
                <img 
                    src={imageSrc} 
                    alt={description} 
                    className="max-w-[90%] max-h-[90%] object-contain" 
                />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
                <h3 className="text-base font-bold leading-snug mb-3 line-clamp-4" style={{ fontFamily: 'Inter, sans-serif', color: '#000' }}>
                    {description}
                </h3>
                
                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-lg font-bold" style={{ fontFamily: 'Inter, sans-serif', color: '#000' }}>
                            ${price}
                        </span>
                        {saveAmount > 0 && (
                            <span className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#00a9a5' }}>
                                Save ${saveAmount}
                            </span>
                        )}
                    </div>
                    {originalPrice && (
                        <p className="text-sm line-through mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: '#999' }}>
                            ${originalPrice}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function RecommendedCardSection() {
    const scrollContainerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const products = [
        {
            id: 1,
            imageSrc: "https://images.samsung.com/is/image/samsung/p6pim/us/wf53bb8700avus/gallery/us-bespoke-ai-laundry-wf53bb8700av-wf53bb8700av-us-thumb-539296067",
            description: "5.0 cu. ft. Extra Large Capacity Smart Front Load Washer with Super Speed Wash and Steam in Brushed Black",
            price: 849,
            saveAmount: 350,
            originalPrice: 1199
        },
        {
            id: 2,
            imageSrc: "https://images.samsung.com/is/image/samsung/p6pim/us/sm-r630nzaaxar/gallery/us-galaxy-buds3-pro-sm-r630-sm-r630nzaaxar-thumb-543565498",
            description: "Galaxy Buds3 Pro, Silver",
            price: 249.99,
            saveAmount: 0,
            originalPrice: null
        },
        {
            id: 3,
            imageSrc: "https://images.samsung.com/is/image/samsung/p6pim/us/ef-dx910ubeguj/gallery/us-galaxy-tab-s9-ultra-book-cover-keyboard-slim-ef-dx910-ef-dx910ubeguj-thumb-537884404",
            description: "Book Cover Keyboard Slim - Galaxy Tab S11 Ultra",
            price: 209.99,
            saveAmount: 0,
            originalPrice: null
        },
        {
            id: 4,
            imageSrc: "https://images.samsung.com/is/image/samsung/p6pim/us/ls32dm702unxza/gallery/us-smart-monitor-m7-m70d-ls32dm702unxza-thumb-539564893",
            description: "32\" Smart Monitor M7 M70F 4K Samsung Vision AI in black",
            price: 229.99,
            saveAmount: 170,
            originalPrice: 399.99
        },
        {
            id: 5,
            imageSrc: "https://images.samsung.com/is/image/samsung/p6pim/us/wf53bb8900avus/gallery/us-bespoke-ai-laundry-combo-wf53bb8900av-wf53bb8900av-us-thumb-539296067",
            description: "5.3 cu. ft. Bespoke AI Laundry Vented Combo™ All-in-One Ultra Capacity Washer and Electric Dryer with AI Home in Brushed Black",
            price: 2099,
            saveAmount: 1000,
            originalPrice: 3099
        },
        {
            id: 6,
            imageSrc: "https://images.samsung.com/is/image/samsung/p6pim/us/dw80cg5451sraa/gallery/us-smart-52dba-dishwasher-with-stormwash-dw80cg5451sr-dw80cg5451sraa-thumb-537884404",
            description: "AutoRelease Smart 46dBA Dishwasher with StormWash™ in Stainless Steel",
            price: 549,
            saveAmount: 350,
            originalPrice: 899
        },
        {
            id: 7,
            imageSrc: "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uzaexaa/gallery/us-galaxy-s25-ultra-sm-s938-sm-s938uzaexaa-thumb-543565498",
            description: "Galaxy S25 Ultra 256GB (Unlocked)",
            price: 1299.99,
            saveAmount: 0,
            originalPrice: null
        },
        {
            id: 8,
            imageSrc: "https://images.samsung.com/is/image/samsung/p6pim/us/qn65s95dafxza/gallery/us-oled-s95d-qn65s95dafxza-thumb-539564893",
            description: "65\" Class OLED S95D 4K Smart TV (2024)",
            price: 2599.99,
            saveAmount: 400,
            originalPrice: 2999.99
        }
    ];

    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        
        setScrollProgress(Math.min(progress, 100));
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < maxScroll - 1);
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollAmount = 400;
    
    const scrollLeftFn = useCallback(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    }, [scrollAmount]);

    const scrollRightFn = useCallback(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, [scrollAmount]);

    return (
        <div className="w-full max-w-7xl mx-auto py-10 px-4">
            
            <h2 className="text-2xl font-bold text-black mb-6">
                Recommended for you
            </h2>

            <div className="relative">
                <div 
                    ref={scrollContainerRef} 
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
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

            {/* Progress Bar & Navigation - Centered */}
            <div className="flex items-center justify-center gap-8 mt-8">
                
                {/* Progress Bar */}
                <div className="w-96 h-1 relative bg-gray-200 rounded-full">
                    <div 
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(scrollProgress, 10)}%`, backgroundColor: '#000' }}
                    ></div>
                </div>
                
                {/* Navigation Buttons - Circle 40x40 */}
                <div className="flex gap-3">
                    <button
                        onClick={scrollLeftFn}
                        disabled={!canScrollLeft}
                        className="flex items-center justify-center transition-all bg-white"
                        style={{ 
                            width: '40px',
                            height: '40px',
                            minWidth: '40px',
                            minHeight: '40px',
                            maxWidth: '40px',
                            maxHeight: '40px',
                            borderRadius: '50%',
                            border: canScrollLeft ? '1px solid #000' : '1px solid #d1d5db',
                            cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: canScrollLeft ? '#000' : '#d1d5db',
                            padding: 0,
                            lineHeight: 1
                        }}
                        aria-label="Scroll left"
                    >
                        ‹
                    </button>
                    
                    <button
                        onClick={scrollRightFn}
                        disabled={!canScrollRight}
                        className="flex items-center justify-center transition-all bg-white"
                        style={{ 
                            width: '40px',
                            height: '40px',
                            minWidth: '40px',
                            minHeight: '40px',
                            maxWidth: '40px',
                            maxHeight: '40px',
                            borderRadius: '50%',
                            border: canScrollRight ? '1px solid #000' : '1px solid #d1d5db',
                            cursor: canScrollRight ? 'pointer' : 'not-allowed',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: canScrollRight ? '#000' : '#d1d5db',
                            padding: 0,
                            lineHeight: 1
                        }}
                        aria-label="Scroll right"
                    >
                        ›
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
