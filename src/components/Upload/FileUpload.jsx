import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { serialize } from "object-to-formdata";
import { get } from "lodash";
import cn from "classnames";

import { httpClient, utils } from "services";

import { Button, Typography } from "components";
import { UploadBase } from "./UploadBase";

import { ReactComponent as UploadIcon } from "assets/icons/upload.svg";
import { ReactComponent as FileLoading } from "assets/icons/file-upload.svg";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";

export const FileUpload = ({
	title,
	subtitle = "",
	accept = ".png,.jpg,.jpeg,.xls,.doc,.pdf",
	isMultiple = false,
	className = "",
	form,
	field,
}) => {
	const [file, setFile] = useState(field.value);
	const [percentage, setPercentage] = useState("0%");
	const [status, setStatus] = useState("loading");

	useEffect(() => {
		setFile(field.value);
		setStatus((prev) => (field.value ? "success" : prev));
	}, [field.value]);

	const handleImageUpload = (event) => {
		setFile(event.target.files[0]);

		const files = serialize({ files: event.target.files });
		const config = {
			onUploadProgress: (event) => {
				const { loaded, total } = event;
				const percent = Math.floor((loaded * 100) / total);
				setPercentage(`${percent}%`);
			},
		};

		httpClient
			.post("/file", files, config)
			.then(({ data }) => {
				setStatus("success");
				form.setFieldValue(field.name, get(data, "0"));
			})
			.catch((error) => {
				setStatus("error");
				form.setFieldValue(field.name, null);
				setTimeout(() => {
					setFile(null);
				}, 2000);
			});
	};

	return (
		<UploadBase
			className={cn(file ? `file__zone file__zone_${status}` : "file-upload", className)}
			accept={accept}
			isMultiple={isMultiple}
			onFileUpload={handleImageUpload}
			isDisabled={file}
		>
			{file ? (
				<>
					<FileLoading />

					<div className="file__info px_30">
						<Typography
							Type="h5"
							className="file__zone-image mb_10"
							text={`${get(file, "name", "") || get(file, "title", "")}.${
								get(file, "mime_type", "").split("/")[1]
									? get(file, "mime_type", "").split("/")[1]
									: ""
							}`}
						/>
						<Typography
							Type="span"
							className="file__zone-size"
							text={utils.formatters.formatSize(get(file, "size"), "MB")}
						/>
						{status === "success" && (
							<Button
								onClick={(event) => {
									event.stopPropagation();
									setFile(null);
									form.setFieldValue(field.name, null);
								}}
								className="file__close"
								append={<CloseIcon />}
							/>
						)}
						{
							<div className="file__zone-loading mt_10">
								<div style={{ width: percentage }}></div>
							</div>
						}
					</div>
				</>
			) : (
				<>
					<UploadIcon className="mb_10" />
					<Typography
						Type="p"
						className="fw-600 fz_18 color_primary-green mb_10"
						text={title}
					/>
					<Typography
						Type="span"
						className="fw-600 fz_14 color_primary-green"
						text={subtitle}
					/>
				</>
			)}
		</UploadBase>
	);
};

FileUpload.propTypes = {
	title: PropTypes.string,
	accept: PropTypes.string,
	isMultiple: PropTypes.bool,
	getFile: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
