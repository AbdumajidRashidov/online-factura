import React from "react";

import { Button, Fields, PageHeading, Typography } from "components";
import Containers from "containers";
import { get } from "lodash";
import { FastField } from "formik";
import { ReactComponent as CloseIcon } from "assets/icons/btn-close.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";

import { FileUpload } from "components/index";

import "../style/cashbox.scss";

const CashboxOrder = () => {
	return (
		<>
			<PageHeading
				links={[
					{ link: "/", label: "Главная" },
					{ link: "/", label: "Касса" },
					{ label: "Создание документа" },
				]}
			/>

			<Typography Type="h2" className="mb_30" text="Создание документа: Счёт-фактура" />

			<Containers.Form
				url={"/order"}
				method={"post"}
				fields={[
					{
						name: "Тип счета",
						validationType: "object",
						validations: [{ type: "required" }],
						onSubmitValue: (value) => get(value, "id"),
					},
					{
						name: "Номер счет-фактуры",
						validations: [{ type: "required" }],
					},
					{
						name: "Дата документ",
						validations: [{ type: "required" }],
					},
					{
						name: "номер контракта",
						validations: [{ type: "required" }],
					},
					{
						name: "Дата до",
						validations: [{ type: "required" }],
					},
					{
						name: "ИНН",
						validationType: "object",
						validations: [{ type: "required" }],
						onSubmitValue: (value) => get(value, "value"),
					},
					{
						name: "НДС регистрационный номер",
						validations: [{ type: "required" }],
					},
					{
						name: "Номер счета",
						validations: [{ type: "required" }],
					},
					{
						name: "Адрес",
						validations: [{ type: "required" }],
					},
					{
						name: "Директор",
						validations: [{ type: "required" }],
					},
					{
						name: "Главный бухгалтер",
						validations: [{ type: "required" }],
					},
					{
						name: "Номер счета",
						validations: [{ type: "required" }],
					},
					{
						name: "Односторонний счет?",
						validations: [{ type: "required" }],
					},
					{
						name: "Компания-партнер",
						validations: [{ type: "required" }],
					},
					{
						name: "МФО",
						validations: [{ type: "required" }],
					},
					{
						name: "Номер счета",
						validations: [{ type: "required" }],
					},
					{
						name: "Адрес",
						validations: [{ type: "required" }],
					},
					{
						name: "Директор",
						validations: [{ type: "required" }],
					},
					{
						name: "Главный бухгалтер",
						validations: [{ type: "required" }],
					},
					{
						name: "file_id",
						validations: [{ type: "required" }],
					},
					{
						name: "Выберите доверенность",
						validations: [{ type: "required" }],
					},
					{
						name: "Номер доверенности",
						validations: [{ type: "required" }],
					},
					{
						name: "Дата доверенности",
						validations: [{ type: "required" }],
					},
					{
						name: "ИНН-type",
						validations: [{ type: "required" }],
					},
					{
						name: "Ответственное лицо ФИО",
						validations: [{ type: "required" }],
					},
				]}
			>
				{({ isSubmitting }) => (
					<>
						<div className="wrapper">
							<div className="row g-4">
								<div className="col-6">
									<FastField
										name="Тип счета"
										label={"Тип счета"}
										component={Fields.Select}
										placeholder={"Стандарт"}
										options={[
											{ label: "Стандарт", value: "Стандарт" },
											{ label: "HoСтандарт", value: "HoСтандарт" },
										]}
									/>
								</div>
								<div className="col-6"></div>
								<div className="col-6">
									<FastField
										name="Номер счет-фактуры"
										component={Fields.InputText}
										label="Номер счет-фактуры"
										placeholder={"Номер счет-фактуры"}
									/>
								</div>
								<div className="col-6">
									<FastField
										name="Дата документ"
										component={Fields.InputText}
										label="Дата документ"
										placeholder="Дата документ"
									/>
								</div>
								<div className="col-6">
									<FastField
										name="номер контракта"
										component={Fields.InputText}
										label="Введите номер контракта"
										placeholder="Введите номер контракта"
									/>
								</div>
								<div className="col-6">
									<FastField
										name="Дата до"
										component={Fields.InputText}
										label="Дата до"
										placeholder="Дата до"
									/>
								</div>
							</div>
						</div>

						<div className="wrapper">
							<div className="row g-4">
								<div className="col-6">
									<Typography
										Type="h3"
										text="Ваша информация"
										className="mb_20"
									/>
									<div className="row">
										<div className="col-12 mb_30">
											<FastField
												name="ИНН"
												component={Fields.Select}
												label="ИНН"
												placeholder="ИНН"
											/>
										</div>
										<div className="col-12 mb_30">
											<FastField
												name="НДС регистрационный номер"
												component={Fields.InputText}
												label="НДС регистрационный номер"
												placeholder="Введите данные"
											/>
										</div>
										<div className="col-6 mb_30">
											<FastField
												name="Номер счета"
												component={Fields.InputText}
												label="Номер счета"
												placeholder="Введите данные"
											/>
										</div>
										<div className="col-6 mb_30">
											<FastField
												name="Номер счета"
												component={Fields.InputText}
												label="Номер счета"
												placeholder="Введите данные"
											/>
										</div>
										<div className="col-12 mb_30">
											<FastField
												name="Адрес"
												component={Fields.InputText}
												label="Адрес"
												placeholder="Адрес"
											/>
										</div>
										<div className="col-6 mb_30">
											<FastField
												name="Директор"
												component={Fields.InputText}
												label="Директор"
												placeholder="Введите данные"
											/>
										</div>
										<div className="col-6 mb_30">
											<FastField
												name="Главный бухгалтер"
												component={Fields.InputText}
												label="Главный бухгалтер"
												placeholder="Введите данные"
											/>
										</div>
									</div>
								</div>
								<div className="col-6">
									<Typography
										Type="h3"
										text="Информация о подрядчике"
										className="mb_20"
									/>
									<div className="row">
										<div className="col-6 mb_30">
											<FastField
												name="Номер счета"
												component={Fields.Select}
												label="Номер счета"
												placeholder="Номер счета"
											/>
										</div>
										<div className="col-6 mb_30 d-flex align-items-center">
											<FastField
												name="Односторонний счет?"
												component={Fields.Switch}
												label={"Односторонний счет?"}
											/>
										</div>
										<div className="col-12 mb_30">
											<FastField
												name="Компания-партнер"
												component={Fields.InputText}
												label="Компания-партнер"
												placeholder="Введите данные"
											/>
										</div>
										<div className="col-6 mb_30">
											<FastField
												name="Номер счета"
												component={Fields.InputText}
												label="Номер счета"
												placeholder="Введите данные"
											/>
										</div>
										<div className="col-6 mb_30">
											<FastField
												name="МФО"
												component={Fields.InputText}
												label="МФО"
												placeholder="Введите данные"
											/>
										</div>
										<div className="col-12 mb_30">
											<FastField
												name="Адрес"
												component={Fields.InputText}
												label="Адрес"
												placeholder="Введите данные"
											/>
										</div>
										<div className="col-6 mb_30">
											<FastField
												name="Директор"
												component={Fields.InputText}
												label="Директор"
												placeholder="Введите данные"
											/>
										</div>
										<div className="col-6 mb_30">
											<FastField
												name="Главный бухгалтер"
												component={Fields.InputText}
												label="Главный бухгалтер"
												placeholder="Введите данные"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="wrapper">
							<div className="row g-4">
								<div className="col-12">
									<FastField
										name="file_id"
										component={FileUpload}
										className="mt_40"
										title="Загрузить excel"
									/>
								</div>
							</div>
						</div>

						<div className="wrapper">
							<div className="row g-4">
								<div className="col-6">
									<Typography Type="h2" text="Доверенность" />
								</div>

								<div className="col-6 mb_30">
									<FastField
										name="Выберите доверенность"
										component={Fields.Select}
										placeholder="Выберите доверенность"
									/>
								</div>
								<div className="col-3">
									<FastField
										name="Номер доверенности"
										component={Fields.InputText}
										label="Выберите доверенность"
										placeholder="Введите данные"
									/>
								</div>
								<div className="col-3">
									<FastField
										name="Дата доверенности"
										component={Fields.InputText}
										label="Дата доверенности"
										placeholder="Введите данные"
									/>
								</div>
								<div className="col-3">
									<FastField
										name="ИНН-type"
										component={Fields.InputText}
										label="ИНН"
										placeholder="Введите данные"
									/>
								</div>
								<div className="col-3">
									<FastField
										name="Ответственное лицо ФИО"
										component={Fields.InputText}
										label="Ответственное лицо ФИО"
										placeholder="Введите данные"
									/>
								</div>
							</div>
						</div>
						<div className="buttons d-flex align-items-center justify-content-between">
							<div className="d-flex">
								<Button
									design="pink"
									type="button"
									className="btn mt_20 mr_20 d-flex align-items-center justify-content-between"
									text="Отменить"
									prepend={<CloseIcon className="mr_10" />}
									isLoading={isSubmitting}
								/>
								<Button
									design="primary"
									type="button"
									className="btn mt_20 d-flex align-items-center justify-content-between"
									text="Показать документ"
									prepend={<CheckIcon className="mr_10" />}
									isLoading={isSubmitting}
								/>
							</div>
							<div className="d-flex">
								<Button
									design="primary"
									type="submit"
									className="btn mt_20 mr_20"
									text="Сохранить"
									isLoading={isSubmitting}
								/>
								<Button
									design="primary"
									type="button"
									className="btn mt_20"
									text="Подписать"
									isLoading={isSubmitting}
								/>
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};

export default CashboxOrder;
