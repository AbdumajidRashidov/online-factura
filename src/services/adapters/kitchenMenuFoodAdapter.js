import { get } from "lodash";

export const kitchenMenuFoodAdapter = (food = []) =>
	food.map((item) => ({
		food_id: get(item, "food"),
		quantity: get(item, "quantity"),
		type: get(item, "type"),
	}));
