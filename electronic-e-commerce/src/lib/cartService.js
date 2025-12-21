import api from "./api";

// Lấy giỏ hàng
export const getCart = async () => {
  try {
    const response = await api.get("/auth/cart");
    return response.data;
  } catch (error) {
    // Cart empty returns 404
    if (error.response?.status === 404) {
      return { success: false, data: [], total_price: 0 };
    }
    // Other errors - return empty cart
    console.error("getCart error:", error);
    return { success: false, data: [], total_price: 0 };
  }
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (productId, variantId, quantity = 1) => {
  const response = await api.post("/auth/cart/additem", {
    product_id: productId,
    variant_id: variantId,
    quantity: quantity,
  });
  return response.data;
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (cartItemId) => {
  const response = await api.delete(`/auth/cart/cart-item/${cartItemId}`);
  return response.data;
};

// Cập nhật số lượng
export const updateCartQuantity = async (cartItemId, quantity) => {
  const response = await api.patch("/auth/cart/updatequantity", {
    cart_item_id: cartItemId,
    quantity: quantity,
  });
  return response.data;
};

// Xóa toàn bộ giỏ hàng
export const clearCart = async () => {
  const response = await api.get("/auth/cart/clear");
  return response.data;
};
