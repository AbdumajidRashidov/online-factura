import React from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";

import { userSelector } from "store/selectors";
import { useOverlay } from "hooks";

import { Button, ModalDefault } from "components";
import { ProductIncomeModal } from "./ProductIncomeModal";

export const StoreProductModal = ({
	isOpen,
	handleModalClose,
	onAddedNewRecord,
	storeId,
	storeType,
	categorySlug,
}) => {
	const incomeManual = useOverlay({ uniqueName: "productIncomeManual" });
	const incomeExcel = useOverlay({ uniqueName: "productIncomeExcel" });

	const user = useSelector(userSelector);

	return (
		<>
			<ModalDefault
				isOpen={isOpen}
				handleModalClose={handleModalClose}
				title="Загрузить приход"
				innerClass="max-width_500"
			>
				<Button
					design="grey"
					className="upload-data w_full mb_20"
					text="От Med Plus (Вручную)"
					onClick={(event) => {
						handleModalClose(event);
						incomeManual.handleOverlayOpen(event);
					}}
				/>
				<Button
					design="grey"
					className="upload-data w_full px-40"
					text="От Med Plus (Excel)"
					onClick={(event) => {
						handleModalClose(event);
						incomeExcel.handleOverlayOpen();
					}}
				/>
			</ModalDefault>

			<ProductIncomeModal
				isOpen={incomeManual.isOverlayOpen}
				handleModalOpen={incomeManual.handleOverlayOpen}
				handleModalClose={incomeManual.handleOverlayClose}
				username={get(user, "username")}
				storeId={storeId}
				onSuccess={onAddedNewRecord}
				storeType={storeType}
				categorySlug={categorySlug}
			/>
		</>
	);
};
