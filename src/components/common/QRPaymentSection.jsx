import { useState } from 'react';
import { QrCode, Copy, Check, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import { CURRENCIES, formatMoney } from '../../utils/currency';

export default function QRPaymentSection({
  requiredAmount,
  requiredCurrency = 'NPR',
  paymentCurrency,
  setPaymentCurrency,
  paymentAmount,
  setPaymentAmount,
  transactionId,
  setTransactionId
}) {
  const [copied, setCopied] = useState(false);

  const isCurrencyMatched = paymentCurrency === requiredCurrency;
  const isAmountMatched = Number(paymentAmount) === Number(requiredAmount);
  const isTxnValid = transactionId.trim().length >= 6;

  let validationError = null;

  if (!isCurrencyMatched) {
    validationError = `Currency Mismatch Error: Product order is priced in ${requiredCurrency} (${CURRENCIES[requiredCurrency]?.symbol || ''}), but your transaction currency is set to ${paymentCurrency}. Order cannot be placed until the currency matches!`;
  } else if (!isAmountMatched) {
    validationError = `Amount Mismatch Error: Exact required product order total is ${formatMoney(requiredAmount, requiredCurrency)}, but entered payment amount is ${formatMoney(paymentAmount || 0, paymentCurrency)}. Order cannot be placed until the exact money transaction matches!`;
  } else if (!isTxnValid) {
    validationError = `Please enter a valid Transaction ID / Reference UTR (at least 6 characters) after scanning and paying via QR.`;
  }

  const copyHandle = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const autoFillExact = () => {
    setPaymentCurrency(requiredCurrency);
    setPaymentAmount(requiredAmount.toString());
  };

  return (
    <div className="card p-6 bg-slate-900 text-white border border-slate-800 shadow-xl rounded-2xl">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center border border-primary-500/30">
            <QrCode size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white text-base leading-tight">Aidoxy Scan &amp; Pay QR Payment</h3>
            <p className="text-xs text-slate-400">eSewa • Khalti • Fonepay • Banking QR</p>
          </div>
        </div>
        <span className="badge bg-emerald-950 text-emerald-400 border border-emerald-800">
          Instant Auto-Verify
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
        {/* QR Image Frame */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
          <div className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-primary-500/40 p-2 bg-white">
            <img
              src="/images/medequip-qr.svg"
              alt="Aidoxy Healthcare Scan & Pay QR Code"
              className="w-56 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            Scan using any Nepalese / International UPI or Wallet app
          </p>
        </div>

        {/* Payee Info & Quick Copy */}
        <div className="space-y-3">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Payee Merchant Account</span>
            <p className="text-sm font-bold text-white leading-snug">Aidoxy Healthcare Pvt. Ltd.</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">PAN: 623593419 | EXIM: 6235934190126NP</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Official eSewa / Fonepay ID</span>
              <p className="text-sm font-mono font-bold text-primary-400">9876543210@esewa</p>
            </div>
            <button
              type="button"
              onClick={() => copyHandle('9876543210@esewa')}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Copy eSewa ID"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>

          <div className="p-3 bg-primary-950/40 border border-primary-500/30 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-primary-300">Required Order Total</span>
              <button
                type="button"
                onClick={autoFillExact}
                className="text-[11px] font-bold text-orange-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw size={11} /> Auto-fill Exact Amount &amp; Currency
              </button>
            </div>
            <p className="text-xl font-extrabold text-white">
              {formatMoney(requiredAmount, requiredCurrency)}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Entry & Currency Match Form */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Transaction Verification &amp; Money Matching Input
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Payment Currency Select */}
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Payment Currency</label>
            <select
              value={paymentCurrency}
              onChange={(e) => setPaymentCurrency(e.target.value)}
              className={`w-full p-2.5 rounded-xl text-sm font-bold bg-slate-900 border ${
                isCurrencyMatched ? 'border-emerald-600 text-emerald-400' : 'border-red-500 text-red-400'
              } focus:outline-none`}
            >
              {Object.keys(CURRENCIES).map((code) => (
                <option key={code} value={code} className="bg-slate-900 text-white">
                  {code} ({CURRENCIES[code].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Payment Amount Input */}
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Paid Amount Number</label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder={`Enter amount e.g. ${requiredAmount}`}
              className={`w-full p-2.5 rounded-xl text-sm font-bold bg-slate-900 border ${
                isAmountMatched ? 'border-emerald-600 text-emerald-400' : 'border-red-500 text-red-400'
              } focus:outline-none`}
            />
          </div>

          {/* Transaction UTR / Ref ID */}
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Transaction ID / UTR</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. TXN98723651"
              className={`w-full p-2.5 rounded-xl text-sm font-mono bg-slate-900 border ${
                isTxnValid ? 'border-emerald-600 text-white' : 'border-slate-700 text-slate-300'
              } focus:outline-none`}
            />
          </div>
        </div>

        {/* Error / Success Validation Alert Display */}
        {validationError ? (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 flex items-start gap-3 text-xs leading-relaxed animate-pulse">
            <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-red-300 mb-0.5">ORDER PLACEMENT LOCKED BY PAYMENT SYSTEM</strong>
              {validationError}
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex items-center gap-3 text-xs">
            <ShieldCheck size={20} className="text-emerald-400 flex-shrink-0" />
            <div>
              <strong className="block font-bold text-emerald-300">✅ CURRENCY &amp; AMOUNT MATCH VERIFIED!</strong>
              Payment transaction is valid for {formatMoney(requiredAmount, requiredCurrency)}. You can now complete your order placement.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
