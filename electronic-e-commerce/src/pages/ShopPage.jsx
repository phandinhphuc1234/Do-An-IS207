import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();
    
    // Đảm bảo BASE_URL chính xác để nối vào link ảnh
    const BASE_URL = 'http://localhost:8000';

    const [filters, setFilters] = useState({
        keyword: '',
        min_price: '',
        max_price: '',
        sort: 'none',
        child_slugs: [],
        last_id: 0,
        limit: 12
    });

    const categoryList = [
        { name: 'Smartphone', slug: 'galaxy-smartphone' },
        { name: 'Tablet', slug: 'galaxy-tablet' },
        { name: 'Laptop', slug: 'galaxy-book-laptop' },
        { name: 'Premium TV', slug: 'premium-flagship-tvs' },
        { name: 'Crystal UHD', slug: 'crystal-uhd-tvs' }
    ];

    const fetchProducts = useCallback(async (isRefresh = true) => {
        setLoading(true);
        setErrorMsg(null);
        try {
            const currentLastId = isRefresh ? 0 : filters.last_id;
            const params = {
                ...filters,
                child_slugs: filters.child_slugs.length > 0 ? filters.child_slugs.join(',') : null,
                last_id: currentLastId
            };

            const response = await axios.get(`${BASE_URL}/api/products/search`, { params });
            
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
            setErrorMsg("Lỗi khi tải danh sách sản phẩm.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchProducts(true);
    }, []);

    const handleCategoryToggle = (slug) => {
        setFilters(prev => {
            const current = [...prev.child_slugs];
            const index = current.indexOf(slug);
            if (index > -1) current.splice(index, 1);
            else current.push(slug);
            return { ...prev, child_slugs: current };
        });
    };

    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, keyword: e.target.value }));
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Navbar isTransparent={false}/>

            <div className="bg-black text-white pt-24 pb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">SAMSUNG SHOP</h1>
                <p className="text-gray-400 max-w-2xl mx-auto px-4">
                    Khám phá toàn bộ hệ sinh thái Galaxy - Từ thiết bị di động mạnh mẽ đến trải nghiệm hình ảnh tuyệt đỉnh.
                </p>
            </div>

            <div className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-8">
                
                <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:self-start relative lg:top-19 z-20">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                            <span>🔍</span> Bộ lọc tìm kiếm
                        </h3>

                        <div className="mb-6">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Tìm tên sản phẩm</label>
                            <input 
                                type="text" 
                                placeholder="Ví dụ: Galaxy S24..."
                                value={filters.keyword}
                                onChange={handleSearchChange}
                                className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Danh mục</label>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                {categoryList.map(cat => (
                                    <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            className="w-5 h-5 rounded accent-black"
                                            checked={filters.child_slugs.includes(cat.slug)}
                                            onChange={() => handleCategoryToggle(cat.slug)}
                                        />
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-black">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Khoảng giá ($)</label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="number" placeholder="Min"
                                    value={filters.min_price}
                                    onChange={(e) => setFilters(prev => ({...prev, min_price: e.target.value}))}
                                    className="w-1/2 bg-gray-50 border-none rounded-xl p-3 text-sm"
                                />
                                <span className="text-gray-300">-</span>
                                <input 
                                    type="number" placeholder="Max"
                                    value={filters.max_price}
                                    onChange={(e) => setFilters(prev => ({...prev, max_price: e.target.value}))}
                                    className="w-1/2 bg-gray-50 border-none rounded-xl p-3 text-sm"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={() => fetchProducts(true)}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
                        >
                            Áp dụng bộ lọc
                        </button>
                    </div>
                </aside>

                <main className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <p className="text-gray-600 font-medium">
                            Hiển thị <span className="text-black font-bold">{products.length}</span> sản phẩm
                        </p>
                        <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                            <span className="text-xs font-bold text-gray-400 px-3 uppercase">Sắp xếp:</span>
                            {['none', 'asc', 'desc'].map(s => (
                                <button 
                                    key={s}
                                    onClick={() => setFilters(prev => ({...prev, sort: s}))}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filters.sort === s ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                                >
                                    {s === 'none' ? 'Mặc định' : s === 'asc' ? 'Giá thấp' : 'Giá cao'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {errorMsg && <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-center">{errorMsg}</div>}

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div 
                                    key={product.product_id} 
                                    onClick={() => navigate(`/product/${product.product_id}`)}
                                    className="cursor-pointer bg-white rounded-[32px] p-6 border border-gray-50 hover:shadow-2xl transition-all duration-500 group"
                                >
                                    <div className="aspect-square w-full mb-6 relative rounded-2xl bg-gray-50 p-6 overflow-hidden">
                                        <img 
                                            // FIX: Nối thêm BASE_URL vào đây để hiện ảnh
                                            src={`${BASE_URL}${product.image_url}`} 
                                            alt={product.product_name} 
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
                                        />
                                    </div>
                                    
                                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {product.product_name}
                                    </h3>

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
                            <div className="text-center py-40">
                                <div className="text-6xl mb-4">🛸</div>
                                <h3 className="text-xl font-bold text-gray-900">Không tìm thấy sản phẩm</h3>
                                <p className="text-gray-400 mt-2">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
                            </div>
                        )
                    )}

                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white h-[450px] rounded-[32px] p-6 border border-gray-100">
                                    <div className="bg-gray-200 w-full h-48 rounded-2xl mb-6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {hasMore && products.length > 0 && !loading && (
                        <div className="mt-16 text-center">
                            <button 
                                onClick={() => fetchProducts(false)} 
                                className="bg-black text-white px-12 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl active:scale-95"
                            >
                                HIỂN THỊ THÊM SẢN PHẨM
                            </button>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ShopPage;