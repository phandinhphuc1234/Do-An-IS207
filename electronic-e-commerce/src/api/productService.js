import axios from 'axios';

const API_URL = "http://localhost:8000/api";

export const ProductService = {
  // Hàm lấy tất cả sản phẩm dùng searchAll (Giữ nguyên logic của bạn)
  searchAll: (params = {}) => {
    return api.get('/products/search', { 
      params: {
        limit: params.limit || 20,
        last_id: params.lastId || 0,
        sort: params.sort || 'desc',
        keyword: params.keyword || null,
        min_price: params.minPrice || null,
        max_price: params.maxPrice || null,
        child_slugs: params.categorySlugs || null 
      }
    });
  },
  getById: (id) => {
        return axios.get(`${API_URL}/products/${id}`);
    },
  getAllMobile: (filters) => {
        return axios.get(`${API_URL}/mobile`, { params: filters });
    },
    searchMobile: (slug, filters) => {
        return axios.get(`${API_URL}/mobile/type/${slug}`, { params: filters });
    },
  getAllMobile: (filters) => {
    return axios.get(`${API_URL}/products`, { 
        params: {
            series: filters.series,
            ram: filters.ram,
            storage: filters.storage,
            sort: filters.sort
        } 
    });
}
};