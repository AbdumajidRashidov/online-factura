import React from "react";
import { useLocation } from "react-router-dom";

import { AppLink } from "components";
import { SubMenu } from "./SubMenu";

import { menu } from "../helpers/menu";

export const Sidebar = () => {
	const { pathname } = useLocation();
	const menuKey = pathname.split("/")[0];

	return (
		<aside className="sidebar">
			<AppLink
				link="/"
				append={
					<img
						src={require("assets/images/sidebar-logo.png")}
						className="sidebar__logo brand-logo"
						alt="Logo"
					/>
				}
			/>

			{menu[menuKey]?.map((menu, index) =>
				menu.submenu ? (
					<SubMenu key={menu.id} menu={menu} />
				) : (
					<AppLink
						key={menu.id}
						className="sidebar__link"
						link={menu.link}
						prepend={menu.icon}
						text={menu.label}
						activeClass="sidebar__link_active"
					/>
				)
			)}
		</aside>
	);
};
