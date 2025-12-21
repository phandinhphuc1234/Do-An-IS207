import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductService } from "../api/productService.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. ĐỊNH NGHĨA HÀM ĐỊNH DẠNG TIỀN TỆ (Sửa lỗi image_6230e7.png)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(parseFloat(amount) || 0);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getById(id);
        
        // 2. XỬ LÝ DỮ LIỆU TỪ API (Sửa lỗi nhận mảng tại image_614bc9.png)
        if (response.data) {
          // Nếu API trả về mảng [{...}], lấy phần tử đầu tiên
          const data = Array.isArray(response.data) ? response.data[0] : response.data;

          if (!data || Object.keys(data).length === 0) {
            setProduct(null);
            return;
          }

          // 3. XỬ LÝ JSON CHO THÔNG SỐ KỸ THUẬT
          try {
            data.parsedSpec = typeof data.specification === 'string' ? JSON.parse(data.specification) : data.specification;
            data.parsedAttr = typeof data.attributes === 'string' ? JSON.parse(data.attributes) : data.attributes;
          } catch (e) {
            console.error("Lỗi parse JSON:", e);
            data.parsedSpec = {};
            data.parsedAttr = {};
          }
          
          setProduct(data);
        }
      } catch (error) {
        console.error("Lỗi API:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // HIỂN THỊ TRẠNG THÁI LOADING
  if (loading) return <div className="p-20 text-center font-bold">Đang tải sản phẩm...</div>;

  // HIỂN THỊ NẾU KHÔNG TÌM THẤY SẢN PHẨM (Sửa lỗi image_61c7eb.png)
  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Sản phẩm không tồn tại!</h2>
      <button onClick={() => navigate('/')} className="px-6 py-2 bg-black text-white rounded-lg">Quay lại trang chủ</button>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      
      <main className="w-full px-6 md:px-12 lg:px-20 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* TRÁI: ẢNH SẢN PHẨM */}
          <div className="bg-[#f7f7f7] rounded-[40px] p-10 flex items-center justify-center aspect-square shadow-sm">
            <img 
              // Kết hợp URL Backend và image_url từ database
              src={product.image_url ? `http://localhost:8000${product.image_url}` : "/placeholder.png"} 
              alt={product.product_name}
              className="max-w-full max-h-full object-contain mix-blend-multiply"
              // CHẶN VÒNG LẶP VÔ TẬN (Sửa lỗi image_60ee2e.png)
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/placeholder.png"; 
              }}
            />
          </div>

          {/* PHẢI: CHI TIẾT SẢN PHẨM */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-black text-gray-900 mb-8 leading-tight">
              {product.product_name}
            </h1>

            {/* BOX GIÁ TIỀN & SKU */}
            <div className="bg-[#f0f7ff] p-10 rounded-[32px] mb-10 border border-blue-50">
              <span className="text-5xl font-black text-[#006ce5] block mb-2">
                {formatCurrency(product.sale_price || product.base_price)}
              </span>
              <p className="text-blue-600 font-bold text-sm tracking-widest uppercase">
                MÃ SKU: {product.sku || 'N/A'}
              </p>
            </div>

            {/* THÔNG SỐ KỸ THUẬT */}
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 mb-12 py-8 border-y border-gray-100">
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Âm thanh</p>
                <p className="text-lg font-bold text-gray-800">{product.parsedSpec?.sound || "Chưa cập nhật"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Kích thước</p>
                <p className="text-lg font-bold text-gray-800">{product.parsedAttr?.screen_size || "Chưa cập nhật"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Bộ vi xử lý</p>
                <p className="text-lg font-bold text-gray-800">{product.parsedSpec?.processor || "Chưa cập nhật"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Cân nặng</p>
                <p className="text-lg font-bold text-gray-800">{product.weight ? `${product.weight}g` : "Chưa cập nhật"}</p>
              </div>
            </div>

            {/* NÚT HÀNH ĐỘNG */}
            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white py-6 rounded-2xl font-black text-lg hover:opacity-90 transition-all active:scale-95 shadow-lg">
                BUY
              </button>
              <button className="flex-1 border-2 border-black py-6 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all active:scale-95">
                ADD TO CARD
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;