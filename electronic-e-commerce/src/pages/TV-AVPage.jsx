import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TVAVPage = () => {
    const { child_slug } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    // 1. Cấu hình BASE_URL đồng bộ với Backend
    const BASE_URL = 'http://localhost:8000';
    
    const [filters, setFilters] = useState({
        keyword: '',
        resolution: [],
        technology: [],
        screenSize: [],
        sort: 'desc',
        last_id: 0,
        limit: 12 // Giảm xuống 12 để chia hết cho grid 3 và 4
    });

    const fetchProducts = useCallback(async (isRefresh = true) => {
        if (!child_slug) return;
        setLoading(true);
        setErrorMsg(null);
        
        try {
            const currentLastId = isRefresh ? 0 : filters.last_id;
            
            const params = {
                ...filters,
                resolution: filters.resolution.join(','),
                technology: filters.technology.join(','),
                screenSize: filters.screenSize.join(','),
                last_id: currentLastId
            };

            const response = await axios.get(`${BASE_URL}/api/tv-av/${child_slug}`, { params });
            
            if (Array.isArray(response.data)) {
                const data = response.data;
                if (isRefresh) setProducts(data);
                else setProducts(prev => [...prev, ...data]);

                if (data.length < filters.limit) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                    setFilters(prev => ({ ...prev, last_id: data[data.length - 1].product_id }));
                }
            }
        } catch (error) {
            setErrorMsg("Không thể kết nối đến máy chủ để tải danh sách TV.");
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    }, [child_slug, filters]);

    useEffect(() => {
        if (!child_slug) {
            navigate('/tv-av/premium-flagship-tvs');
        } else {
            fetchProducts(true);
        }
    }, [child_slug, navigate]);

    const toggleArrayFilter = (key, value) => {
        const current = [...filters[key]];
        const index = current.indexOf(value);
        index > -1 ? current.splice(index, 1) : current.push(value);
        setFilters(prev => ({ ...prev, [key]: current }));
    };

    return (
        <div className="bg-white min-h-screen w-full flex flex-col">
            <Navbar />

            <div className="flex-grow w-full px-4 md:px-10 py-8 flex flex-col md:flex-row gap-8 mt-14">
                
                {/* SIDEBAR FILTERS */}
                <aside className="w-full md:w-72 flex-shrink-0 space-y-8 bg-gray-50 p-6 rounded-2xl h-fit sticky top-24 shadow-sm">
                    <h3 className="font-bold text-xl border-b pb-3 text-black flex items-center gap-2">
                        <span>📺</span> Bộ lọc TV & AV
                    </h3>
                    
                    {/* Sắp xếp */}
                    <div>
                        <h4 className="text-black font-bold mb-3 text-xs uppercase tracking-widest">Sắp xếp theo giá</h4>
                        <select 
                            value={filters.sort}
                            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                            className="w-full border-none rounded-xl p-3 text-sm outline-none bg-white shadow-sm font-medium"
                        >
                            <option value="desc">Giá: Cao đến Thấp</option>
                            <option value="asc">Giá: Thấp đến Cao</option>
                        </select>
                    </div>

                    {/* Lọc Độ phân giải */}
                    <div>
                        <h4 className="text-black font-bold mb-3 text-xs uppercase tracking-widest">Độ phân giải</h4>
                        <div className="space-y-2">
                            {['4K UHD', '8K UHD', 'Crystal UHD'].map(item => (
                                <label key={item} className="flex items-center gap-3 cursor-pointer group p-1">
                                    <input type="checkbox" className="w-5 h-5 rounded-md accent-blue-600" 
                                        checked={filters.resolution.includes(item)} 
                                        onChange={() => toggleArrayFilter('resolution', item)} 
                                    />
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Lọc Công nghệ */}
                    <div>
                        <h4 className="text-black font-bold mb-3 text-xs uppercase tracking-widest">Công nghệ màn hình</h4>
                        <div className="space-y-2">
                            {['OLED', 'QLED', 'Neo QLED', 'Micro LED'].map(item => (
                                <label key={item} className="flex items-center gap-3 cursor-pointer group p-1">
                                    <input type="checkbox" className="w-5 h-5 rounded-md accent-blue-600" 
                                        checked={filters.technology.includes(item)} 
                                        onChange={() => toggleArrayFilter('technology', item)} 
                                    />
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Lọc Kích thước */}
                    <div>
                        <h4 className="text-black font-bold mb-3 text-xs uppercase tracking-widest">Kích thước màn hình</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {['55-inch', '65-inch', '75-inch', '85-inch', '98-inch'].map(item => (
                                <button 
                                    key={item}
                                    onClick={() => toggleArrayFilter('screenSize', item)}
                                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                                        filters.screenSize.includes(item) 
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-600'
                                    }`}
                                >
                                    {item.replace('-inch', '"')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => fetchProducts(true)} 
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
                    >
                        Áp dụng bộ lọc
                    </button>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
                            {child_slug?.replace(/-/g, ' ')}
                        </h1>
                        <p className="text-gray-400 font-medium mt-1">Trải nghiệm rạp chiếu phim tại gia đỉnh cao</p>
                    </div>

                    {errorMsg && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 font-bold text-center border border-red-100">
                            {errorMsg}
                        </div>
                    )}

                    {Array.isArray(products) && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div 
                                    key={product.product_id} 
                                    onClick={() => navigate(`/product/${product.product_id}`)}
                                    className="cursor-pointer bg-white rounded-[32px] p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500 group flex flex-col"
                                >
                                    <div className="aspect-video w-full mb-6 relative rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
                                        <img 
                                            // 2. FIX: Nối BASE_URL vào ảnh
                                            src={`${BASE_URL}${product.image_url}`} 
                                            alt={product.product_name} 
                                            className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-700" 
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=TV+Image'; }}
                                        />
                                    </div>
                                    
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {product.product_name}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-2 py-1 bg-gray-100 text-[10px] font-bold rounded text-gray-500 uppercase">
                                                {product.technology || 'Smart TV'}
                                            </span>
                                            <span className="px-2 py-1 bg-gray-100 text-[10px] font-bold rounded text-gray-500 uppercase">
                                                {product.resolution || '4K'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-2xl font-black text-black">
                                            ${Number(product.price).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="bg-black text-white py-3 rounded-2xl font-bold text-sm hover:opacity-80 transition-opacity">
                                            Mua ngay
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/product/${product.product_id}`);
                                            }}
                                            className="bg-white border-2 border-black text-black py-3 rounded-2xl font-bold text-sm hover:bg-black hover:text-white transition-all"
                                        >
                                            Chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !loading && (
                            <div className="text-center py-32 bg-gray-50 rounded-3xl">
                                <p className="text-gray-400 text-lg font-medium">Hiện không có sản phẩm TV nào phù hợp với bộ lọc.</p>
                            </div>
                        )
                    )}
                    
                    {loading && (
                        <div className="text-center py-20 flex flex-col items-center">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="font-bold text-gray-600 tracking-widest uppercase">Đang tìm TV tốt nhất cho bạn...</p>
                        </div>
                    )}

                    {hasMore && products.length > 0 && !loading && (
                        <div className="mt-16 text-center pb-12">
                            <button 
                                onClick={() => fetchProducts(false)} 
                                className="bg-white border-2 border-black text-black px-16 py-4 rounded-full font-black hover:bg-black hover:text-white transition-all transform active:scale-90 shadow-xl"
                            >
                                KHÁM PHÁ THÊM TV
                            </button>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default TVAVPage;