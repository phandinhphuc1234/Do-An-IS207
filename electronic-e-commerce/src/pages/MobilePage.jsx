import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Search from "../components/Search.jsx";

const MobilePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SỬA LỖI: Định nghĩa hàm formatCurrency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(amount) || 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Gọi API lấy sản phẩm mobile
        const response = await axios.get('http://localhost:8000/api/mobile-all');
        setProducts(response.data);
      } catch (err) {
        // Lấy thông tin lỗi SQL nếu có để hiển thị
        setError(err.response?.data?.details || "Không thể kết nối với máy chủ.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // XÓA CHUYỂN CẢNH ĐEN: Không dùng return "Đang tải" ở đây nữa

  return (
    <div className="w-screen min-h-screen bg-white pt-20">
      <Navbar isTransparent={false} />
      <Search />
      {/* Header & Filter Bar (Hiện ngay lập tức) */}
      <div className="px-10 py-6 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg border-r pr-6 border-gray-300">Filters</span>
          <span className="text-gray-600 font-medium">
            {loading ? "..." : products.length} Results
          </span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer font-bold">
          Sort Recommended <ChevronDown size={18} />
        </div>
      </div>

      {/* Thanh Filter mẫu theo image_950f60.png */}
      <div className="px-10 py-4 flex flex-wrap gap-3 bg-white border-b border-gray-50 overflow-x-auto whitespace-nowrap">
        {["Shop Online", "Price Range", "Mobile series", "Carrier", "Storage"].map((f) => (
          <button key={f} className="px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold flex items-center gap-2 hover:border-black transition-all">
            {f} <ChevronDown size={14} />
          </button>
        ))}
      </div>

      <main className="px-10 py-12">
        {loading ? (
          /* Hiệu ứng tải nhẹ bên trong trang thay vì màn hình đen */
          <div className="flex flex-col items-center justify-center py-20">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
             <p className="mt-4 text-gray-500">Đang tìm sản phẩm...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold bg-red-50 rounded-3xl border p-6">
            <p>Lỗi: {error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 underline">Tải lại trang</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((item) => (
              <div key={item.product_id} className="group border border-gray-100 rounded-[40px] p-8 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                {/* Hình ảnh */}
                <div className="aspect-square mb-8 flex items-center justify-center overflow-hidden">
                  <img 
                    src={`http://localhost:8000${item.image_url}`} 
                    alt={item.product_name}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex-grow flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-3 text-center line-clamp-2 min-h-[3.5rem] group-hover:underline">
                        {item.product_name}
                    </h3>
                    <p className="text-[#2189ff] text-2xl font-black mb-8">
                        {formatCurrency(item.sale_price || item.base_price)}
                    </p>
                </div>
                
                {/* NÚT BẤM */}
                <div className="flex flex-col gap-3 mt-auto">
                  <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-colors uppercase tracking-wider">
                    BUY
                  </button>
                  
                  {/* THÊM VÀO GIỎ (ADD TO CARD) - Nằm dưới MUA NGAY */}
                  <button className="w-full border-2 border-black text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors uppercase tracking-wider">
                    <ShoppingCart size={18} /> ADD TO CARD
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MobilePage;