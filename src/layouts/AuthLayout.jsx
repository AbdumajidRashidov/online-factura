import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
	return (
		<div className="auth">
			<div className="auth__image">
				<img src={require("assets/images/login.png")} alt="" />
			</div>

			<div className="auth__content">
				<Outlet />
			</div>
		</div>
	);
};
