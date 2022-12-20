import React from "react";
import { FastField } from "formik";

import { SearchFilter } from "components";
import Containers from "containers";

export const ProductFilter = ({ setFilter }) => {
	return (
		<Containers.Form
			className="filter"
			onSubmit={setFilter}
			shouldValidate={false}
			fields={[
				{
					name: "product_title",
				},
			]}
		>
			{({ values }) => (
				<>
					<FastField
						name="product_title"
						component={SearchFilter}
						onFilter={(event) => {
							event.nativeEvent.stopImmediatePropagation();
							setFilter((prev) => ({ ...prev, product_title: values.product_title }));
						}}
					/>
				</>
			)}
		</Containers.Form>
	);
};
