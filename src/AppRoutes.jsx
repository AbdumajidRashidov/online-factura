import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { constants } from "services";

import { MainLayout, AuthLayout } from "layouts";
import { Spinner } from "components";
import { AuthRoutes, CashboxRoutes } from "modules";

import { Links } from "LINKS";

const appRoutes = [
	{
		path: "/",
		layout: <AuthLayout />,
		subRoutes: [...AuthRoutes],
		access: constants.UNAUTHORIZED,
	},
	{
		path: "/",
		layout: <MainLayout />,
		subRoutes: [...CashboxRoutes],
		access: constants.AUTHORIZED,
	},
];

const AllRoutes = ({ routes }) => (
	<Routes>
		{routes.map((route, index) => (
			<React.Fragment key={index}>
				{route.layout ? (
					<Route path={route.path} element={route.layout}>
						{route.subRoutes.map((subRoute, innerIndex) => (
							<Route
								key={innerIndex}
								{...subRoute}
								element={
									<Suspense fallback={<Spinner />}>{subRoute.element}</Suspense>
								}
							/>
						))}
						{/*<Route path="*" element={<Navigate to="/" />} />*/}
					</Route>
				) : (
					<Route {...route} />
				)}
			</React.Fragment>
		))}

		<Route path="/links" element={<Links />} />
	</Routes>
);

const authorizedRoutes = appRoutes.filter((item) => item.access === constants.AUTHORIZED);
export const AuthorizedRoutes = () => <AllRoutes routes={authorizedRoutes} />;

const unAuthorizedRoutes = appRoutes.filter((item) => item.access === constants.UNAUTHORIZED);
export const UnAuthorizedRoutes = () => <AllRoutes routes={unAuthorizedRoutes} />;
