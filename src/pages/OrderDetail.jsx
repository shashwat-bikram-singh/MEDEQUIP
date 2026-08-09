import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import api from '../api/client';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/orders/${id}`);
      setOrder(res.data?.data || res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load order details. The order might not exist.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center"><CheckCircle className="w-4 h-4 mr-1.5" /> Delivered</span>;
      case 'CANCELLED':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 flex items-center"><XCircle className="w-4 h-4 mr-1.5" /> Cancelled</span>;
      case 'SHIPPED':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 flex items-center"><Package className="w-4 h-4 mr-1.5" /> Shipped</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {status || 'Pending'}</span>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/orders" className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Orders
          </Link>
        </div>
        <div className="bg-red-50 text-red-600 p-6 rounded-lg flex items-center justify-center flex-col text-center">
          <AlertCircle className="w-12 h-12 mb-3 text-red-500" />
          <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
          <p>{error || 'The requested order could not be found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link to="/orders" className="text-blue-600 hover:text-blue-800 flex items-center font-medium transition-colors w-fit">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Orders
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-500 mt-1">Placed on {new Date(order.createdAt || order.orderDate).toLocaleString()}</p>
        </div>
        <div>
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center text-gray-800">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" /> Shipping Address
          </h3>
          {order.shippingAddress ? (
            <address className="not-italic text-gray-600 space-y-1">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </address>
          ) : (
            <p className="text-gray-500 italic">No shipping address provided</p>
          )}
        </div>

        <div className="card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center text-gray-800">
            <CreditCard className="w-5 h-5 mr-2 text-blue-500" /> Payment Information
          </h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium text-gray-800">Method:</span> {order.paymentMethod || 'N/A'}</p>
            <p><span className="font-medium text-gray-800">Status:</span> 
              <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${
                order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.paymentStatus || 'PENDING'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-lg text-gray-800">Order Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-center">Quantity</th>
                <th className="px-6 py-4 font-medium text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.orderItems?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{item.product?.name || item.productName || 'Unknown Product'}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">${(item.price || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{item.quantity}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-800">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </td>
                </tr>
              ))}
              {(!order.orderItems || order.orderItems.length === 0) && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No items found in this order
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 p-6 flex justify-end">
          <div className="w-full md:w-1/3 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${(order.totalAmount || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800">Total</span>
              <span className="font-bold text-2xl text-blue-600">${(order.totalAmount || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
