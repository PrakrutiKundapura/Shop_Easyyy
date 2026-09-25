/**
 * Indian Rupee (INR) formatting helper
 * Formats prices cleanly according to Indian numbering system (e.g. ₹1,499 or ₹14,999.50)
 */
export const formatINR = (amount: number, forceDecimals = false): string => {
  const hasDecimals = forceDecimals || (amount % 1 !== 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatPrice = formatINR;
