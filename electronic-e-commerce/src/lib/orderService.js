import api from "./api";

// Tạo đơn hàng mới
export const createOrder = async (orderData) => {
  const response = await api.post("/auth/create-order", orderData);
  return response.data;
};

// Lấy tất cả đơn hàng của user
export const getAllOrders = async () => {
  const response = await api.get("/auth/getallorder");
  return response.data;
};

// Lấy chi tiết đơn hàng
export const getOrderDetail = async (orderId) => {
  const response = await api.get(`/auth/order/${orderId}`);
  return response.data;
};

// Hủy đơn hàng
export const cancelOrder = async (orderId) => {
  const response = await api.get(`/auth/order/cancel/${orderId}`);
  return response.data;
};

// Kiểm tra mã giảm giá
export const checkPromoCode = async (code) => {
  const response = await api.get(`/auth/check-coupon?code=${code}`);
  return response.data;
};
