import React from "react";
import cn from "classnames";
import { PatternFormat } from "react-number-format";
import { isFunction } from "lodash";

import { Button } from "components";

import { ReactComponent as DropDownArrow } from "assets/icons/drop-down-arrow-small.svg";
import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg";
import { ReactComponent as ClearIcon } from "assets/icons/close.svg";

export const DateInput = ({
	openCalendar,
	value,
	handleValueChange,
	prepend,
	className,
	isDisabled,
	placeholder,
	isOpen,
	onClear,
	format = "##.##.####",
	isIcon = true,
}) => {
	return (
		<label
			className={cn("control__wrapper", className, { cursor_disabled: isDisabled })}
			onClick={openCalendar}
		>
			{isIcon && prepend && <CalendarIcon stroke="var(--main-black)" />}
			<PatternFormat
				format={format}
				mask=""
				placeholder={placeholder}
				value={value.toString()}
				className="control__input"
				disabled={isDisabled}
				onChange={handleValueChange}
			/>

			{isFunction(onClear) && (
				<Button
					className="mr_5"
					style={{ height: "15px" }}
					append={<ClearIcon width="15" height="15" strokeWidth="4" />}
					onClick={(event) => {
						event.stopPropagation();
						onClear();
					}}
				/>
			)}

			<DropDownArrow
				className={cn("transition-default", {
					rotate_180: isOpen,
				})}
			/>
		</label>
	);
};
