import React from "react";
import { FastField, Field } from "formik";
import { get } from "lodash";

import { useGetLanguage } from "hooks";
import { constants } from "services";

import Containers from "containers";
import { Fields, SearchFilter } from "components";

export const ProductHistoryFilter = ({ setFilter, type }) => {
	const { getLanguageValue } = useGetLanguage();

	return (
		<Containers.Form
			className="filter"
			onSubmit={setFilter}
			shouldValidate={false}
			fields={[
				{
					name: "product_title",
				},
				{
					name: "currency_id",
					validationType: "object",
					onSubmitValue: (value) => get(value, "id"),
				},
				{
					name: "provider_id",
					validationType: "object",
					onSubmitValue: (value) => get(value, "id"),
				},
			]}
		>
			{({ values }) => (
				<>
					<FastField
						name="product_title"
						className="mr_15"
						component={SearchFilter}
						onFilter={(event) => {
							event.nativeEvent.stopImmediatePropagation();
							setFilter((prev) => ({ ...prev, product_title: values.product_title }));
						}}
					/>

					<Field
						name="currency_id"
						component={Fields.AsyncSelect}
						loadOptionsUrl="/currency"
						loadOptionsParams={(searchText) => ({
							filter: {
								name: searchText,
							},
						})}
						placeholder="Валюта"
						size="xsm"
						getOptionLabel={(option) =>
							"label" in option ? option.label : getLanguageValue(get(option, "name"))
						}
						initialValue={[constants.selectAll]}
						className="filter__control mr_15 min-width_150"
						onValueChange={(option) =>
							setFilter((prev) => ({ ...prev, currency_id: get(option, "id") }))
						}
					/>
					<Field
						name="provider_id"
						component={Fields.AsyncSelect}
						loadOptionsUrl="/provider"
						loadOptionsParams={(searchText) => ({
							filter: {
								company_name: searchText,
								type,
							},
						})}
						placeholder="постващик"
						size="xsm"
						className="filter__control min-width_200"
						initialValue={[constants.selectAll]}
						getOptionLabel={(option) =>
							"label" in option ? option.label : get(option, "company_name")
						}
						onValueChange={(option) =>
							setFilter((prev) => ({ ...prev, provider_id: get(option, "id") }))
						}
					/>
				</>
			)}
		</Containers.Form>
	);
};
