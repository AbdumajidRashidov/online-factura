import React from "react";
import { FastField } from "formik";
import { get } from "lodash";

import { time, utils } from "services";
import { useGetLanguage, useOverlay } from "hooks";

import Containers from "containers";
import { ModalDefault, Fields, Button, ExpireField, ManufacturerModal } from "components/index";

export const ProductModal = ({
	isOpen,
	handleModalClose,
	handleModalOpen,
	onSuccess,
	isUpdate,
	values,
	storeType,
	categorySlug,
}) => {
	const { getLanguageValue } = useGetLanguage();
	const manufacturerModal = useOverlay({ uniqueName: "manufacturerProductModal" });

	return (
		<>
			<ManufacturerModal
				isOpen={manufacturerModal.isOverlayOpen}
				handleModalClose={manufacturerModal.handleOverlayClose}
				onSuccess={() => {
					manufacturerModal.handleOverlayClose();
					handleModalOpen();
				}}
			/>
			<ModalDefault
				innerClass="max-width_700"
				isOpen={isOpen}
				handleModalClose={handleModalClose}
				title={isUpdate ? "Обновить продукт" : "Создать продукт"}
			>
				<Containers.Form
					url={isUpdate ? `/product/${get(values, "id")}` : "/product"}
					method={isUpdate ? "put" : "post"}
					onSuccess={onSuccess}
					fields={[
						{
							name: "title",
							validations: [{ type: "typeError" }, { type: "required" }],
							value: get(values, "title"),
						},
						{
							name: "category_id",
							validationType: "object",
							validations: [{ type: "typeError" }, { type: "required" }],
							value: get(values, "category"),
							onSubmitValue: (value) => get(value, "id"),
						},
						{
							name: "measure_id",
							validationType: "object",
							validations: [{ type: "typeError" }, { type: "required" }],
							value: get(values, "measure"),
							onSubmitValue: (value) => get(value, "id"),
						},
						{
							name: "manufacturer_id",
							validationType: "object",
							validations: [{ type: "typeError" }],
							value: get(values, "manufacturer"),
							onSubmitValue: (value) => get(value, "id"),
						},
						{
							name: "price",
							validations: [{ type: "typeError" }],
							value: get(values, "price"),
							onSubmitValue: (value) => utils.formatters.formatCurrencyApi(value),
						},
						{
							name: "expire_time",
							validationType: "object",
							value: utils.formatters.parseInterval(get(values, "expire_time")),
							validations: [{ type: "typeError" }],
							onSubmitValue: (value) => time.getExpiredDate(value),
						},
						{
							name: "description",
							value: get(values, "description"),
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
										name="title"
										component={Fields.InputText}
										label="Имя"
										placeholder="имя"
									/>
								</div>

								<div className="col-6">
									<FastField
										name="category_id"
										component={Fields.AsyncSelect}
										label="Категория"
										placeholder="категория"
										loadOptionsUrl={`/category/list/${categorySlug}`}
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
										name="manufacturer_id"
										component={Fields.AsyncSelect}
										label="Производитель"
										placeholder="производитель"
										loadOptionsUrl="/manufacturer"
										onNewClick={() => {
											handleModalClose();
											manufacturerModal.handleOverlayOpen();
										}}
										loadOptionsParams={(searchText) => ({
											filter: {
												title: searchText,
											},
										})}
										getOptionLabel="title"
									/>
								</div>

								<div className="col-6">
									<FastField
										name="measure_id"
										component={Fields.AsyncSelect}
										label="Единица измерения"
										placeholder="единица измерения"
										loadOptionsUrl="/measure"
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
										name="price"
										component={Fields.InputNumber}
										label="Цена"
										placeholder="0"
									/>
								</div>

								<div className="col-6">
									<ExpireField
										label="Срок годности"
										value={values.expire_time}
										onCountChange={(count) =>
											setFieldValue("expire_time.count", count)
										}
										onTypeChange={(option) =>
											setFieldValue("expire_time.type", option)
										}
									/>
								</div>

								<div className="col-12">
									<FastField
										name="description"
										component={Fields.Textarea}
										label="Описание"
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
