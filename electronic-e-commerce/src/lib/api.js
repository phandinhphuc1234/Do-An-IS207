import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

// Tạo axios instance với config mặc định
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - thêm access token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Thêm refresh token vào header
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      config.headers["refresh-token"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - xử lý refresh token
api.interceptors.response.use(
  (response) => {
    // Nếu response có access_token mới (từ refresh), lưu lại
    if (response.data?.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          // Gửi request với refresh token để lấy access token mới
          const response = await axios.post(
            `${API_BASE_URL}/login`,
            {},
            {
              headers: {
                "refresh-token": refreshToken,
              },
            }
          );

          if (response.data?.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // Refresh token cũng hết hạn, logout user
          logout();
          return Promise.reject(refreshError);
        }
      } else {
        // Không có refresh token, logout
        logout();
      }
    }

    return Promise.reject(error);
  }
);

// Hàm logout - xóa tokens và redirect
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// Hàm kiểm tra đã đăng nhập chưa
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

// Hàm lấy user info từ localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const ProductService = {
  // Gọi hàm getRecommendedProducts
  getRecommended: (limit = 10) => 
    api.get(`/products/recommended`, { params: { limit } }),

  // Gọi hàm getProductDetails
  getDetails: (id) => 
    api.get(`/product/${id}`),

  // Gọi hàm searchMobile (slug là 'galaxy-s24', 'galaxy-z',...)
  searchMobile: (slug, filters = {}) => 
    api.get(`/mobile/${slug}`, { params: filters }),

  // Gọi hàm searchTVAV
  searchTV: (slug, filters = {}) => 
    api.get(`/tv-av/${slug}`, { params: filters }),

  // Gọi hàm searchAll (Dùng cho thanh tìm kiếm chung)
  searchAll: (params) => 
    api.get(`/products/search`, { params })
};

export default api;
