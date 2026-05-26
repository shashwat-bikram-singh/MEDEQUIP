import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  const orderId = `MEQ-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-slate-500 mb-6">Thank you for your purchase. Your medical supplies are being processed.</p>

        <div className="card p-5 mb-6 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Order ID</span>
            <span className="font-semibold text-slate-800">{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Expected Delivery</span>
            <span className="font-semibold text-green-600">2–4 Business Days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Payment</span>
            <span className="font-semibold text-slate-800">Confirmed ✓</span>
          </div>
        </div>

        <div className="bg-primary-50 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <Package size={20} className="text-primary-600 flex-shrink-0" />
          <p className="text-sm text-primary-700">A confirmation email has been sent to your registered email address.</p>
        </div>

        <div className="flex gap-3">
          <Link to="/" className="btn-outline flex-1 justify-center">Back to Home</Link>
          <Link to="/products" className="btn-primary flex-1 justify-center">
            Shop More <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
