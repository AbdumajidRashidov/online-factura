import React from "react";
import PropTypes from "prop-types";

import "./RadioButton.scss";

export const RadioButton = ({ label, value, field }) => {
	return (
		<label className="radio text-select_none cursor_pointer">
			<div className="radio__label">
				<input className="radio__input" {...field} type="radio" value={value} />
				<span className="radio__checkmark">
					<span className="radio__checkmark-inner"></span>
				</span>
			</div>

			{label && <span className="control__text">{label}</span>}
		</label>
	);
};

RadioButton.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	field: PropTypes.object,
	form: PropTypes.object,
};
