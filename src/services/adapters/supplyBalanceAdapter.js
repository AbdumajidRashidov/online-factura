import { utils } from "services";
import { get } from "lodash";

export const supplyBalanceAdapter = (statistics = {}) => [
	{
		label: "Баланс:",
		value: utils.formatters.formatCurrencyView(get(statistics, "balance")),
	},
	{
		label: "Приход:",
		value: utils.formatters.formatCurrencyView(Math.round(get(statistics, "income"))),
	},
	{
		label: "Расход:",
		value: utils.formatters.formatCurrencyView(get(statistics, "outgo")),
	},
	{
		label: "Средняя цена:",
		value: utils.formatters.formatCurrencyView(get(statistics, "average_price_order")),
	},
];
