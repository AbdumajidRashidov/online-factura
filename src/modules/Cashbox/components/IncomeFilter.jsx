import React from "react";
import { Field } from "formik";
import { get } from "lodash";

import { useGetLanguage } from "hooks";
import { constants } from "services";

import { Fields, Typography } from "components";
import Containers from "containers";
import "../style/cashbox.scss";

export const IncomeFilter = ({ setFilter }) => {
	const { getLanguageValue } = useGetLanguage();

	return (
		<div className="filter-wrapper">
			<Typography Type="h3" text="Фильтр" />

			<Containers.Form
				className="filter"
				onSubmit={setFilter}
				style={{ paddingLeft: 0 }}
				shouldValidate={false}
				fields={[
					{
						name: "currency_id",
						validationType: "object",
						onSubmitValue: (value) => get(value, "id"),
					},
					{
						name: "payment_type_id",
						validationType: "object",
						onSubmitValue: (value) => get(value, "id"),
					},
				]}
			>
				{() => (
					<>
						<Field
							name="currency_id"
							component={Fields.AsyncSelect}
							loadOptionsUrl="/currency"
							placeholder="Номер документа"
							size="sm"
							label="Номер документа"
							getOptionLabel={(option) =>
								"label" in option
									? option.label
									: getLanguageValue(get(option, "name"))
							}
							initialValue={[constants.selectAll]}
							className="filter__control mr_15 min-width_200"
							onValueChange={(option) =>
								setFilter((prev) => ({ ...prev, currency_id: get(option, "id") }))
							}
						/>
						<Field
							name="payment_type_id"
							component={Fields.AsyncSelect}
							loadOptionsUrl="/payment-type"
							placeholder="Статус документа"
							size="sm"
							label="Статус документа"
							className="filter__control mr_15 min-width_250"
							initialValue={[constants.selectAll]}
							getOptionLabel={(option) =>
								"label" in option
									? option.label
									: getLanguageValue(get(option, "title"))
							}
							onValueChange={(option) =>
								setFilter((prev) => ({
									...prev,
									payment_type_id: get(option, "id"),
								}))
							}
						/>
						<Field
							name="currency_id"
							component={Fields.AsyncSelect}
							loadOptionsUrl="/currency"
							placeholder="Номер документа"
							size="sm"
							label="Номер документа"
							getOptionLabel={(option) =>
								"label" in option
									? option.label
									: getLanguageValue(get(option, "name"))
							}
							initialValue={[constants.selectAll]}
							className="filter__control mr_15 min-width_200"
							onValueChange={(option) =>
								setFilter((prev) => ({ ...prev, currency_id: get(option, "id") }))
							}
						/>
						<Field
							name="payment_type_id"
							component={Fields.AsyncSelect}
							loadOptionsUrl="/payment-type"
							placeholder="Статус документа"
							size="sm"
							label="Статус документа"
							className="filter__control min-width_250"
							initialValue={[constants.selectAll]}
							getOptionLabel={(option) =>
								"label" in option
									? option.label
									: getLanguageValue(get(option, "title"))
							}
							onValueChange={(option) =>
								setFilter((prev) => ({
									...prev,
									payment_type_id: get(option, "id"),
								}))
							}
						/>
					</>
				)}
			</Containers.Form>
		</div>
	);
};
