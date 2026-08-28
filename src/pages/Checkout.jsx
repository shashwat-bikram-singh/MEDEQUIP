import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowLeft, CreditCard, Loader2, AlertTriangle, CheckCircle2, Lock, Plus, MapPin } from 'lucide-react';
import { formatMoney } from '../utils/currency';
import api from '../api/client';
import toast from 'react-hot-toast';
import QRPaymentSection from '../components/common/QRPaymentSection';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // QR Payment verification state
  const [paymentCurrency, setPaymentCurrency] = useState('NPR');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // Addresses
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: '', city: '', state: '', zipCode: '', country: 'Nepal', isDefault: false
  });

  const [orderError, setOrderError] = useState('');

  // Calculate order totals
  const shipping = total >= 999 ? 0 : 99;
  const gst = Math.round(total * 0.05);
  const finalTotal = total + gst + shipping;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please login to proceed with checkout');
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Fetch saved addresses
  useEffect(() => {
    if (!isLoggedIn) return;
    setLoadingAddresses(true);
    api.get('/api/users/me/addresses')
      .then(res => {
        const addrs = res.data || [];
        setAddresses(addrs);
        const defaultAddr = addrs.find(a => a.isDefault || a.default);
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
        else if (addrs.length > 0) setSelectedAddressId(addrs[0].id);
      })
      .catch(err => console.error('Failed to fetch addresses:', err))
      .finally(() => setLoadingAddresses(false));
  }, [isLoggedIn]);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-slate-700 mb-2">No items to checkout</h2>
        <p className="text-slate-400 text-sm mb-6">Your cart is empty.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/users/me/addresses', addressForm);
      const newAddr = res.data;
      setAddresses(prev => [...prev, newAddr]);
      setSelectedAddressId(newAddr.id);
      setShowAddressForm(false);
      setAddressForm({ street: '', city: '', state: '', zipCode: '', country: 'Nepal', isDefault: false });
      toast.success('Address added successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOrderError('');

    if (!selectedAddressId) {
      setOrderError('Please select or add a delivery address');
      return;
    }

    if (paymentMethod === 'qr') {
      if (paymentCurrency !== 'NPR' || Number(paymentAmount) !== Number(finalTotal) || transactionId.trim().length < 6) {
        setOrderError('Please complete the QR payment transaction details (matching amount and valid Transaction ID)');
        return;
      }
    }

    setLoading(true);
    try {
      const response = await api.post('/api/orders/checkout', {
        addressId: selectedAddressId,
        paymentMethod: paymentMethod,
      });

      const order = response.data;

      // Clear the cart after successful order
      await clearCart();

      // Navigate to order success with real order data
      navigate('/order-success', {
        state: {
          orderId: order.id,
          totalAmount: order.totalAmount,
          status: order.status,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          orderDate: order.orderDate,
          itemCount: order.orderItems?.length || items.length,
        }
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to place order. Please try again.';
      setOrderError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-6 transition-colors font-medium">
        <ArrowLeft size={16} /> Back to Shopping Cart
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Secure Checkout</h1>
          <p className="text-slate-500 text-sm mt-1">
            Logged in as <span className="font-bold text-primary-600">{user?.email}</span>
          </p>
        </div>
        <div className="mt-3 md:mt-0 flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-xl border border-green-200 text-xs font-semibold">
          <ShieldCheck size={16} /> Server-Verified Order Processing
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Delivery Address */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs flex items-center justify-center font-bold">1</span>
              Delivery Address
            </h3>

            {loadingAddresses ? (
              <div className="flex items-center gap-2 text-slate-500 py-4">
                <Loader2 size={16} className="animate-spin" /> Loading addresses...
              </div>
            ) : addresses.length === 0 && !showAddressForm ? (
              <div className="text-center py-6">
                <MapPin size={32} className="text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 text-sm mb-3">No saved addresses. Add one to continue.</p>
                <button type="button" onClick={() => setShowAddressForm(true)} className="btn-primary text-sm">
                  <Plus size={14} /> Add Address
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map(addr => (
                  <label
                    key={addr.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAddressId === addr.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="mt-1 accent-primary-600"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {addr.street}
                        {(addr.isDefault || addr.default) && (
                          <span className="ml-2 badge bg-primary-100 text-primary-700 text-xs">Default</span>
                        )}
                      </p>
                      <p className="text-sm text-slate-500">{addr.city}, {addr.state} {addr.zipCode}</p>
                      <p className="text-sm text-slate-400">{addr.country}</p>
                    </div>
                  </label>
                ))}

                {!showAddressForm && (
                  <button type="button" onClick={() => setShowAddressForm(true)} className="text-sm text-primary-600 font-semibold flex items-center gap-1 hover:underline">
                    <Plus size={14} /> Add New Address
                  </button>
                )}
              </div>
            )}

            {/* Add Address Form */}
            {showAddressForm && (
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-700">New Address</h4>
                <input
                  type="text" placeholder="Street Address"
                  value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="input-field" required
                />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" value={addressForm.city}
                    onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} className="input-field" required />
                  <input type="text" placeholder="State/Province" value={addressForm.state}
                    onChange={e => setAddressForm({ ...addressForm, state: e.target.value })} className="input-field" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Zip/Postal Code" value={addressForm.zipCode}
                    onChange={e => setAddressForm({ ...addressForm, zipCode: e.target.value })} className="input-field" required />
                  <input type="text" placeholder="Country" value={addressForm.country}
                    onChange={e => setAddressForm({ ...addressForm, country: e.target.value })} className="input-field" required />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={handleAddAddress} className="btn-primary text-sm">Save Address</button>
                  <button type="button" onClick={() => setShowAddressForm(false)} className="btn-outline text-sm">Cancel</button>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Payment Method */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs flex items-center justify-center font-bold">2</span>
              Payment Method
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: 'cod', label: 'Cash on Delivery', icon: '💵' },
                { key: 'qr', label: 'Scan & Pay QR', icon: '📷' },
                { key: 'esewa', label: 'eSewa', icon: '📱' },
                { key: 'khalti', label: 'Khalti', icon: '📱' },
              ].map(method => (
                <button
                  key={method.key}
                  type="button"
                  onClick={() => setPaymentMethod(method.key)}
                  className={`py-3 px-3 rounded-xl border font-semibold text-xs flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === method.key
                      ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{method.icon}</span>
                  {method.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'qr' && (
              <div className="mt-5">
                <QRPaymentSection
                  requiredAmount={finalTotal}
                  requiredCurrency="NPR"
                  paymentCurrency={paymentCurrency}
                  setPaymentCurrency={setPaymentCurrency}
                  paymentAmount={paymentAmount}
                  setPaymentAmount={setPaymentAmount}
                  transactionId={transactionId}
                  setTransactionId={setTransactionId}
                />
              </div>
            )}

            {paymentMethod !== 'cod' && paymentMethod !== 'qr' && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs flex items-start gap-2">
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Note:</strong> {paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} integration is pending. Your order will be placed with payment status "PENDING". You will be contacted for payment confirmation.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="card p-6 sticky top-24 space-y-5 shadow-lg">
            <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-3">Order Summary</h3>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="py-2.5 flex justify-between gap-3 text-sm">
                  <span className="text-slate-600 line-clamp-1">{item.name} <span className="text-slate-400 font-semibold">x{item.qty}</span></span>
                  <span className="font-bold text-slate-800 flex-shrink-0">
                    {formatMoney(item.price * item.qty, 'NPR')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span><span>{formatMoney(total, 'NPR')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5%)</span><span>{formatMoney(gst, 'NPR')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'FREE' : formatMoney(shipping, 'NPR')}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between font-extrabold text-slate-900 text-base">
                <span>Total</span>
                <span className="text-primary-600">{formatMoney(finalTotal, 'NPR')}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-xs flex items-start gap-2">
              <ShieldCheck size={16} className="flex-shrink-0 mt-0.5" />
              <span>Prices are validated server-side. The backend calculates the final amount from your cart, ignoring any frontend totals.</span>
            </div>

            {orderError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{orderError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedAddressId}
              className={`w-full py-3.5 text-base font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md ${
                selectedAddressId
                  ? 'bg-primary-600 hover:bg-primary-700 text-white cursor-pointer active:scale-98'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={18} /> Placing Order...</>
              ) : selectedAddressId ? (
                <><CheckCircle2 size={18} /> Place Order</>
              ) : (
                <><Lock size={16} /> Select Address First</>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium pt-1">
              <ShieldCheck size={14} className="text-green-600" />
              Secure Server-Side Order Processing
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
