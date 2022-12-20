import React, { useState } from "react";
import { Pagination, Table } from "components";

import { useFetchList } from "hooks";
import { get, isEmpty } from "lodash";

import "../style/cashbox.scss";
import { IncomeFilter } from "./IncomeFilter";
import { useNavigate } from "react-router-dom";

const Contract = () => {
	const [filter, setFilter] = useState({});
	const navigate = useNavigate();

	const contractList = useFetchList({
		url: "/order",
	});
	console.log(contractList);

	return (
		<>
			<div className="row">
				<div className="col-12 p_20" style={{ padding: "0" }}>
					<Table
						emptyUiText="В настоящее время у вас нет данных о Должниках."
						isLoading={contractList.isLoading}
						filterComponent={<IncomeFilter setFilter={setFilter} />}
						showFilter={!isEmpty(filter)}
						onRowClick={(order) => navigate(`/cashbox/income/${get(order, "id")}`)}
						columns={[
							{
								title: "Статус",
								dataKey: "id",
								className: "white-space_no-wrap",
								render: (value) => value,
							},
							{
								title: "Тип документа",
								dataKey: "name",
								render: (value) => value,
							},
							{
								title: "Дата обновления",
								dataKey: "year",
								render: (value) => value,
							},
							{
								title: "Контрагент",
								dataKey: "pantone_value",
								render: (value) => value,
							},
							{
								title: "Номер и дата документа",
								dataKey: "pantone_value",
								className: "white-space_no-wrap",
								render: (value) => value,
							},
							{
								title: "Номер и дата договора",
								dataKey: "color",
								className: "white-space_no-wrap",
								render: (value) => value,
							},
							{
								title: "Стоимость поставки",
								dataKey: "total",
								render: (value) => value,
							},
						]}
						items={contractList.data}
					/>
					<Pagination
						pageCount={get(contractList, "meta.pageCount")}
						onPageChange={(newPage) => contractList.setPage(newPage + 1)}
						currentPage={contractList.page}
					/>
				</div>
			</div>
		</>
	);
};

export default Contract;
