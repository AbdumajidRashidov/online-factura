import React from "react";
import { Field } from "formik";
import { get } from "lodash";

import { utils } from "services";
import { useFetchOne, useGetLanguage } from "hooks";

import Containers from "containers";
import { ModalDefault, Fields, Button } from "components";

export const BillAmountModal = ({ isOpen, handleModalClose, cashboxShiftId }) => {
	const { getLanguageValue } = useGetLanguage();

	const cashboxShift = useFetchOne({
		url: `/cash-box-shift/${cashboxShiftId}`,
		urlSearchParams: {
			include: "bills.bill",
		},
		queryOptions: {
			enabled: !!isOpen,
		},
		refetchStatus: isOpen,
	});

	const calculateTotal = () => {
		return cashboxShift.data?.bills?.reduce((prev, curr) => {
			return (
				prev +
				utils.formatters.formatCurrencyApi(get(curr, "quantity")) *
					utils.formatters.formatCurrencyApi(get(curr, "bill.value"))
			);
		}, 0);
	};

	return (
		<ModalDefault
			innerClass="max-width_700"
			isOpen={isOpen}
			handleModalClose={handleModalClose}
			title="Купюры"
		>
			<Containers.Form shouldValidate={false}>
				{() => (
					<>
						<div className="row g-4">
							{cashboxShift.data?.bills?.map((item, index) => (
								<React.Fragment key={item.id}>
									<div className="col-6">
										<Field
											component={Fields.InputText}
											isDisabled={true}
											label="Купюра"
											value={getLanguageValue(get(item, "bill.name"))}
										/>
									</div>

									<div className="col-6">
										<Field
											component={Fields.InputNumber}
											isDisabled={true}
											label="Колличество"
											value={get(item, "quantity")}
										/>
									</div>
								</React.Fragment>
							))}

							<div className="col-12">
								<Field
									component={Fields.InputNumber}
									label="Сумма"
									value={calculateTotal()}
									isDisabled={true}
								/>
							</div>
						</div>

						<Button
							design="primary"
							type="button"
							className="btn modal-btn mt_40"
							text="Закрыть"
							onClick={handleModalClose}
						/>
					</>
				)}
			</Containers.Form>
		</ModalDefault>
	);
};
