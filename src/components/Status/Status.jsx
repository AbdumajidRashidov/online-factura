import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import "./Status.scss";

export const Status = ({ message, type, className, ...divProps }) => {
	const { t } = useTranslation();

	return (
		<div className={cn(className, "status", `status_${type}`)} {...divProps}>
			{t(message)}
		</div>
	);
};

Status.propTypes = {
	message: PropTypes.string,
	type: PropTypes.oneOf(["success", "warning", "danger"]),
};
