import React from "react";
import { FastField } from "formik";
import { get } from "lodash";

import { utils } from "services";

import Containers from "containers";
import { ModalDefault, Fields, Button } from "components/index";

export const ProviderModal = ({
	isOpen,
	handleModalClose,
	onSuccess,
	isUpdate,
	values,
	storeType,
}) => {
	return (
		<ModalDefault
			innerClass="max-width_700"
			isOpen={isOpen}
			handleModalClose={handleModalClose}
			title={isUpdate ? "Обновить поставщика" : "Создать поставщика"}
		>
			<Containers.Form
				url={isUpdate ? `/provider/${get(values, "id")}` : "/provider"}
				method={isUpdate ? "put" : "post"}
				onSuccess={onSuccess}
				fields={[
					{
						name: "full_name",
						validations: [{ type: "typeError" }, { type: "required" }],
						value: get(values, "full_name"),
					},
					{
						name: "phone_number",
						validations: [{ type: "phone" }],
						value: utils.formatters.formatPhoneView(get(values, "phone_number")),
						onSubmitValue: (value) => utils.formatters.formatPhoneApi(value),
					},
					{
						name: "company_name",
						validations: [{ type: "typeError" }, { type: "required" }],
						value: get(values, "company_name"),
					},
					{
						name: "chat_id",
						validations: [{ type: "typeError" }, { type: "required" }],
						value: get(values, "chat_id"),
					},
					{
						name: "type",
						value: storeType,
					},
				]}
			>
				{({ isSubmitting }) => (
					<>
						<div className="row g-4">
							<div className="col-6">
								<FastField
									name="full_name"
									component={Fields.InputText}
									label="Имя"
									placeholder="имя"
								/>
							</div>

							<div className="col-6">
								<FastField
									name="company_name"
									component={Fields.InputText}
									label="Название фирмы"
									placeholder="название фирмы"
								/>
							</div>

							<div className="col-6">
								<FastField
									name="phone_number"
									component={Fields.InputMask}
									label="Номер телефона"
									prepend=""
								/>
							</div>

							<div className="col-6">
								<FastField
									name="chat_id"
									component={Fields.InputText}
									label="Телеграм ID"
									placeholder="телеграм id"
								/>
							</div>
						</div>

						<Button
							design="primary"
							type="submit"
							className="btn modal-btn mt_40"
							text="Сохранить"
							isLoading={isSubmitting}
						/>
					</>
				)}
			</Containers.Form>
		</ModalDefault>
	);
};
