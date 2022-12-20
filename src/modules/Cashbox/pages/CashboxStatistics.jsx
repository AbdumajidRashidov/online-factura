import React from "react";
import { PageHeading } from "components";

const CashboxStatistics = () => {
	return (
		<>
			<PageHeading
				links={[
					{ link: "/cashbox/create", label: "Главная" },
					{ link: "/cashbox/create", label: "Кассa" },
					{ label: "Статистика" },
				]}
				title="Статистика"
			/>
		</>
	);
};

export default CashboxStatistics;
