import React from "react";
import { FastField } from "formik";
import { get } from "lodash";

import { time, utils } from "services";
import { useGetLanguage, useOverlay } from "hooks";

import { Button, Fields, ModalDefault, ProductModal } from "components";
import Containers from "containers";

export const ProductIncomeModal = ({
	isOpen,
	handleModalClose,
	handleModalOpen,
	onSuccess,
	username,
	storeId,
	storeType,
	categorySlug,
}) => {
	const { getLanguageValue } = useGetLanguage();
	const productModal = useOverlay({ uniqueName: "productCreateModal" });

	const calculateTotalPrice = (setFieldValue, values) => {
		const totalPrice =
			utils.formatters.formatCurrencyApi(get(values, "quantity")) *
			utils.formatters.formatCurrencyApi(get(values, "price"));
		setFieldValue("total_price", totalPrice);
	};

	return (
		<>
			<ProductModal
				isOpen={productModal.isOverlayOpen}
				handleModalClose={productModal.handleOverlayClose}
				storeType={storeType}
				onSuccess={() => {
					productModal.handleOverlayClose();
					handleModalOpen();
				}}
				categorySlug={categorySlug}
			/>
			<ModalDefault
				isOpen={isOpen}
				handleModalClose={handleModalClose}
				title="Добавить Продукт (вручную)"
				subtitle={() => (
					<>
						<span className="color_txt-primary fw_600">{username}</span> (Кассир)
					</>
				)}
				innerClass="max-width_700"
			>
				<Containers.Form
					url="/stock-product/manual"
					onSuccess={() => {
						onSuccess();
						handleModalClose();
					}}
					fields={[
						{
							name: "product_id",
							validationType: "object",
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => get(value, "id"),
						},
						{
							name: "stock_id",
							value: storeId,
						},
						{
							name: "provider_id",
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
							name: "payment_type_id",
							validationType: "object",
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => get(value, "id"),
						},
						{
							name: "quantity",
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => utils.formatters.formatCurrencyApi(value),
						},
						{
							name: "price",
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => utils.formatters.formatCurrencyApi(value),
						},
						{
							name: "total_price",
							validations: [{ type: "typeError" }, { type: "required" }],
							onSubmitValue: (value) => utils.formatters.formatCurrencyApi(value),
						},
						{
							name: "currency_value",
							onSubmitValue: (value) => utils.formatters.formatCurrencyApi(value),
						},
						{
							name: "expired_date",
							validations: [{ type: "typeError" }, { type: "required" }],
							value: time.getCurrentTime(),
							onSubmitValue: (value) => time.toTimestamp(value),
						},
						{
							name: "type",
							value: storeType,
						},
					]}
				>
					{({ isSubmitting, setFieldValue, values }) => (
						<>
							<div className="row g-4">
								<div className="col-6">
									<FastField
										name="provider_id"
										component={Fields.AsyncSelect}
										label="поставщик"
										placeholder="поставщик"
										loadOptionsUrl="/provider"
										loadOptionsParams={(searchText) => ({
											filter: {
												type: storeType,
												company_name: searchText,
											},
										})}
										getOptionLabel="company_name"
									/>
								</div>

								<div className="col-6">
									<FastField
										name="product_id"
										component={Fields.AsyncSelect}
										label="Наименование"
										placeholder="наименование"
										loadOptionsUrl="/product"
										loadOptionsParams={(searchText) => ({
											include: "measure",
											filter: {
												type: storeType,
												title: searchText,
											},
										})}
										onNewClick={() => {
											handleModalClose();
											productModal.handleOverlayOpen();
										}}
										getOptionLabel={(option) =>
											`${get(option, "title")} (${getLanguageValue(
												get(option, "measure.short_name", "")
											)})`
										}
									/>
								</div>

								<div className="col-6">
									<FastField
										name="quantity"
										component={Fields.InputNumber}
										label="Количество"
										placeholder="количество"
										onBlur={() => {
											calculateTotalPrice(setFieldValue, values);
										}}
									/>
								</div>

								<div className="col-6">
									<FastField
										name="price"
										component={Fields.InputNumber}
										label="Цена (шт)"
										placeholder="0"
										onBlur={() => {
											calculateTotalPrice(setFieldValue, values);
										}}
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

								{utils.currencyHelpers.shouldShowCurrency(
									get(values, "currency_id.short_name")
								) && (
									<div className="col-6">
										<FastField
											name="currency_value"
											component={Fields.InputNumber}
											label="Конвертация"
											placeholder="0"
										/>
									</div>
								)}

								<div className="col-6">
									<FastField
										name="expired_date"
										component={Fields.DatePicker}
										label="Срок годности"
										placeholder="срок годности"
										prepend=""
									/>
								</div>

								<div className="col-6">
									<FastField
										name="total_price"
										component={Fields.InputNumber}
										label="Сумма"
										placeholder="0"
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
								type="submit"
								className="modal-btn fz_16 btn mt_40"
								design="primary"
								text="Добавить продукт"
								isLoading={isSubmitting}
							/>
						</>
					)}
				</Containers.Form>
			</ModalDefault>
		</>
	);
};
