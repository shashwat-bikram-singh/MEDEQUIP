import { createContext, useContext, useState, useEffect } from 'react';
import { CURRENCIES, formatMoney } from '../utils/currency';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    return localStorage.getItem('medequip_currency') || 'NPR';
  });

  useEffect(() => {
    localStorage.setItem('medequip_currency', selectedCurrency);
  }, [selectedCurrency]);

  const changeCurrency = (code) => {
    if (CURRENCIES[code]) {
      setSelectedCurrency(code);
    }
  };

  const formatPrice = (amountInNpr, targetCurrencyCode = selectedCurrency) => {
    const targetCurr = CURRENCIES[targetCurrencyCode] || CURRENCIES.NPR;
    const convertedAmount = Math.round(amountInNpr / targetCurr.rateAgainstNPR);
    return formatMoney(convertedAmount, targetCurrencyCode);
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, changeCurrency, formatPrice, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
