import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { get, isFunction } from "lodash";
import { serialize } from "object-to-formdata";

import { httpClient } from "services";

import { UploadBase } from "./UploadBase";

import "./Upload.scss";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";
import { ReactComponent as UploadIcon } from "assets/icons/upload.svg";

import { Typography } from "components/Typography/Typography";
import { Button } from "components/Button/Button";

export const ImageUpload = ({
	className = "",
	title = "Загрузить Фото",
	getImage,
	form,
	field,
	accept,
}) => {
	const [imgSrc, setImgSrc] = useState();
	const [status, setStatus] = useState("loading");

	const handleImageUpload = (event) => {
		const image = serialize({ files: event.target.files });

		httpClient.post("/file", image).then(({ data }) => {
			setImgSrc(get(data, "0.thumbnails.medium"));
			setStatus("success");
			form.setFieldValue(
				field.name,
				isFunction(getImage) ? getImage(data) : get(data, getImage)
			);
		});
	};

	return (
		<div className={cn("img-upload", className)}>
			<UploadBase
				accept={`.png,.jpeg,.jpg,${accept}`}
				className="img-upload__btn"
				onFileUpload={handleImageUpload}
			>
				{!imgSrc ? (
					<>
						<UploadIcon className="mb_10" />
						<Typography
							Type="p"
							className="fw-600 fz_18 color_primary-green mb_10"
							text={title}
						/>
					</>
				) : (
					<div className="img-upload__inner">
						{status === "success" && (
							<Button
								onClick={(event) => {
									event.stopPropagation();
									setImgSrc(null);
									form.setFieldValue(field.name, null);
								}}
								className="file__close"
								append={<CloseIcon />}
							/>
						)}
						<img src={imgSrc} alt="" />
					</div>
				)}
			</UploadBase>
		</div>
	);
};

ImageUpload.propTypes = {
	src: PropTypes.string,
	className: PropTypes.string,
	getImage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
