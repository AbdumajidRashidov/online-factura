import Contract from "./Contract";

const TabContent = ({ tabLabel }) => {
	if (tabLabel === "Договора") {
		return <Contract />;
	} else if (tabLabel === "Счет фактуры") {
		return "Счет фактуры";
	} else if (tabLabel === "Акт") {
		return "Акт";
	} else if (tabLabel === "Доверенность") {
		return "Доверенность";
	} else if (tabLabel === "ТТН") {
		return "ТТН";
	}
};

export default TabContent;
