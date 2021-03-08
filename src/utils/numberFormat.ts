const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
});

const formatPercentage = (value: string | number) => {
  if (typeof value === "string") {
    return `${new Intl.NumberFormat().format(parseFloat(value) * 100)}%`;
  }

  return `${new Intl.NumberFormat().format(value * 100)}%`;
}

const formatCurrency = (value: string | number) => {
  if (typeof value === "string") {
    return currencyFormatter.format(parseFloat(value));
  }

  return currencyFormatter.format(value);
};
export { formatPercentage, formatCurrency };
