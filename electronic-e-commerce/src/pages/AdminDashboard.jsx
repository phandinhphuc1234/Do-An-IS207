import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Package, CheckCircle, Clock, XCircle, DollarSign, Users, ShoppingBag, Eye, CreditCard } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";

const ADMIN_EMAIL = "remembermyname2k5@gmail.com";

// Status Badge
const StatusBadge = ({ status, type = "order" }) => {
  const getStyle = () => {
    if (type === "payment") {
      switch (status?.toLowerCase()) {
        case "paid": return { bg: "#dcfce7", color: "#166534" };
        case "pending": return { bg: "#fef3c7", color: "#92400e" };
        default: return { bg: "#f3f4f6", color: "#374151" };
      }
    }
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered": return { bg: "#dcfce7", color: "#166534" };
      case "processing":
      case "shipping": return { bg: "#dbeafe", color: "#1e40af" };
      case "pending": return { bg: "#fef3c7", color: "#92400e" };
      case "cancelled": return { bg: "#fee2e2", color: "#991b1b" };
      default: return { bg: "#f3f4f6", color: "#374151" };
    }
  };
  const style = getStyle();
  return (
    <span
      className="px-2 py-1 rounded text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {status?.toUpperCase() || "N/A"}
    </span>
  );
};

// Order Detail Modal
const OrderDetailModal = ({ order, items, onClose, onVerifyPayment, isVerifying }) => {
  if (!order) return null;

  const createdAt = order.created_at ? new Date(order.created_at).toLocaleString() : "N/A";
  const canVerify = order.payment_status?.toLowerCase() === "pending";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Order #{order.order_id}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{order.user?.full_name || order.user?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{order.user?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{createdAt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex gap-2 mt-1">
                <StatusBadge status={order.status} type="order" />
                <StatusBadge status={order.payment_status} type="payment" />
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold mb-3">Items ({items?.length || 0})</h3>
            <div className="space-y-2">
              {items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ${parseFloat(item.unit_price).toFixed(2)}</p>
                  </div>
                  <p className="font-medium">${parseFloat(item.total_price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>${parseFloat(order.subtotal || 0).toFixed(2)}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-sm mb-2" style={{ color: "#10b981" }}>
                <span>Discount</span>
                <span>-${parseFloat(order.discount_amount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm mb-2">
              <span>Shipping</span>
              <span>${parseFloat(order.shipping_fee || 10).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${parseFloat(order.total_amount).toFixed(2)}</span>
            </div>
          </div>

          {/* Verify Payment Button */}
          {canVerify && (
            <button
              onClick={() => onVerifyPayment(order.order_id)}
              disabled={isVerifying}
              className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              style={{ backgroundColor: "#10b981", color: "white" }}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle style={{ width: "20px", height: "20px" }} />
                  Verify Payment & Award Points
                </>
              )}
            </button>
          )}

          {order.payment_status?.toLowerCase() === "paid" && (
            <div className="text-center py-3 rounded-lg" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>
              <CheckCircle style={{ width: "20px", height: "20px", display: "inline", marginRight: "8px" }} />
              Payment Verified
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState("all");
  
  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Check admin and fetch orders
  useEffect(() => {
    const checkAdminAndFetch = async () => {
      const accessToken = localStorage.getItem("access_token");
      const storedUser = localStorage.getItem("user");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          if (userData.email !== ADMIN_EMAIL) {
            setIsAdmin(false);
            setIsLoading(false);
            return;
          }
          setIsAdmin(true);
        } catch (e) {
          console.error("Error parsing user", e);
        }
      }

      try {
        const response = await api.get("/auth/admin/orders");
        if (response.data.success) {
          setOrders(response.data.orders || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 403) {
          setIsAdmin(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAndFetch();
  }, [navigate]);

  // View order detail
  const handleViewOrder = async (orderId) => {
    setIsLoadingDetail(true);
    try {
      const response = await api.get(`/auth/admin/order/${orderId}`);
      if (response.data.success) {
        setSelectedOrder(response.data.order);
        setSelectedItems(response.data.items || []);
      }
    } catch (error) {
      alert("Failed to load order details");
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Verify payment
  const handleVerifyPayment = async (orderId) => {
    setIsVerifying(true);
    try {
      const response = await api.get(`/auth/verify-payment?order_id=${orderId}`);
      if (response.data.success) {
        alert(`Payment verified!\nUser: ${response.data.user_email}\nPoints awarded: ${response.data.received_points}`);
        
        // Update orders list
        setOrders(prev => prev.map(o => 
          o.order_id === orderId 
            ? { ...o, payment_status: "paid", status: "processing" }
            : o
        ));
        
        // Update modal
        setSelectedOrder(prev => prev ? { ...prev, payment_status: "paid", status: "processing" } : null);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to verify payment");
    } finally {
      setIsVerifying(false);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    if (filter === "pending") return order.payment_status?.toLowerCase() === "pending";
    if (filter === "paid") return order.payment_status?.toLowerCase() === "paid";
    return true;
  });

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.payment_status?.toLowerCase() === "pending").length,
    paid: orders.filter(o => o.payment_status?.toLowerCase() === "paid").length,
    revenue: orders.filter(o => o.payment_status?.toLowerCase() === "paid")
      .reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0),
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen w-screen bg-gray-100">
        <Navbar isTransparent={false} />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen w-screen bg-gray-100">
        <Navbar isTransparent={false} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100">
      <Navbar isTransparent={false} />

      <main className="flex-grow w-full mt-16 pb-20">
        {/* Header */}
        <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage orders and verify payments</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShoppingBag style={{ width: "20px", height: "20px", color: "#3b82f6" }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Clock style={{ width: "20px", height: "20px", color: "#f59e0b" }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle style={{ width: "20px", height: "20px", color: "#10b981" }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.paid}</p>
                  <p className="text-sm text-gray-500">Paid</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <DollarSign style={{ width: "20px", height: "20px", color: "#8b5cf6" }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">${stats.revenue.toFixed(0)}</p>
                  <p className="text-sm text-gray-500">Revenue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-4">
            {["all", "pending", "paid"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === f
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {f === "all" ? "All Orders" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order.order_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">#{order.order_id}</td>
                    <td className="px-4 py-3 text-sm">{order.user?.email || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-4 py-3 font-medium">${parseFloat(order.total_amount || 0).toFixed(2)}</td>
                    <td className="px-4 py-3"><StatusBadge status={order.status} type="order" /></td>
                    <td className="px-4 py-3"><StatusBadge status={order.payment_status} type="payment" /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewOrder(order.order_id)}
                          className="p-2 rounded hover:bg-gray-100"
                          title="View Details"
                        >
                          <Eye style={{ width: "18px", height: "18px", color: "#6b7280" }} />
                        </button>
                        {order.payment_status?.toLowerCase() === "pending" && (
                          <button
                            onClick={() => handleVerifyPayment(order.order_id)}
                            className="p-2 rounded hover:bg-green-100"
                            title="Verify Payment"
                          >
                            <CreditCard style={{ width: "18px", height: "18px", color: "#10b981" }} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          items={selectedItems}
          onClose={() => setSelectedOrder(null)}
          onVerifyPayment={handleVerifyPayment}
          isVerifying={isVerifying}
        />
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;
