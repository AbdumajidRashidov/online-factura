export const billingAdapter = (billing = []) =>
	billing.map((item) => ({
		bill_id: item,
		quantity: "",
	}));
