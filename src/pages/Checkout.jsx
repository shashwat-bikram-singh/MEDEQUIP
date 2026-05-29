import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, ArrowLeft, CreditCard, Loader2 } from 'lucide-react';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-slate-700 mb-2">No items to checkout</h2>
        <p className="text-slate-400 text-sm mb-6">Your cart is empty.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  const shipping = total >= 999 ? 0 : 99;
  const gst = Math.round(total * 0.05);
  const finalTotal = total + gst + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate order placement
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Cart
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 mb-8">Secure Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs flex items-center justify-center font-bold">1</span>
              Shipping Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Dr. John Doe"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="john@hospital.com"
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Street Address</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">City</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    placeholder="Gurugram"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">State</label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={e => setForm({ ...form, state: e.target.value })}
                    placeholder="Haryana"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">ZIP / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={form.zip}
                    onChange={e => setForm({ ...form, zip: e.target.value })}
                    placeholder="122015"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs flex items-center justify-center font-bold">2</span>
              Payment Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Card Number</label>
                <div className="relative">
                  <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={form.cardNumber}
                    onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                    placeholder="4111 2222 3333 4444"
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={form.expiry}
                    onChange={e => setForm({ ...form, expiry: e.target.value })}
                    placeholder="MM / YY"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">CVC / CVV</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={form.cvc}
                    onChange={e => setForm({ ...form, cvc: e.target.value })}
                    placeholder="•••"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div>
          <div className="card p-6 sticky top-24 space-y-5">
            <h3 className="font-bold text-slate-800 text-lg">Review Order</h3>

            {/* Item list */}
            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="py-2.5 flex justify-between gap-3 text-sm">
                  <span className="text-slate-600 line-clamp-1">{item.name} <span className="text-slate-400 font-semibold">x{item.qty}</span></span>
                  <span className="font-bold text-slate-800 flex-shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span><span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5%)</span><span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-800 text-base">
                <span>Total</span><span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-base rounded-2xl justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin animate-infinite" size={18} /> Processing Order...
                </>
              ) : (
                `Pay ₹${finalTotal.toLocaleString()}`
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium pt-2">
              <ShieldCheck size={14} className="text-green-600" />
              256-bit SSL Secure Checkout
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
