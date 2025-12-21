import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, ShoppingCart, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";
// Đảm bảo đường dẫn import đúng với cấu trúc dự án của bạn
// import Cart from "../pages/Cart"; 

// ============================================
// DỮ LIỆU CHUNG
// ============================================

const menuData = {
  // DỮ LIỆU MEGA MENU (GIỮ NGUYÊN)
  Shop: {
    products: [
      { name: "Galaxy Z Fold7", category: "Foldable" },
      { name: "Galaxy Z Flip7", category: "Foldable" },
      { name: "Galaxy S25 Ultra", category: "Smartphone" },
      { name: "Galaxy Tab S11 Series", category: "Tablet" },
      { name: "Galaxy Watch8", category: "Wearable" },
      { name: "Galaxy Buds3 Pro", category: "Audio" },
    ],
    discover: [
      "Buy Direct Get More",
      "Samsung Week",
      "SmartThings",
      "Samsung Rewards",
      "Student & Workplace Offers",
      "Samsung Care+",
      "Samsung Experience Stores",
      "Curated Collections",
    ],
    promoImages: [
      { name: "Galaxy Z Fold7", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy Z Flip7", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy S25 Ultra", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy Tab S11 Series", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy Watch8", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy Watch Ultra", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy Buds3 Pro", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy Book5 Pro", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Neo QLED 8K TV", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "The Frame Pro", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Q-series Soundbar", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Odyssey OLED", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Bespoke AI Family Hub™+", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Bespoke AI Vented Laundry Combo™", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
    ],
  },
  Mobile: {
    products: [
      { name: "Galaxy S25 Ultra", category: "Flagship" },
      { name: "Galaxy S25+", category: "Flagship" },
      { name: "Galaxy S25", category: "Flagship" },
      { name: "Galaxy A Series", category: "Mid-range" },
      { name: "Galaxy Z Fold7", category: "Foldable" },
      { name: "Galaxy Z Flip7", category: "Foldable" },
    ],
    discover: [
      "5G Smartphones",
      "Galaxy AI Features",
      "Trade-In Program",
      "Mobile Accessories",
      "Samsung Care+",
    ],
    promoImages: [
      { name: "Galaxy S25 Ultra", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy Z Fold7", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy Z Flip7", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy A Series", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
    ],
  },
  "TV & AV": {
    products: [
      { name: "Neo QLED 8K TV", category: "TV" },
      { name: "The Frame Pro", category: "Lifestyle TV" },
      { name: "Odyssey OLED", category: "Gaming Monitor" },
      { name: "Q-series Soundbar", category: "Audio" },
      { name: "Music Frame", category: "Audio" },
      { name: "The Freestyle", category: "Projector" },
    ],
    discover: [
      "Smart TV Features",
      "Gaming Hub",
      "Art Store",
      "SmartThings Integration",
      "TV Buying Guide",
    ],
    promoImages: [
      { name: "Neo QLED 8K TV", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "The Frame Pro", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Q-series Soundbar", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Odyssey OLED", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
    ],
  },
  Appliances: {
    products: [
      { name: "Bespoke AI Family Hub™+", category: "Refrigerator" },
      { name: "Bespoke AI Washer", category: "Laundry" },
      { name: "Bespoke Jet Bot AI+", category: "Vacuum" },
      { name: "WindFree™ AC", category: "Climate" },
      { name: "Smart Oven", category: "Cooking" },
      { name: "AirDresser", category: "Clothing Care" },
    ],
    discover: [
      "Bespoke Collection",
      "AI-powered Appliances",
      "Energy Saving Tips",
      "Smart Home Integration",
      "Installation Services",
    ],
    promoImages: [
      { name: "Bespoke AI Family Hub™+", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Bespoke AI Washer", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Bespoke Jet Bot AI+", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "WindFree™ AC", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
    ],
  },
  "Computing & Displays": {
    products: [
      { name: "Galaxy Book5 Pro", category: "Laptop" },
      { name: "Galaxy Book4 Ultra", category: "Laptop" },
      { name: "Odyssey OLED G9", category: "Gaming Monitor" },
      { name: "ViewFinity S9", category: "Monitor" },
      { name: "Smart Monitor M8", category: "Smart Display" },
      { name: "Portable SSD T9", category: "Storage" },
    ],
    discover: [
      "Galaxy Ecosystem",
      "For Creators",
      "For Gamers",
      "Business Solutions",
      "Student Discounts",
    ],
    promoImages: [
      { name: "Galaxy Book5 Pro", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Galaxy Book4 Ultra", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "Odyssey OLED G9", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
      { name: "ViewFinity S9", image: "https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/pcd-kv/KV_Main_MO.png?$ORIGIN_WEBP$" },
    ],
  },
  Support: {
    links: {
      support: [
        "Support Home",
        "Manuals & Software",
        "Register A Product",
        "Samsung Care",
      ],
      contact: [
        "Chat with us",
        "Order Help",
        "Product Help",
      ],
      repair: [
        "Warranty Information",
        "Find a Service Center",
        "Request A Repair",
        "Cracked Screen Repair",
        "Check Repair Status",
      ],
      additional: [
        "Community",
        "Samsung Care+",
        "Samsung Care+ Mobile",
        "Self Repair Program",
      ],
    },
    tiles: [
      { icon: "📦", title: "Order Help" },
      { icon: "🎧", title: "Product Help" },
      { icon: "🛠️", title: "Request A Repair" },
      { icon: "📱", title: "Register A Product" },
    ],
  },
};

const ACCOUNT_MENU = [
  "My Orders",
  "My Page & Products",
  "My Rewards",
  "Product Registration",
  "Samsung Account",
];




// ============================================
// COMPONENT MỚI: UserAccountPopupBefore (CHƯA ĐĂNG NHẬP)
// ============================================

function UserAccountPopupBefore({ isVisible, onMouseEnter, onMouseLeave }) {
  if (!isVisible) return null;

  const menuItems = [
    { name: "Sign in/Create Account", path: "/login" },
    { name: "Track your orders", path: "/track-orders" },
    { name: "Business account", path: "/business-account" },
  ];

  return (
    <div
      className="absolute top-12 right-0 w-64 bg-white shadow-2xl rounded-xl p-4 transform origin-top-right transition-all duration-300 ease-out z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.95)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul className="space-y-3 text-gray-700">
        {menuItems.map((item, index) => (
          <li key={index} className="pb-1">
            <Link 
              to={item.path} 
              className={`
                block py-1 transition 
                ${
                      index === 0 
                          ? 'font-semibold text-base text-gray-900 hover:text-black' 
                          : 'text-sm font-normal text-gray-800 hover:text-gray-900'
                  }
              `}
            >
              <p
                key={index}
                className={`text-black text-sm ml-4 transition-transform duration-300 ease-out hover:scale-[1.05] ${index === 0 ? "font-bold" : ""}`}
            >
                {item.name}
            </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


// ============================================
// COMPONENT: UserAccountPopup (ĐÃ ĐĂNG NHẬP) - ĐÃ SỬA LỖI LOGOUT
// ============================================

// ============================================
// COMPONENT: UserAccountPopup (ĐÃ ĐĂNG NHẬP) - ĐÃ SỬA GIAO DIỆN THEO ẢNH
// ============================================

function UserAccountPopup({
  isVisible,
  userName,
  menuItems,
  handleLogout,
  onMouseEnter,
  onMouseLeave,
}) {
  if (!isVisible) return null;

  return (
    <div
      className="absolute top-12 right-0 w-[280px] bg-white shadow-2xl rounded-2xl p-6 transform origin-top-right transition-all duration-300 ease-out z-50 font-sans"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.95)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 1. Phần Header/Profile - Sửa thành hàng ngang */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-full">
          <User className="w-6 h-6 text-black" />
        </div>
        <span className="font-bold text-lg text-black">
          {userName}
        </span>
      </div>

      {/* 2. Phần Quyền lợi độc quyền */}
      <div className="flex justify-between items-center py-3 border-b border-gray-200 mb-3 cursor-pointer group">
         <div className="text-sm font-medium text-gray-800 group-hover:text-blue-600 leading-tight pr-2">
            Exclusive benefits with Samsung Account
         </div>
         <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-600 flex-shrink-0"/>
      </div>

      {/* 3. Danh sách Menu */}
      <ul className="space-y-3">
        {menuItems.map((item, index) => {
          // Map "Samsung Account" to /profile
          const path = item === "Samsung Account" 
            ? "/profile" 
            : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
          return (
            <li key={index}>
              <Link to={path}>
                <p className="text-black hover:underline font-normal block py-1 transition-colors">{item}</p>
              </Link>
            </li>
          );
        })}
        
        {/* 4. Log Out - Dạng text bình thường nằm cuối */}
        <li>
        <p className="text-black font-normal hover:text-black 
        hover:underline block py-1 w-full text-left transition-colors" onClick={handleLogout}>Log out</p>
        </li>
      </ul>

    </div>
  );
}


// ============================================
// COMPONENT: MegaMenuDropdown (GIỮ NGUYÊN)
// ============================================

function MegaMenuDropdown({ menuKey, isVisible }) {
  const data = menuData[menuKey];
  if (!data || !isVisible) return null;

  // Nếu biến Menu có key là support thì render ra kiểu khác 
  const isSupportMenu = menuKey === "Support";

  // Hàm render danh sách link con
  const renderLinkGroup = (title, links) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase">{title}</h3>
      <ul className="space-y-1">
        {/* List Rendering kết hợp với condition rendering */}
        {links.map((item, index) => (
          <li key={index}>
            <Link
              to={`/${item.toLowerCase().replace(/\s+|&/g, '-')}`} // Link tạm thời
              className="hover:text-blue-600 transition block"
            >
              <p className = "text-sm font-normal text-gray-700  hover:scale-[1.05] transition-transform duration-300 ease-out">{item}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div
      className="relative left-0 w-full bg-white shadow-xl border-t border-gray-200 z-40"
    >
      <div className="max-w-screen-2xl mx-auto px-8 py-8 flex">

        {isSupportMenu ? (
          // === GIAO DIỆN SUPPORT MENU ===
          <div className="flex w-full justify-between">
            
            {/* Cột 1 & 2: Link chi tiết */}
            <div className="flex flex-1 space-x-16">
              
              {/* Cột A: Support & Contact */}
              <div className="w-1/3">
                {renderLinkGroup("SUPPORT", data.links.support)}
                {renderLinkGroup("CONTACT", data.links.contact)}
              </div>

              {/* Cột B: Repair Services & Additional Support */}
              <div className="w-1/3">
                {renderLinkGroup("REPAIR SERVICES", data.links.repair)}
                {renderLinkGroup("ADDITIONAL SUPPORT", data.links.additional)}
              </div>
            </div>


            {/* Cột 3: Các thẻ Icon (Tiles) */}
            <div className="w-[450px] pl-10 border-l border-gray-200 grid grid-cols-3 gap-4">
              {data.tiles.map((tile, index) => (
                <Link 
                  to={`/${tile.title.toLowerCase().replace(/\s+|&/g, '-')}`} // Link tạm thời
                  key={index}
                  className={`
                    flex flex-col items-center justify-center p-4 
                    bg-gray-50 rounded-lg text-center cursor-pointer 
                    hover:bg-gray-100 transition duration-150
                    ${tile.title === "Register A Product" ? 'col-span-1' : ''} 
                  `}
                >
                  <span className="text-3xl mb-2">{tile.icon}</span> 
                  <p className="text-sm font-semibold text-gray-800">{tile.title}</p>
                </Link>
              ))}
            </div>
          </div>

        ) : (
          // === GIAO DIỆN MENU SẢN PHẨM THÔNG THƯỜNG ===
          <>
            {/* Left - Promo Images */}
            <div className="flex-2 pr-10">
              <div className="grid grid-cols-7 gap-x-4 gap-y-6">
                {data.promoImages?.map((item, index) => (
                  <Link
                    to={`/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`} // Link tạm thời
                    key={index}
                    className="flex flex-col items-center justify-center text-center cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain mb-2" 
                    />
                    <p className="text-xs font-semibold text-gray-800">{item.name}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right - Discover */}
            <div className="w-64 flex-1 border-l border-gray-200 pl-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">DISCOVER</h3>
              <ul className="space-y-3">
                {data.discover.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/discover/${item.toLowerCase().replace(/\s+|&/g, '-')}`} // Link tạm thời
                      className="text-sm font-normal text-gray-700 hover:text-blue-600 transition block"
                    >
                      <p className = "text-sm font-normal text-gray-700  hover:scale-[1.05] transition-transform duration-300 ease-out">{item}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// ============================================
// COMPONENT: Navbar (Main) - ĐÃ CẬP NHẬT LOGIC USER POPUP VÀ LOGOUT
// ============================================

// Khởi tạo trạng thái đăng nhập ban đầu
const INITIAL_USER_STATE = "Phuc Phan"; // Hoặc "" nếu muốn mặc định là chưa đăng nhập

export default function Navbar({ isTransparent = true }) {
  // State cho Mega Menu
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMouseEnter, setMouseEnter] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [userName, setUserName] = useState("Phuc Phan");
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldBeWhite = !isTransparent || isScrolled || isMouseEnter || isUserPopupVisible;

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${shouldBeWhite ? "bg-white shadow-md" : "bg-transparent"}`}
    onMouseLeave={() => {
      setActiveMenu(null);
      setMouseEnter(false);
    }}>
      <nav className={`w-full ${shouldBeWhite ? "text-black" : "text-white"}`}> 
        <div className="flex items-center justify-between px-8 py-3 max-w-screen-2xl mx-auto">
          {/* Logo & Menu */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="font-bold text-2xl tracking-tighter">SAMSUNG</Link>
            <ul className="hidden md:flex space-x-6 font-medium text-sm">
              {["Shop", "Mobile", "TV & AV", "Appliances", "Computing & Displays"].map((item) => (
                <li key={item} onMouseEnter={() => { setActiveMenu(item); setMouseEnter(true); }}>
                  <Link to={`/${item.toLowerCase().replace(/\s+|&/g, '-')}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search & Icons */}
          <div className="flex items-center space-x-6">
            <ul className="hidden lg:flex space-x-4 text-sm font-medium">
              <li onMouseEnter={() => { setActiveMenu("Support"); setMouseEnter(true); }}>Support</li>
              <li className="flex items-center italic">For Business <ChevronRight size={14}/></li>
            </ul>

            {/* TÍCH HỢP Ô SEARCH MỚI TẠI ĐÂY */}
            <div className="w-64">
              <Search />
            </div>

            <div className="flex items-center gap-4">
              <Link to="/cart"><ShoppingCart size={20}/></Link>
              <div className="relative py-2" onMouseEnter={() => setUserPopupVisible(true)} onMouseLeave={() => setUserPopupVisible(false)}>
                <User size={20} className="cursor-pointer"/>
                {/* UserPopup components ở đây... */}
              </div>
            </div>
          </div>
        </div>
        <MegaMenuDropdown menuKey={activeMenu} isVisible={activeMenu !== null} />
      </nav>
    </div>
  );
}