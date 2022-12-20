import React from "react";

import { PageHeading, Typography } from "components";

const CashboxHistory = () => {
	return (
		<>
			<PageHeading
				links={[
					{ link: "/cashbox/create", label: "Главная" },
					{ link: "/cashbox/create", label: "Кассa" },
					{ label: "История кассы" },
				]}
			/>
			<Typography Type="h2" text="Сохраненные" />
		</>
	);
};

export default CashboxHistory;
