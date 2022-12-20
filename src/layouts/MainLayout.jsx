import React from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "./components";

export const MainLayout = () => {
	return (
		<>
			<Sidebar />
			<div className="page pl_280">
				<Header
					hasSearch={true}
					hasDatePicker={true}
					hasNotification={true}
					hasProfile={true}
					containerClass="max-width_full w_full px_0"
				/>

				<main className="main">
					<Outlet />
				</main>
			</div>
		</>
	);
};
