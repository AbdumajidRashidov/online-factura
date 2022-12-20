import React, { useEffect, useState } from "react";
import { FastField } from "formik";
import { get } from "lodash";

import config from "config";

import Containers from "containers";
import { ModalDefault, Fields, Button, TabBase } from "components/index";

export const StoreModal = ({
	storeType,
	isOpen,
	handleModalClose,
	onSuccess,
	isUpdate,
	values,
}) => {
	const [tabLng, setTabLng] = useState("uz");

	useEffect(() => {
		setTabLng("uz");
	}, [isOpen]);

	return (
		<ModalDefault
			innerClass="max-width_500"
			isOpen={isOpen}
			handleModalClose={handleModalClose}
			title={isUpdate ? "Обновить склад" : "Создать склад"}
		>
			<Containers.Form
				url={isUpdate ? `/stock/${get(values, "id")}` : "/stock"}
				method={isUpdate ? "put" : "post"}
				onSuccess={onSuccess}
				fields={[
					{
						name: "title",
						validationType: "object",
						isLanguageSchema: true,
						value: get(values, "title"),
					},
					// {
					// 	name: "icon_id",
					// 	validationType: "object",
					// 	value: get(values, "file"),
					// 	onSubmitValue: (value) => get(value, "id"),
					// },
					{
						name: "type",
						value: storeType,
					},
				]}
			>
				{({ isSubmitting }) => (
					<>
						<TabBase
							className="mb_30"
							labels={config.languages}
							currentLabel={tabLng}
							onPaneChange={(active, event) => setTabLng(active)}
						/>

						<div className="row g-4">
							<div className="col-12">
								<FastField
									name={`title.${tabLng}`}
									component={Fields.InputText}
									label={`Название ${tabLng}`}
									placeholder={`Название ${tabLng}`}
								/>
							</div>

							{/*<div className="col-12">*/}
							{/*	<FastField*/}
							{/*		name="icon_id"*/}
							{/*		component={FileUpload}*/}
							{/*		title="Иконка"*/}
							{/*		accept=".svg"*/}
							{/*	/>*/}
							{/*</div>*/}
						</div>

						<Button
							design="primary"
							type="submit"
							className="btn modal-btn w_full mt_40"
							text="Сохранить"
							isLoading={isSubmitting}
						/>
					</>
				)}
			</Containers.Form>
		</ModalDefault>
	);
};
