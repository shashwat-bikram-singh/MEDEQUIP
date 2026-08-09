import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, ShieldCheck, ClipboardList } from 'lucide-react';
import { formatMoney } from '../utils/currency';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state || {};

  const orderId = order.orderId || 'N/A';
  const orderTotal = order.totalAmount || 0;
  const orderStatus = order.status || 'PENDING';
  const paymentMethod = order.paymentMethod || 'cod';
  const paymentStatus = order.paymentStatus || 'PENDING';

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle size={44} className="text-green-600" />
        </div>
        <span className="badge bg-emerald-100 text-emerald-800 text-xs px-3 py-1 font-bold mb-2">
          ✅ ORDER PLACED SUCCESSFULLY
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Order Confirmed!</h1>
        <p className="text-slate-500 text-sm mb-6">
          Thank you for choosing Aidoxy Healthcare / Medequip. Your order has been processed by our server.
        </p>

        <div className="card p-6 mb-6 text-left space-y-3.5 shadow-md">
          <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2.5">
            <span className="text-slate-500">Order ID</span>
            <span className="font-mono font-bold text-primary-600">#{orderId}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Order Status</span>
            <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs uppercase">
              {orderStatus}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Payment Method</span>
            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs uppercase">
              {paymentMethod}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Payment Status</span>
            <span className={`font-semibold px-2 py-0.5 rounded text-xs uppercase ${
              paymentStatus === 'PAID' ? 'text-green-700 bg-green-50' : 'text-amber-600 bg-amber-50'
            }`}>
              {paymentStatus}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-2.5">
            <span className="text-slate-500">Total Amount</span>
            <span className="font-extrabold text-slate-900 text-base">
              {formatMoney(orderTotal, 'NPR')}
            </span>
          </div>
        </div>

        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 mb-6 flex items-center gap-3 text-left">
          <Package size={22} className="text-primary-600 flex-shrink-0" />
          <p className="text-xs text-primary-800 leading-relaxed font-medium">
            Your order has been saved to our system. You can track its status from your order history.
            {paymentMethod === 'cod' && ' Payment will be collected on delivery.'}
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/orders" className="btn-outline flex-1 justify-center rounded-xl flex items-center gap-2">
            <ClipboardList size={14} /> My Orders
          </Link>
          <Link to="/products" className="btn-primary flex-1 justify-center rounded-xl">
            Continue Shopping <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
