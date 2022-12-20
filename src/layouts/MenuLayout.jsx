import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./components";

export const MenuLayout = () => {
	return (
		<>
			<div className="page">
				<Header
					hasLogo={true}
					hasNotification={true}
					hasProfile={true}
					style={{ padding: 0 }}
				/>

				<div className="flex_max container">
					<main className="py_40">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};
