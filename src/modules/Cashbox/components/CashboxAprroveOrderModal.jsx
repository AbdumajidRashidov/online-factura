import React from "react";
import { FastField } from "formik";
import { get } from "lodash";

import { useGetLanguage } from "hooks";
import { utils } from "services";

import Containers from "containers";
import { ModalDefault, Fields, Button } from "components/index";

export const CashboxApproveOrderModal = ({ isOpen, handleModalClose, onSuccess, orderId }) => {
	const { getLanguageValue } = useGetLanguage();

	return (
		<ModalDefault
			innerClass="max-width_700"
			isOpen={isOpen}
			handleModalClose={handleModalClose}
			title="Одобрить"
		>
			<Containers.Form
				url={`/order/${orderId}/approve-cash-box`}
				method="put"
				onSuccess={() => {
					onSuccess();
					handleModalClose();
				}}
				fields={[
					{
						name: "total_price",
						validations: [{ type: "typeError" }, { type: "required" }],
						onSubmitValue: (value) => utils.formatters.formatCurrencyApi(value),
					},
					{
						name: "currency_id",
						validations: [{ type: "typeError" }, { type: "required" }],
						validationType: "object",
						onSubmitValue: (value) => get(value, "id"),
					},
					{
						name: "payment_type_id",
						validations: [{ type: "typeError" }, { type: "required" }],
						validationType: "object",
						onSubmitValue: (value) => get(value, "id"),
					},
				]}
			>
				{({ isSubmitting }) => (
					<>
						<div className="row g-4">
							<div className="col-6">
								<FastField
									name="total_price"
									component={Fields.InputNumber}
									label="Сумма"
									placeholder="0"
								/>
							</div>

							<div className="col-6">
								<FastField
									name="payment_type_id"
									component={Fields.AsyncSelect}
									label="Способ оплаты"
									placeholder="способ оплаты"
									loadOptionsUrl="/payment-type"
									loadOptionsParams={(searchText) => ({
										filter: {
											title: searchText,
										},
									})}
									getOptionLabel={(option) =>
										getLanguageValue(get(option, "title"))
									}
								/>
							</div>

							<div className="col-6">
								<FastField
									name="currency_id"
									component={Fields.AsyncSelect}
									label="Валюта"
									placeholder="валюта"
									loadOptionsUrl="/currency"
									loadOptionsParams={(searchText) => ({
										filter: {
											name: searchText,
										},
									})}
									getOptionLabel={(option) =>
										getLanguageValue(get(option, "name"))
									}
								/>
							</div>
						</div>

						<Button
							design="primary"
							type="submit"
							className="modal-btn fz_16 btn mt_40"
							text="Сохранить"
							isLoading={isSubmitting}
						/>
					</>
				)}
			</Containers.Form>
		</ModalDefault>
	);
};
