import { get } from "lodash";

export const productAdapter = (product = []) => {
	return product.map((item) => ({
		product_id: {
			title: get(item, "product.title"),
			id: item.product_id,
			measure: get(item, "product.measure"),
		},
		quantity: item.quantity,
	}));
};
