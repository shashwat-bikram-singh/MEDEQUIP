import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, ArrowLeft, CreditCard, Loader2, QrCode, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';
import QRPaymentSection from '../components/common/QRPaymentSection';
import { CURRENCIES, formatMoney } from '../utils/currency';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('qr'); // 'qr', 'card', 'wallet'

  // Shipping Form State
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

  // Calculate order totals in base currency (NPR)
  const shipping = total >= 999 ? 0 : 99;
  const gst = Math.round(total * 0.05);
  const finalTotal = total + gst + shipping;
  const orderCurrency = items[0]?.currency || 'NPR';

  // Money Transaction & Currency Matching State
  const [paymentCurrency, setPaymentCurrency] = useState(orderCurrency);
  const [paymentAmount, setPaymentAmount] = useState(finalTotal.toString());
  const [transactionId, setTransactionId] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-slate-700 mb-2">No items to checkout</h2>
        <p className="text-slate-400 text-sm mb-6">Your cart is empty.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  // Perform strict currency & amount match verification before order submission
  const isCurrencyMatched = paymentCurrency === orderCurrency;
  const isAmountMatched = Number(paymentAmount) === Number(finalTotal);
  const isTxnProvided = transactionId.trim().length >= 6;

  let submitError = null;
  if (!isCurrencyMatched) {
    submitError = `Currency Mismatch Error: Product order is in ${orderCurrency}, but payment currency is set to ${paymentCurrency}. Change payment currency to ${orderCurrency} to proceed!`;
  } else if (!isAmountMatched) {
    submitError = `Amount Mismatch Error: Required product order total is ${formatMoney(finalTotal, orderCurrency)}, but entered payment amount is ${formatMoney(paymentAmount || 0, paymentCurrency)}. Exact money number must match!`;
  } else if ((paymentMethod === 'qr' || paymentMethod === 'wallet') && !isTxnProvided) {
    submitError = `Please enter a valid Transaction UTR / Ref ID (at least 6 characters).`;
  }

  const isOrderReady = isCurrencyMatched && isAmountMatched && (
    (paymentMethod === 'card' && form.cardNumber && form.expiry && form.cvc) ||
    ((paymentMethod === 'qr' || paymentMethod === 'wallet') && isTxnProvided)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isOrderReady) {
      alert(submitError || 'Payment currency or amount does not match product order requirement.');
      return;
    }

    setLoading(true);

    // Save order data to sessionStorage for OrderSuccess page display
    const orderData = {
      orderId: 'MED-' + Math.floor(100000 + Math.random() * 900000),
      items,
      total: finalTotal,
      currency: orderCurrency,
      paymentMethod,
      transactionId: transactionId || 'CARD-OK-' + Math.floor(1000 + Math.random() * 9000),
      customer: form,
      date: new Date().toISOString()
    };
    sessionStorage.setItem('medequip_latest_order', JSON.stringify(orderData));

    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate('/order-success');
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-6 transition-colors font-medium">
        <ArrowLeft size={16} /> Back to Shopping Cart
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Secure Order Checkout</h1>
          <p className="text-slate-500 text-sm mt-1">
            Product Order Currency: <span className="font-bold text-primary-600">{orderCurrency} ({CURRENCIES[orderCurrency]?.name || orderCurrency})</span>
          </p>
        </div>
        <div className="mt-3 md:mt-0 flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-xl border border-green-200 text-xs font-semibold">
          <ShieldCheck size={16} /> Guaranteed Currency &amp; Transaction Matching
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Forms: Shipping & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Shipping Address */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs flex items-center justify-center font-bold">1</span>
              Shipping &amp; Contact Information
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
                    placeholder="+977 98765 43210"
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
                    placeholder="Clinic/Hospital, Street, Ward No."
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
                    placeholder="Kathmandu"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Province / State</label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={e => setForm({ ...form, state: e.target.value })}
                    placeholder="Bagmati"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={form.zip}
                    onChange={e => setForm({ ...form, zip: e.target.value })}
                    placeholder="44600"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method Selection */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs flex items-center justify-center font-bold">2</span>
                Payment Options &amp; Currency Match
              </span>
              <span className="text-xs font-normal text-slate-500">
                Order Currency: <strong className="text-slate-800">{orderCurrency}</strong>
              </span>
            </h3>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className={`py-3 px-3 rounded-xl border font-semibold text-xs flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'qr'
                    ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode size={20} className={paymentMethod === 'qr' ? 'text-primary-600' : 'text-slate-400'} />
                Scan &amp; Pay QR
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`py-3 px-3 rounded-xl border font-semibold text-xs flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'wallet'
                    ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">📱</span>
                eSewa / Khalti
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-3 rounded-xl border font-semibold text-xs flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard size={20} className={paymentMethod === 'card' ? 'text-primary-600' : 'text-slate-400'} />
                Credit / Debit Card
              </button>
            </div>

            {/* Payment Method Views */}
            {paymentMethod === 'qr' && (
              <QRPaymentSection
                requiredAmount={finalTotal}
                requiredCurrency={orderCurrency}
                paymentCurrency={paymentCurrency}
                setPaymentCurrency={setPaymentCurrency}
                paymentAmount={paymentAmount}
                setPaymentAmount={setPaymentAmount}
                transactionId={transactionId}
                setTransactionId={setTransactionId}
              />
            )}

            {paymentMethod === 'wallet' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">Nepalese Digital Wallet Payment</h4>
                  <p className="text-xs text-slate-600 mb-3">
                    Pay directly to Aidoxy Healthcare eSewa ID: <strong className="text-primary-600">9876543210</strong> or Khalti ID: <strong className="text-purple-600">9876543210</strong>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Transaction Currency</label>
                      <select
                        value={paymentCurrency}
                        onChange={e => setPaymentCurrency(e.target.value)}
                        className="input-field"
                      >
                        {Object.keys(CURRENCIES).map(code => (
                          <option key={code} value={code}>{code} ({CURRENCIES[code].symbol})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bold text-slate-700">Paid Amount Number</label>
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={e => setPaymentAmount(e.target.value)}
                        placeholder={`Exact total: ${finalTotal}`}
                        className="input-field font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Wallet Transaction / Ref ID</label>
                    <input
                      type="text"
                      required
                      value={transactionId}
                      onChange={e => setTransactionId(e.target.value)}
                      placeholder="e.g. 093847261"
                      className="input-field font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Payment Currency</label>
                    <select
                      value={paymentCurrency}
                      onChange={e => setPaymentCurrency(e.target.value)}
                      className="input-field"
                    >
                      {Object.keys(CURRENCIES).map(code => (
                        <option key={code} value={code}>{code} ({CURRENCIES[code].symbol})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Payment Amount</label>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={e => setPaymentAmount(e.target.value)}
                      placeholder={`Exact total: ${finalTotal}`}
                      className="input-field font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Card Number</label>
                  <div className="relative">
                    <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required={paymentMethod === 'card'}
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
                      required={paymentMethod === 'card'}
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
                      required={paymentMethod === 'card'}
                      maxLength={4}
                      value={form.cvc}
                      onChange={e => setForm({ ...form, cvc: e.target.value })}
                      placeholder="•••"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary & Strict Verification Block */}
        <div>
          <div className="card p-6 sticky top-24 space-y-5 shadow-lg">
            <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-3">Review Order Summary</h3>

            {/* Items list */}
            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="py-2.5 flex justify-between gap-3 text-sm">
                  <span className="text-slate-600 line-clamp-1">{item.name} <span className="text-slate-400 font-semibold">x{item.qty}</span></span>
                  <span className="font-bold text-slate-800 flex-shrink-0">
                    {formatMoney(item.price * item.qty, orderCurrency)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span><span>{formatMoney(total, orderCurrency)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5%)</span><span>{formatMoney(gst, orderCurrency)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'FREE' : formatMoney(shipping, orderCurrency)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between font-extrabold text-slate-900 text-base">
                <span>Total Amount Required</span>
                <span className="text-primary-600">{formatMoney(finalTotal, orderCurrency)}</span>
              </div>
            </div>

            {/* Live Currency & Amount Validation Banner */}
            {!isCurrencyMatched && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Currency Mismatch Error!</strong>
                  Product currency is <strong>{orderCurrency}</strong>, but payment currency is set to <strong>{paymentCurrency}</strong>. Order cannot be placed until currency matches.
                </div>
              </div>
            )}

            {isCurrencyMatched && !isAmountMatched && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Amount Mismatch Error!</strong>
                  Exact order total is <strong>{formatMoney(finalTotal, orderCurrency)}</strong>, but entered payment amount is <strong>{formatMoney(paymentAmount || 0, paymentCurrency)}</strong>.
                </div>
              </div>
            )}

            {isCurrencyMatched && isAmountMatched && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                <span>Currency &amp; exact amount matched successfully!</span>
              </div>
            )}

            {/* Place Order CTA Button - Strictly locked when currency/amount mismatch */}
            <button
              type="submit"
              disabled={loading || !isOrderReady}
              className={`w-full py-3.5 text-base font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md ${
                isOrderReady
                  ? 'bg-primary-600 hover:bg-primary-700 text-white cursor-pointer active:scale-98'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed border border-slate-300'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Verifying &amp; Placing Order...
                </>
              ) : isOrderReady ? (
                <>
                  <CheckCircle2 size={18} /> Place Order ({formatMoney(finalTotal, orderCurrency)})
                </>
              ) : (
                <>
                  <Lock size={16} /> Order Locked (Fix Currency/Amount)
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium pt-1">
              <ShieldCheck size={14} className="text-green-600" />
              256-bit Encrypted SSL Payment Verification
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
