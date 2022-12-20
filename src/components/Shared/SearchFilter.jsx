import React from "react";

import { Fields } from "components";

import SearchIcon from "assets/icons/filter-search.svg";

export const SearchFilter = ({ form, field, className = "", onFilter, ...props }) => {
	return (
		<Fields.InputText
			form={form}
			field={field}
			prepend={
				<button onClick={onFilter} className="mr_5">
					<img src={SearchIcon} alt="" />
				</button>
			}
			size="xsm"
			outerClass={`filter__control ${className}`}
			placeholder="Поиск ..."
			{...props}
		/>
	);
};
