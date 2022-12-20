import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { Button, Typography } from "components";
import { Profile } from "./Profile";
import { Messages } from "./Messages";
import { Language } from "./Language";

import { ReactComponent as CashIcon } from "assets/icons/cashbg.svg";

export const Header = ({
	hasLogo,
	hasNotification,
	hasProfile,
	hasLanguage = true,
	children,
	style,
	containerClass = "",
}) => {
	return (
		<header className="header" style={style}>
			<div className={cn("container", containerClass)}>
				<div className="header__inner">
					{hasLogo && (
						<div className="header__logo">
							<img
								className="brand-logo"
								src={require("assets/images/sidebar-logo.png")}
								alt="logo"
							/>
						</div>
					)}
					<div>
						<Typography
							Type="h2"
							className="flex_max page-heading__title title_md"
							text={"YaTT SOBIROV JAMSHID DAVRON O‘G‘LI"}
						/>
						<Typography
							Type="p"
							className="flex_max page-heading__subtitle subtitle_md"
							text={"566800736"}
						/>
					</div>
					<div className="header__info d-flex align-items-center">
						<CashIcon className="mr_10" />
						<div>
							<Typography Type="p" text="Ваш баланс:" />
							<Typography
								className="color_primary-blue"
								Type="h4"
								text="150.000 сум"
							/>
						</div>
					</div>
					<Button
						className="btn"
						type="button"
						design="primary"
						text={"Активировать тариф"}
					/>
					<div className="d-flex align-items-center">
						{hasLanguage && <Language />}

						{hasNotification && <Messages notification={true} />}

						{hasProfile && <Profile />}
					</div>

					{children}
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	hasNotification: PropTypes.bool,
	hasProfile: PropTypes.bool,
	children: PropTypes.node,
};
