import React from "react";
import { NumericFormat } from "react-number-format";
import SelectComponent from "react-select";
import cn from "classnames";
import { get, isFunction } from "lodash";

import { ControlLabel } from "components/Common";
import { DropdownIndicator } from "components/Fields/Select/components";
import { constants } from "services";

export const ExpireField = ({
	value,
	label,
	size = "sm",
	onCountChange,
	onTypeChange,
	outerClass,
	isDisabled,
	innerClass,
}) => {
	return (
		<div
			className={cn("control", `control_${size}`, outerClass, {
				control_disabled: isDisabled,
			})}
		>
			<ControlLabel label={label} />

			<div className="d_flex">
				<label className={cn("control__wrapper expire__field", innerClass)}>
					<NumericFormat
						value={get(value, "count", "")}
						onChange={(event) => {
							isFunction(onCountChange) && onCountChange(event.target.value);
						}}
						type="text"
						disabled={isDisabled}
						thousandSeparator=" "
						allowNegative={false}
						allowLeadingZeros={false}
						allowedDecimalSeparators={[",", " "]}
						className="control__input"
						placeholder="0"
					/>
				</label>

				<SelectComponent
					value={get(value, "type", "")}
					className="expire__select"
					placeholder="Срок"
					getOptionLabel={(option) => get(option, "label")}
					getOptionValue={(option) => get(option, "value")}
					classNamePrefix="select"
					options={constants.expiredDates}
					onChange={(option, action) => {
						isFunction(onTypeChange) && onTypeChange(option);
					}}
					backspaceRemovesValue={true}
					components={{
						DropdownIndicator,
					}}
					styles={{
						dropdownIndicator: (provided, value) => ({
							...provided,
							transition: ".1s linear",
							transform: value.selectProps.menuIsOpen
								? "rotate(-180deg)"
								: "rotate(0)",
						}),
					}}
				/>
			</div>
		</div>
	);
};
