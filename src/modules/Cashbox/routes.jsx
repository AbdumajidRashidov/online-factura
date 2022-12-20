import { lazy } from "react";

import "./style/cashbox.scss";

const Income = lazy(() => import("./pages/Income"));
const Outgo = lazy(() => import("./pages/Outgo"));
const CashboxStatistics = lazy(() => import("./pages/CashboxStatistics"));
const CashboxOrders = lazy(() => import("./pages/CashboxOrder"));
const CashboxHistory = lazy(() => import("./pages/CashboxHistory"));
const IncomeSingle = lazy(() => import("./pages/IncomeSingle"));

export const CashboxRoutes = [
	{
		path: "/",
		element: <CashboxOrders />,
	},
	{
		path: "/cashbox/income",
		element: <Income />,
	},
	{
		path: "/cashbox/income/:id",
		element: <IncomeSingle />,
	},
	{
		path: "/cashbox/outgo",
		element: <Outgo />,
	},
	{
		path: "/cashbox/statistics",
		element: <CashboxStatistics />,
	},
	{
		path: "/cashbox/saved",
		element: <CashboxHistory />,
	},
];
