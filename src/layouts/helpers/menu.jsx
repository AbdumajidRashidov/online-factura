import React from "react";

import { ReactComponent as IncomeIcon } from "assets/icons/sidebar-income.svg";
import { ReactComponent as OutgoIcon } from "assets/icons/sidebar-outgo.svg";
import { ReactComponent as StatisticsIcon } from "assets/icons/sidebar-statistics.svg";
import { ReactComponent as OrderIcon } from "assets/icons/sidebar-stock-orders.svg";
import { ReactComponent as CreateIcon } from "assets/icons/add-item.svg";

export const menu = {
	"": [
		{
			id: "create",
			link: "/",
			label: "Создать",
			icon: <CreateIcon className="mr_5" />,
		},
		{
			id: "income",
			link: "/cashbox/income",
			label: "Входящие",
			icon: <IncomeIcon className="mr_5" />,
		},

		{
			id: "outgo",
			link: "/cashbox/outgo",
			label: "Исходящие",
			icon: <OutgoIcon className="mr_5" />,
		},
		{
			id: "cashbox-saved",
			link: "/cashbox/saved",
			label: "Сохраненные",
			icon: <OrderIcon className="mr_5" />,
		},
		{
			id: "statistics",
			link: "/cashbox/statistics",
			label: "Статистика",
			icon: <StatisticsIcon className="mr_5" />,
		},
	],
};
