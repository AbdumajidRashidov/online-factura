import React from "react";
import { FastField } from "formik";
import { get } from "lodash";

import { Button, Fields, ModalDefault, Typography } from "components";
import Containers from "containers";
import { useFetchOne, useGetLanguage } from "hooks";

export const OrderStoreApprove = ({ isOpen, orderId, username, handleModalClose, onSuccess }) => {
	const { getLanguageValue } = useGetLanguage();

	const orderSingle = useFetchOne({
		url: `/order/${orderId}`,
		queryOptions: {
			enabled: !!orderId,
		},
		urlSearchParams: {
			include: "items.product,items.product.measure,stockProducts",
		},
		refetchStatus: isOpen,
	});

	return (
		<ModalDefault
			isOpen={isOpen}
			handleModalClose={handleModalClose}
			title="Одобрить заказ"
			subtitle={() => (
				<>
					<span className="color_txt-primary fw_600">{username}</span> (Кассир)
				</>
			)}
			innerClass="max-width_700"
		>
			<Containers.Form
				method="put"
				url={`/order/${orderId}/approve-stock`}
				onSuccess={() => {
					onSuccess();
					handleModalClose();
				}}
				fields={[
					{
						name: "items",
						validationType: "array",
						value: get(orderSingle.data, "items", []).map((item, index) => {
							const stockProduct = get(orderSingle.data, "stockProducts", []);
							return {
								product_id: get(item, "product"),
								quantity: get(item, "quantity"),
								factual_quantity: get(stockProduct, `${index}.quantity`),
							};
						}),
						disabled: true,
					},
				]}
			>
				{({ isSubmitting, values }) => (
					<>
						<Products products={values.items} getLanguageValue={getLanguageValue} />

						<Button
							type="submit"
							className="modal-btn fz_16 btn mt_40"
							design="primary"
							text="Одобрить"
							isLoading={isSubmitting}
						/>
					</>
				)}
			</Containers.Form>
		</ModalDefault>
	);
};

const Products = ({ products, getLanguageValue }) =>
	products.map((product, index) => (
		<div key={index} className="mt_40">
			<div className="d-flex align-items-center justify-content-between mb_20">
				<Typography
					Type="span"
					className="color_brand-blue product__btn"
					text={`${index + 1}-ПРОДУКТ`}
				/>
			</div>

			<div key={index} className="row g-4">
				<div className="col-6">
					<FastField
						name={`items.${index}.product_id`}
						component={Fields.AsyncSelect}
						label="Продукт"
						placeholder="продукт"
						loadOptionsUrl="/product"
						loadOptionsParams={(searchText) => ({ include: "measure" })}
						getOptionLabel={(option) =>
							`${get(option, "title")} (${getLanguageValue(
								get(option, "measure.short_name", "")
							)})`
						}
						isDisabled={true}
					/>
				</div>

				<div className="col-6">
					<FastField
						name={`items.${index}.quantity`}
						component={Fields.InputNumber}
						label="Колличество"
						placeholder="колличество"
						isDisabled={true}
					/>
				</div>

				<div className="col-6">
					<FastField
						name={`items.${index}.factual_quantity`}
						component={Fields.InputNumber}
						label="Фактически"
						placeholder="колличество"
						isDisabled={true}
					/>
				</div>
			</div>
		</div>
	));
