import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { Activity, Edit2, X, CheckCircle, Clock, Truck, PackageCheck, Ban } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statuses = [
    { value: 'PENDING', label: 'Pending', icon: <Clock size={16} /> },
    { value: 'PROCESSING', label: 'Processing', icon: <Activity size={16} /> },
    { value: 'SHIPPED', label: 'Shipped', icon: <Truck size={16} /> },
    { value: 'DELIVERED', label: 'Delivered', icon: <PackageCheck size={16} /> },
    { value: 'CANCELLED', label: 'Cancelled', icon: <Ban size={16} /> }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/orders/admin/all');
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setStatusModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;
    
    setIsSubmitting(true);
    try {
      await api.put(`/api/orders/${selectedOrder.id}/status`, { status: newStatus });
      toast.success('Order status updated');
      setStatusModalOpen(false);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update status');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING': return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full">Pending</span>;
      case 'PROCESSING': return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">Processing</span>;
      case 'SHIPPED': return <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">Shipped</span>;
      case 'DELIVERED': return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">Delivered</span>;
      case 'CANCELLED': return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full">Cancelled</span>;
      default: return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{status}</span>;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Activity className="animate-spin text-blue-600" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage customer orders and fulfillments</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4">
                      {order.user?.firstName} {order.user?.lastName}
                      <div className="text-xs text-gray-400">{order.user?.email}</div>
                    </td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium">${order.totalAmount?.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        order.paymentStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.orderStatus)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => openStatusModal(order)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1 justify-end w-full"
                      >
                        <Edit2 size={16} />
                        <span className="text-xs">Update Status</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {statusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                Update Order #{selectedOrder?.id}
              </h3>
              <button onClick={() => setStatusModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Order Status</label>
              <div className="space-y-3">
                {statuses.map((status) => (
                  <label key={status.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    newStatus === status.value ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}>
                    <input 
                      type="radio" 
                      name="status" 
                      value={status.value}
                      checked={newStatus === status.value}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div className={`ml-3 flex items-center gap-2 ${newStatus === status.value ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                      {status.icon}
                      {status.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={() => setStatusModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting || newStatus === selectedOrder?.orderStatus}
              >
                {isSubmitting ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
