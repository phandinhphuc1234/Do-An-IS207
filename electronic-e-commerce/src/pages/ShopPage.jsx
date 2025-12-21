import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, CreditCard, ChevronDown } from "lucide-react";
import { ProductService } from "../api/productService.js";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

const ShopPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastId, setLastId] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");

  // Danh sách các bộ lọc theo yêu cầu
  const filters = [
    "Shop Online", "Price Range", "Mobile series name", "Carrier", 
    "Model Family", "Storage Size", "Color", "Display Size", 
    "Camera Resolution", "Key Features"
  ];

  const loadProducts = async (isLoadMore = false) => {
    try {
      setLoading(true);
      const currentLastId = isLoadMore ? lastId : 0;
      
      const response = await ProductService.searchAll({
        limit: 12,
        last_id: currentLastId,
        sort: sortOrder
      });

      const newProducts = response.data.products || response.data;
      
      if (isLoadMore) {
        setProducts(prev => [...prev, ...newProducts]);
      } else {
        setProducts(newProducts);
      }

      if (newProducts.length > 0) {
        // Cập nhật ID cuối cùng dựa trên product_id từ database
        setLastId(newProducts[newProducts.length - 1].product_id);
      }
    } catch (error) {
      console.error("Lỗi kết nối Backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [sortOrder]);

  return (
    /* Container chính ép full toàn bộ màn hình */
    <div className="w-full min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />

      {/* PHẦN BỘ LỌC (Thay thế dòng tiêu đề cũ) */}
      <div className="w-full pt-24 px-4 md:px-10">
        {/* Dòng trạng thái và Sắp xếp */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold text-black">Filters</span>
            <span className="text-gray-500 font-medium">{products.length} Results</span>
          </div>
          
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="text-sm font-bold text-black group-hover:underline">Sort Recommended</span>
            <ChevronDown size={18} />
          </div>
        </div>

        {/* Danh sách các nút Filter bo tròn */}
        <div className="flex flex-wrap gap-3 py-6">
          {filters.map((filter, index) => (
            <button 
              key={index}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-bold hover:border-black transition-all bg-white shadow-sm"
            >
              {filter}
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* LƯỚI SẢN PHẨM: Luôn hiển thị 4 sản phẩm trên 1 hàng ở Desktop */}
      <main className="flex-grow w-full px-4 md:px-10 py-6 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product,index) => (
            <div 
              key={`${product.product_id}-${index}`}
              className="flex flex-col h-full bg-white group"
            >
              {/* Vùng click để vào trang chi tiết */}
              <div 
                className="cursor-pointer mb-4" 
                onClick={() => navigate(`/product/${product.product_id}`)}
              >
                {/* Ảnh sản phẩm lấy từ server localhost:8000 */}
                <div className="aspect-square overflow-hidden rounded-2xl bg-[#f7f7f7] flex items-center justify-center p-8 transition-all group-hover:shadow-inner">
                  <img 
                    src={product.image_url ? `http://localhost:8000${product.image_url}` : "/placeholder-product.png"} 
                    alt={product.product_name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
                  />
                </div>

                {/* Tên sản phẩm */}
                <h3 className="text-[15px] font-bold text-gray-900 line-clamp-2 h-11 mt-4 group-hover:text-blue-600 transition-colors">
                  {product.product_name}
                </h3>
              </div>

              {/* Giá sản phẩm (Định dạng USD có 2 số lẻ) */}
              <p className="text-[#006ce5] font-black text-2xl mb-6 mt-auto">
                {new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  minimumFractionDigits: 2 
                }).format(product.price)}
              </p>

              {/* Các nút hành động */}
              <div className="flex flex-col gap-2.5">
                <button className="w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95">
                  <CreditCard size={16} /> BUY NOW
                </button>
                <button className="w-full bg-white text-white border-2 border-black py-3.5 rounded-full flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95">
                  <ShoppingCart size={16} /> ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nút Xem thêm */}
        {products.length > 0 && (
          <div className="flex justify-center mt-24">
            <button 
              onClick={() => loadProducts(true)}
              disabled={loading}
              className="px-14 py-4 border-2 border-black text-white font-black rounded-full hover:bg-black hover:text-white transition-all text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? "LOADING..." : "SHOW MORE RESULTS"}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;