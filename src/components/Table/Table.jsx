import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { Button, Spinner, Typography } from "components";
import { Head, TableNoData, TableRow } from "./components";
import { ReactComponent as FilterIcon } from "assets/icons/filter.svg";

import "./Table.scss";

export const Table = ({
	className = "",
	isLoading,
	rowKey = "id",
	columns = [],
	items = [],
	deleteAction,
	editAction,
	onRowClick,
	emptyUiText = "В настоящее время у вас нет данных.",
	isButtonsVisible,
	renderButtons,
	filterComponent,
	showFilter,
}) => {
	const classNames = cn("table__wrapper", className);

	return (
		<>
			{showFilter || items.length ? filterComponent : ""}
			<div className={classNames} style={{ backgroundColor: "#fff", padding: "20px" }}>
				<div className="d-flex align-items-center justify-content-between">
					<div className="table-header d-flex align-items-center">
						<Typography Type="h3" text="Таблица" className="mr_30" />
						<ul className="status_list d-flex">
							<li className="status_list-item--canceled">Отменен</li>
							<li className="status_list-item--followed">Подписано</li>
							<li className="status_list-item--waiting">В ожидании</li>
							<li className="status_list-item--draft">Черновик</li>
						</ul>
					</div>
					<div className="buttons mb_20 d-flex align-items-center justify-content-between">
						<Button
							design="primary"
							text={"Открыть в Exсel"}
							className={"btn btn-primary mr_10"}
						/>
						<Button
							prepend={<FilterIcon />}
							design="primary"
							text={"Фильтр таблицы"}
							className={
								"btn btn-primary d-flex align-items-center justify-content-between"
							}
						/>
					</div>
				</div>
				{!items.length && !isLoading ? (
					<TableNoData emptyUiText={emptyUiText} />
				) : (
					<div className="table__wrapper">
						<table
							className={cn("table", { "table__no-filter": !filterComponent })}
							cellSpacing={0}
						>
							<Head
								columns={columns}
								deleteAction={deleteAction}
								editAction={editAction}
								renderButtons={renderButtons}
							/>

							<tbody className="table__body">
								{isLoading ? (
									<tr>
										<td colSpan="100%">
											<Spinner className="table-spinner" />
										</td>
									</tr>
								) : (
									items.map((row, index) => (
										<TableRow
											key={row[rowKey] ? row[rowKey] : index}
											row={row}
											columns={columns}
											deleteAction={deleteAction}
											editAction={editAction}
											onRowClick={onRowClick}
											renderButtons={renderButtons}
											isButtonsVisible={isButtonsVisible}
										/>
									))
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
};

Table.propTypes = {
	className: PropTypes.string,
	rowKey: PropTypes.string,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			dataKey: PropTypes.string,
			className: PropTypes.string,
			render: PropTypes.func,
			onHeadClick: PropTypes.func,
		})
	),
	items: PropTypes.array,
	deleteAction: PropTypes.func,
	editAction: PropTypes.func,
	emptyUi: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	onRowClick: PropTypes.func,
	renderButtons: PropTypes.func,
};
