import React, { useState } from "react";
import cn from "classnames";

import { Button } from "components";
import { constants } from "services";

export const CashFilter = ({ setTransactionType }) => {
	const [type, setType] = useState("income");

	return (
		<div className="filter">
			<Button
				className={cn("filter__tab-pane", {
					"filter__tab-pane_active": type === "income",
				})}
				text="Приход"
				onClick={() => {
					setType("income");
					setTransactionType([
						constants.TRANSACTION_TYPE_COMING,
						constants.TRANSACTION_TYPE_ON_OPEN,
					]);
				}}
			/>
			<Button
				className={cn("filter__tab-pane", {
					"filter__tab-pane_active": type === "outgo",
				})}
				text="Расход"
				onClick={() => {
					setType("outgo");
					setTransactionType([
						constants.TRANSACTION_TYPE_CONSUMPTION,
						constants.TRANSACTION_TYPE_ON_CLOSE,
					]);
				}}
			/>
		</div>
	);
};
