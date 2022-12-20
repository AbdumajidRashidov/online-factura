const shouldShowCurrency = (currency = "") => {
	let isVisible = true;

	const lowerCase = currency.toLowerCase();
	if (lowerCase === "uzs" || lowerCase === "sum" || !lowerCase) isVisible = false;

	return isVisible;
};

export const currencyHelpers = {
	shouldShowCurrency,
};
