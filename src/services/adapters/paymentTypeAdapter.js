export const paymentTypeAdapter = (paymentType = []) =>
	paymentType.map((item) => ({
		title: item.title,
		payment_type_id: item.id,
		amount: "",
	}));
