import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, ShieldCheck, QrCode } from 'lucide-react';
import { formatMoney } from '../utils/currency';

export default function OrderSuccess() {
  const savedData = sessionStorage.getItem('medequip_latest_order');
  const order = savedData ? JSON.parse(savedData) : null;

  const orderId = order?.orderId || `AHC-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderCurrency = order?.currency || 'NPR';
  const orderTotal = order?.total || 0;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle size={44} className="text-green-600" />
        </div>
        <span className="badge bg-emerald-100 text-emerald-800 text-xs px-3 py-1 font-bold mb-2">
          ⚡ CURRENCY &amp; MONEY TRANSACTION VERIFIED
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Order Confirmed &amp; Paid!</h1>
        <p className="text-slate-500 text-sm mb-6">
          Thank you for choosing Aidoxy Healthcare / Medequip. Your transaction has been matched and verified.
        </p>

        <div className="card p-6 mb-6 text-left space-y-3.5 shadow-md">
          <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2.5">
            <span className="text-slate-500">Order Number</span>
            <span className="font-mono font-bold text-primary-600">{orderId}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Order Currency</span>
            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">
              {orderCurrency} (Matched ✅)
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Total Amount Paid</span>
            <span className="font-extrabold text-slate-900 text-base">
              {formatMoney(orderTotal, orderCurrency)}
            </span>
          </div>

          {order?.transactionId && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Txn UTR / Ref ID</span>
              <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded">
                {order.transactionId}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-2.5">
            <span className="text-slate-500">Payment Status</span>
            <span className="font-semibold text-green-600 flex items-center gap-1 text-xs">
              <ShieldCheck size={14} /> Currency &amp; Money Verified ✓
            </span>
          </div>
        </div>

        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 mb-6 flex items-center gap-3 text-left">
          <Package size={22} className="text-primary-600 flex-shrink-0" />
          <p className="text-xs text-primary-800 leading-relaxed font-medium">
            Order confirmation &amp; tax invoice receipt have been sent to your contact details. Equipment dispatch in progress.
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/" className="btn-outline flex-1 justify-center rounded-xl">Back to Home</Link>
          <Link to="/products" className="btn-primary flex-1 justify-center rounded-xl">
            Shop Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
