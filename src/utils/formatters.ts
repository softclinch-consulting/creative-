export const CURRENCY_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 154.5
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥'
};

export const formatPrice = (usdAmount: number, currency: 'USD' | 'EUR' | 'GBP' | 'JPY' = 'USD'): string => {
  const rate = CURRENCY_RATES[currency] || 1.0;
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const converted = Math.round(usdAmount * rate);

  if (currency === 'JPY') {
    return `${symbol}${converted.toLocaleString()}`;
  }
  return `${symbol}${converted.toLocaleString()}`;
};

export const generateBookingRef = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'AUR-';
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
};

export const formatDateDisplay = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
