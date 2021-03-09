const currencyFormatter = (currency = 'PHP') => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency,
  minimumFractionDigits: 2,
});

const formatPercentage = (value: string | number) => {
  if (typeof value === "string") {
    return `${new Intl.NumberFormat().format(parseFloat(value) * 100)}%`;
  }

  return `${new Intl.NumberFormat().format(value * 100)}%`;
}

const formatCurrency = (value: string | number, currency = 'PHP') => {
  if (typeof value === "string") {
    return currencyFormatter(currency).format(parseFloat(value));
  }

  return currencyFormatter(currency).format(value);
};
export { formatPercentage, formatCurrency };
