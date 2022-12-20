import React from "react";
import { FastField } from "formik";
import { useSelector } from "react-redux";
import { get } from "lodash";

import { userSelector } from "store/selectors";
import { useGetLanguage, useOverlay } from "hooks";
import { constants, time, utils } from "services";

import Containers from "containers";
import { ModalDefault, Fields, Button, PatientModal } from "components";

export const AddDebtorModal = ({
	isOpen,
	handleOverlayClose,
	handleOverlayOpen,
	onAddedNewRecord,
}) => {
	const { getLanguageValue } = useGetLanguage();
	const user = useSelector(userSelector);

	const patientModal = useOverlay({ uniqueName: "patientModalDebtor" });

	return (
		<>
			<PatientModal
				isUpdate={false}
				isOpen={patientModal.isOverlayOpen}
				handleModalClose={patientModal.handleOverlayClose}
				onSuccess={() => {
					patientModal.handleOverlayClose();
					handleOverlayOpen();
				}}
			/>
			<ModalDefault
				isOpen={isOpen}
				handleModalClose={handleOverlayClose}
				title="Добавить должника"
				subtitle={() => (
					<>
						<span className="color_txt-primary fw_600">{get(user, "username")}</span> (
						{getLanguageValue(get(user, "position.title"))})
					</>
				)}
				innerClass="max-width_700"
			>
				<Containers.Form
					url="/debtor"
					onSuccess={() => {
						handleOverlayClose();
						onAddedNewRecord();
					}}
					fields={[
						{
							name: "user_id",
							validationType: "object",
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => get(value, "id"),
						},
						{
							name: "patient_id",
							validationType: "object",
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => get(value, "id"),
						},
						{
							name: "currency_id",
							validationType: "object",
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => get(value, "id"),
						},
						{
							name: "amount",
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => utils.formatters.formatCurrencyApi(value),
						},
						{
							name: "degree",
							validations: [{ type: "typeError" }, { type: "required" }],
							validationType: "object",
							onSubmitValue: (value) => get(value, "value"),
						},
						{
							name: "expired_at",
							value: time.getCurrentTime(),
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => time.toTimestamp(value),
						},
						{
							name: "type",
							validationType: "object",
							validations: [{ type: "typeError" }],
							onSubmitValue: (value) => get(value, "value"),
						},
						{
							name: "comment",
						},
					]}
				>
					{({ isSubmitting }) => (
						<>
							<div className="row g-4">
								<div className="col-12">
									<FastField
										name="patient_id"
										component={Fields.AsyncSelect}
										label="пациент"
										placeholder="пациент"
										loadOptionsUrl="/patient"
										loadOptionsParams={(searchText) => ({
											filter: {
												name: searchText,
											},
										})}
										onNewClick={() => {
											handleOverlayClose();
											patientModal.handleOverlayOpen();
										}}
										getOptionLabel={(option) =>
											`${get(option, "first_name", "")}
											${get(option, "last_name") ? get(option, "last_name", "") : ""}`
										}
									/>
								</div>

								<div className="col-6">
									<FastField
										name="type"
										component={Fields.Select}
										label="тип карты"
										placeholder="тип карты"
										options={constants.cardTypes}
										isSearchable={true}
									/>
								</div>

								<div className="col-6">
									<FastField
										name="user_id"
										component={Fields.AsyncSelect}
										label="ответственный Сотрудник"
										placeholder="ответственный"
										loadOptionsUrl="/user"
										loadOptionsParams={(searchText) => ({
											include: "userDetail",
											filter: {
												full_name: searchText,
											},
										})}
										getOptionLabel={(option) =>
											utils.formatters.showUserFullName(option)
										}
									/>
								</div>

								<div className="col-6">
									<FastField
										name="expired_at"
										component={Fields.DatePicker}
										label="срок выплаты"
										placeholder="срок выплаты"
										prepend=""
									/>
								</div>

								<div className="col-6">
									<FastField
										name="amount"
										component={Fields.InputNumber}
										label="Сумма"
										placeholder="Сумма"
									/>
								</div>

								<div className="col-6">
									<FastField
										name="currency_id"
										component={Fields.AsyncSelect}
										label="валюта"
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

								<div className="col-6">
									<FastField
										name="degree"
										component={Fields.Select}
										label="степень знакомства"
										placeholder="степень знакомства"
										options={constants.degreeTypes}
										isSearchable={true}
									/>
								</div>

								<div className="col-12">
									<FastField
										name="comment"
										component={Fields.Textarea}
										label="Комментарий"
										placeholder="Напишите что-нибудь"
										size="textarea"
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
		</>
	);
};
