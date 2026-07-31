export const CURRENCIES = {
  NPR: {
    code: 'NPR',
    symbol: 'रू',
    name: 'Nepalese Rupee (NPR)',
    rateAgainstNPR: 1,
    locale: 'ne-NP'
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee (INR)',
    rateAgainstNPR: 1.6, // 1 INR = 1.6 NPR
    locale: 'en-IN'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar (USD)',
    rateAgainstNPR: 133.5, // 1 USD = 133.5 NPR
    locale: 'en-US'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro (EUR)',
    rateAgainstNPR: 145.2, // 1 EUR = 145.2 NPR
    locale: 'de-DE'
  }
};

export const formatMoney = (amount, currencyCode = 'NPR') => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.NPR;
  const numericAmount = Number(amount) || 0;
  return `${currency.symbol} ${numericAmount.toLocaleString(currency.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
};

export const getCurrencySymbol = (currencyCode = 'NPR') => {
  return CURRENCIES[currencyCode]?.symbol || 'रू';
};
