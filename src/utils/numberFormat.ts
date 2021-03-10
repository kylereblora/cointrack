const defaultNumberFormatConfig = {
  minimumFractionDigits: 2,
};

const currencyFormatter = (currency = "PHP") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    ...defaultNumberFormatConfig,
  });

const formatPercentage = (value: string | number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    ...defaultNumberFormatConfig,
  });

  if (typeof value === "string") {
    return `${formatter.format(parseFloat(value) * 100)}%`;
  }

  return `${formatter.format(value * 100)}%`;
};

const formatCurrency = (value: string | number, currency = "PHP") => {
  if (typeof value === "string") {
    return currencyFormatter(currency).format(parseFloat(value));
  }

  return currencyFormatter(currency).format(value);
};
export { formatPercentage, formatCurrency };
