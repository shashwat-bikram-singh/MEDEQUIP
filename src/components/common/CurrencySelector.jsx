import { useCurrency } from '../../context/CurrencyContext';

export default function CurrencySelector({ className = '' }) {
  const { selectedCurrency, changeCurrency, currencies } = useCurrency();

  return (
    <div className={`inline-flex items-center gap-1.5 bg-slate-800 text-white rounded-lg px-2 py-1 border border-slate-700 text-xs font-semibold ${className}`}>
      <span className="text-[10px] text-slate-400 font-bold uppercase">Currency:</span>
      <select
        value={selectedCurrency}
        onChange={(e) => changeCurrency(e.target.value)}
        className="bg-transparent text-primary-400 font-bold outline-none cursor-pointer text-xs"
        aria-label="Select currency"
      >
        {Object.keys(currencies).map((code) => (
          <option key={code} value={code} className="bg-slate-900 text-white">
            {code} ({currencies[code].symbol})
          </option>
        ))}
      </select>
    </div>
  );
}
