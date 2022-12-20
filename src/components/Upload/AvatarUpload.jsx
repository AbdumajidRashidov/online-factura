import React, { useEffect, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { get, isFunction } from "lodash";
import { serialize } from "object-to-formdata";

import { httpClient } from "services";

import { UploadBase } from "./UploadBase";

import "./Upload.scss";
import UserDefault from "assets/images/user-default.png";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";

export const AvatarUpload = ({ src = UserDefault, className = "", getImage, form, field }) => {
	const [imgSrc, setImgSrc] = useState(src);

	useEffect(() => {
		setImgSrc(src);
	}, [src]);

	const handleImageUpload = (event) => {
		const image = serialize({ files: event.target.files });

		httpClient.post("/file", image).then(({ data }) => {
			setImgSrc(get(data, "0.thumbnails.medium"));
			form.setFieldValue(
				field.name,
				isFunction(getImage) ? getImage(data) : get(data, getImage)
			);
		});
	};

	return (
		<div className={cn("avatar-upload", className)}>
			<div className="avatar-upload__inner">
				<img src={imgSrc} alt="" />
			</div>

			<UploadBase
				accept=".png,.jpeg,.jpg"
				className="avatar-upload__btn"
				onFileUpload={handleImageUpload}
			>
				<EditIcon />
			</UploadBase>
		</div>
	);
};

AvatarUpload.propTypes = {
	src: PropTypes.string,
	className: PropTypes.string,
	getImage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
