import React from "react";
import { isFunction } from "lodash";

import { Button } from "components";
import { Breadcrumb, Statistics } from "./components";

import "./PageHeading.scss";

export const PageHeading = ({ links, btnText, mainAction, statistics }) => {
	return (
		<div className="page-heading">
			<div className="page-heading__inner">
				<Breadcrumb links={links} />

				{isFunction(mainAction) && (
					<Button
						className="btn page-heading__btn"
						design="primary"
						text={btnText}
						onClick={mainAction}
					/>
				)}
			</div>

			<Statistics statistics={statistics} />
		</div>
	);
};
