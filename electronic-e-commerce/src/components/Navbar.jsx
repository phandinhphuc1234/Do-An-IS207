import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
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
          // Map menu items to correct paths
          let path;
          if (item === "Samsung Account") {
            path = "/profile";
          } else if (item === "My Page & Products") {
            path = "/dashboard";
          } else if (item === "My Rewards") {
            path = "/my-rewards";
          } else {
            path = `/${item.toLowerCase().replace(/\s+/g, '-')}`;
          }
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

// Khởi tạo trạng thái đăng nhập ban đầu - mặc định là chưa đăng nhập
const INITIAL_USER_STATE = "";

export default function Navbar({ isTransparent = true }) {
  // State cho Mega Menu
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMouseEnter, setMouseEnter] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  // 💡 THAY ĐỔI 1: State cho trạng thái đăng nhập
  const [userName, setUserName] = useState(INITIAL_USER_STATE);

  // Hàm đọc user từ localStorage
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");
    console.log("Navbar loadUserFromStorage:", { storedUser, accessToken });
    
    if (storedUser && accessToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const name = parsedUser.full_name || parsedUser.name || parsedUser.email || "";
        console.log("Navbar setting userName:", name);
        setUserName(name);
      } catch (e) {
        console.error("Lỗi parse user data", e);
        setUserName("");
      }
    } else {
      setUserName("");
    }
  };

  useEffect(() => {
    // Đọc user khi component mount
    loadUserFromStorage();

    // Lắng nghe sự kiện storage thay đổi (khi login/logout từ tab khác)
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === "access_token") {
        loadUserFromStorage();
      }
    };

    // Lắng nghe custom event khi login thành công (cùng tab)
    const handleLoginSuccess = () => {
      loadUserFromStorage();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loginSuccess", handleLoginSuccess);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginSuccess", handleLoginSuccess);
    };
  }, []);

  // State MỚI cho User Popup
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);

  // Logic kiểm tra trạng thái đăng nhập
  const isLoggedIn = userName && userName.length > 0;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Màu nền/chữ phụ thuộc vào cuộn trang HOẶC chuột đang nằm trong khu vực Mega Menu HOẶC User Popup
  // => Logic này kiểm soát nền Navbar chuyển sang màu trắng/chữ đen khi có dropdown mở
  const shouldBeWhite = !isTransparent||isScrolled || isMouseEnter || isUserPopupVisible;

  const bgColor = shouldBeWhite ? "bg-white shadow-md" : "bg-transparent";
  const textColor = shouldBeWhite ? "text-black" : "text-white";
  const iconColor = shouldBeWhite ? "text-gray-800" : "text-white";
  const searchBg = shouldBeWhite ? "bg-gray-100" : "bg-white bg-opacity-20";

  const menuItems = ["Shop", "Mobile", "TV & AV", "Appliances", "Computing & Displays"];

  // Hàm đóng Mega Menu: Khi chuột rời khỏi TOÀN BỘ KHỐI Navbar + Mega Menu
  const handleContainerMouseLeave = () => {
    setActiveMenu(null);
    // Chỉ reset nền nếu cả Mega Menu và User Popup đều đóng
    if (!isUserPopupVisible) {
        setMouseEnter(false);
    }
  }

  // Logic MỚI: Xử lý User Popup với useRef để cancel timeout
  const popupTimeoutRef = useRef(null);

  const handleUserBlockMouseEnter = () => {
    // Cancel timeout nếu có
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = null;
    }
    // 1. Hiển thị User Popup
    setUserPopupVisible(true);
    // 2. Giữ nền trắng (thông qua setMouseEnter)
    setMouseEnter(true);
    // 3. Đóng Mega Menu nếu nó đang mở (ưu tiên User Popup)
    setActiveMenu(null);
  };

  const handleUserBlockMouseLeave = () => {
    // Đặt timeout để đóng popup
    popupTimeoutRef.current = setTimeout(() => {
      setUserPopupVisible(false);
      if (activeMenu === null) {
        setMouseEnter(false);
      }
    }, 300);
  };

  // Khi chuột vào popup - cancel timeout
  const handlePopupMouseEnter = () => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = null;
    }
  };

  // Khi chuột rời popup - đóng popup
  const handlePopupMouseLeave = () => {
    popupTimeoutRef.current = setTimeout(() => {
      setUserPopupVisible(false);
      if (activeMenu === null) {
        setMouseEnter(false);
      }
    }, 300);
  };

  // 💡 THAY ĐỔI 2: Hàm xử lý Đăng Xuất. Cập nhật state userName và xóa localStorage.
  const handleLogout = () => {
      // Xóa tokens và user info khỏi localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      
      setUserName(""); // Đặt tên người dùng về rỗng
      setUserPopupVisible(false); // Đóng popup
      setMouseEnter(false); // Reset màu nền (nếu cần)
  };


  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgColor}`}
      onMouseLeave={handleContainerMouseLeave} // Logic đóng Mega Menu/Reset nền
    >
      <nav className={`w-full ${textColor}`} > 
        <div className="flex items-center justify-between px-8 py-3 max-w-screen-2xl mx-auto">
          {/* Left - Logo + Menu */}
          <div className="flex items-center space-x-8">
            {/* ⚠️ FIX QUAN TRỌNG TẠI ĐÂY:
                Thêm className={textColor} vào Link để ghi đè màu xanh mặc định của thẻ a.
                Điều này giúp logo đổi màu trắng/đen theo logic của Navbar.
            */}
            <Link to="/" className={`${textColor} hover:opacity-70 transition-colors`}>
                <div className="font-bold text-2xl cursor-pointer"> <p className={'${textColor}'} > SAMSUNG </p> </div>
            </Link>     
            
            {/* Danh sách menu chính */}
            <ul className="hidden md:flex space-x-6 font-medium text-sm">
              {menuItems.map((item) => (
                <li
                  key={item}
                  className="relative cursor-pointer py-2 hover:opacity-70 transition"
                  onMouseEnter={() => {
                    setActiveMenu(item);
                    setMouseEnter(true); 
                    setUserPopupVisible(false); // Đóng User Popup khi mở Mega Menu
                  }}
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>


          </div>

          {/* Right - Search + Icons */}
          <div className="flex items-center space-x-4">
            <ul className={`hidden md:flex space-x-4 font-medium text-sm ${textColor}`}>
              <li 
                className="hover:opacity-70 cursor-pointer" 
                onMouseEnter={() => {
                  setActiveMenu("Support");
                  setMouseEnter(true); 
                    setUserPopupVisible(false); // Đóng User Popup
                }} 
              >
                Support
              </li>
              <li className="hover:opacity-70 cursor-pointer flex items-center">
                For Business <ChevronRight className="w-3 h-3 ml-1" />
              </li>
            </ul>

            {/* Search */}
            <div className={`flex items-center rounded-full px-3 py-2 w-44 ${searchBg}`}>
              <Search className={`w-4 h-4 text-gray-800`} />
              <input
                type="text"
                placeholder="Search"
                className={`bg-transparent text-sm pl-2 focus:outline-none w-full placeholder-gray-400 ${textColor}`} 
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <Link to={"/cart"}>
                <ShoppingCart className={`w-5 h-5 cursor-pointer ${iconColor} hover:opacity-70`} />
              </Link>
              {/* KHỐI USER ICON VÀ POPUP */}
              <div 
                className="relative flex items-center h-full p-2"
                onMouseEnter={handleUserBlockMouseEnter}
                onMouseLeave={handleUserBlockMouseLeave}
              >
                  <User 
                      className={`w-5 h-5 cursor-pointer ${iconColor} hover:opacity-70`}
                  />    
                
                {/* LOGIC HIỂN THỊ POPUP */}
                {isLoggedIn ? (
                  <UserAccountPopup
                    isVisible={isUserPopupVisible}
                    userName={userName}
                    menuItems={ACCOUNT_MENU}
                    handleLogout={handleLogout}
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  />
                ) : (
                  <UserAccountPopupBefore
                    isVisible={isUserPopupVisible}
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  />
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <MegaMenuDropdown
          menuKey={activeMenu}
          isVisible={activeMenu !== null}
        />
      </nav>

    </div>
  );
}