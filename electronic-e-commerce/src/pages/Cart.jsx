import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User, ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Youtube, Plus, Minus } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from 'react-router-dom';
// --- START: Footer Component ---


const paymentMethods = [
    "VISA", "MASTERCARD", "AMEX", "DISCOVER", "PAYPAL", "G PAY", 
    "APPLE PAY", "AFFIRM", "KLARNA", "SAMSUNG PAY", "SAMSUNG FINANCING"
];

// FAQ Component
const FAQSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "When will my item(s) be shipped or delivered?",
            answer: "Shipping times vary by product and location. Most in-stock items ship within 1-3 business days. You'll receive tracking information via email once your order ships."
        },
        {
            question: "Where can I check the offers that apply toward my purchase?",
            answer: "Available offers and promotions will be displayed on the product page and in your cart. You can also check our Offers page for current deals."
        },
        {
            question: "Can I return my item(s) for a full refund?",
            answer: "Most products can be returned within 15 days of delivery for a full refund. Some items may have different return windows. Visit our Returns page for full details."
        },
        {
            question: "What are Energy Star Rebates?",
            answer: "Energy Star rebates are incentives offered by utility companies and government programs for purchasing energy-efficient appliances. Check with your local utility for available rebates."
        },
        {
            question: "Where can I find rebate details for my order?",
            answer: "Rebate information is available on the product page and in your order confirmation email. You can also visit our Rebates page for more details."
        },
        {
            question: "What is the Samsung Trade-in Program and where can I learn more?",
            answer: "The Samsung Trade-in Program lets you trade in eligible devices for credit toward a new purchase. Visit our Trade-in page to check your device's value."
        },
        {
            question: "What does the \"Ships by\" date mean?",
            answer: "The 'Ships by' date indicates when your order is expected to leave our warehouse. Delivery time depends on your shipping method and location."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full py-4">
            <div className="w-full">
                {/* Collapsible Header */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-200"
                >
                    <h2 className="text-xl font-bold text-black">
                        Frequently Asked Questions
                    </h2>
                    <ChevronRight 
                        className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isOpen ? 'rotate-90' : '-rotate-90'}`} 
                    />
                </button>

                {/* FAQ List - Collapsible */}
                {isOpen && (
                    <div className="mt-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index}
                                className="border-b border-gray-200"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between py-5 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-sm text-gray-800">{faq.question}</span>
                                    <Plus className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-45' : ''}`} />
                                </button>
                                {openIndex === index && (
                                    <div className="pb-5 text-sm text-gray-600 pr-8">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const App = () => {
    const isCartEmpty = true; 

    const handleSignIn = () => {
        console.log("Sign in button clicked!");
    };

    return (
        <div className="flex flex-col min-h-screen w-screen bg-white font-sans"> 
            
            <Navbar isTransparent={false} />

            <main className="flex-grow w-full flex flex-col items-center mt-16 pb-20">
                
                <div className="w-full pb-3 mb-16 border-b border-gray-300">
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-8">
                        <h1 className="text-4xl font-extrabold">Cart</h1>
                        <span className="text-sm text-gray-700">Zip code: <span className="text-blue-600 font-medium cursor-pointer hover:underline">10001</span></span>
                    </div>
                </div>

                {isCartEmpty && (
                    <div className="max-w-3xl mx-auto flex flex-col items-center text-center py-10 flex-grow -mt-12">
                        
                        <div className="mt-10 mb-12">
                            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                            <p className="text-base text-gray-600 mb-8">Sign in to see if you have saved some items in cart.</p>
                        </div>
                        
                        {/* Button with solid background color */}
                        <Link to="/login">
                            <button 
                                onClick={handleSignIn}
                                className="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 h-11 w-64 rounded-full transition-all duration-200 font-medium text-sm flex items-center justify-center cursor-pointer border-none outline-none"
                            >
                                Sign In
                            </button>
                        </Link>
                        <p className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer">Continue Shopping</p>
                    </div>
                )}
                
                {/* Supported Payment Types & FAQ Section */}
                <div className="w-full mt-auto bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                        {/* Payment Types */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 py-6">
                            <span className="text-sm text-gray-600 whitespace-nowrap mr-2">
                                Supported payment types
                            </span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-5 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-5 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" alt="Discover" className="h-4 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-5 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5 object-contain" />
                            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">affirm</span>
                            <span className="text-xs font-semibold text-pink-500 bg-pink-50 px-2 py-1 rounded">Klarna</span>
                            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">venmo</span>
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                                <span className="w-4 h-4 bg-blue-600 rounded-sm"></span>
                                Samsung Financing
                            </span>
                        </div>
                        
                        {/* FAQ Section - Inline */}
                        <FAQSection />
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default App;