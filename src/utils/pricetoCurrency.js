const priceToCurrency = (num) => {
  const numericValue = parseFloat(num.replace(/[₦,]/g, ""));
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(numericValue);

  return formattedAmount;
};

export default priceToCurrency;
