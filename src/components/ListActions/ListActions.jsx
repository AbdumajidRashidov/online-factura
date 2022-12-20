import React from "react";
import { isFunction } from "lodash";

import { Button, Typography } from "components";

import "./ListActions.scss";

export const ListActions = ({
	addAction,
	addActionTooltip,
	addActionDisabled = () => {},
	isAddDisabled,
	removeAction,
	removeActionTooltip,
	removeActionDisabled = () => {},
	isRemoveDisabled,
}) => {
	return (
		<div className="list-actions">
			{isFunction(removeAction) && (
				<div className="list-actions__wrapper">
					<Button
						className="list-actions__btn list-actions__remove-btn "
						onClick={isRemoveDisabled ? removeActionDisabled : removeAction}
					/>

					<Typography
						Type="span"
						className="list-actions__tooltip"
						text={removeActionTooltip}
					/>
				</div>
			)}

			{isFunction(addAction) && (
				<div className="list-actions__wrapper mt_10">
					<Button
						className="list-actions__btn list-actions__add-btn"
						onClick={isAddDisabled ? addActionDisabled : addAction}
					/>
					<Typography
						Type="span"
						className="list-actions__tooltip "
						text={addActionTooltip}
					/>
				</div>
			)}
		</div>
	);
};
