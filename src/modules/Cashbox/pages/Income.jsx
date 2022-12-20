import React, { useState } from "react";

import { PageHeading, Typography, TabBase } from "components";
import TabContent from "../components/TabContent";

const Income = () => {
	const [tabLabel, setTabLabel] = useState("Договора");

	return (
		<>
			<PageHeading
				links={[
					{ link: "/", label: "Главная" },
					{ link: "/", label: "Кассa" },
					{ label: "Приход" },
				]}
			/>

			<Typography Type="h2" className="mb_30" text="Документы" />

			<div className="row">
				<div className="col-8 mb_30" style={{ padding: "0" }}>
					<TabBase
						labels={["Договора", "Счет фактуры", "Акт", "Доверенность", "ТТН"]}
						currentLabel={tabLabel}
						className="theme-create-tab"
						onPaneChange={(active, event) => setTabLabel(active)}
					/>
				</div>
			</div>

			<div className="tab-content">
				<TabContent tabLabel={tabLabel} />
			</div>
		</>
	);
};

export default Income;
