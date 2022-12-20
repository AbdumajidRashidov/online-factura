import { lazy } from "react";

import "./styles/Auth.scss";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ConfirmPassword = lazy(() => import("./pages/ConfirmPassword"));
const NewPassword = lazy(() => import("./pages/NewPassword"));

export const AuthRoutes = [
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/forgot-password",
		element: <ForgotPassword />,
	},
	{
		path: "/confirm-password/:phone",
		element: <ConfirmPassword />,
	},
	{
		path: "/new-password",
		element: <NewPassword />,
	},
];
