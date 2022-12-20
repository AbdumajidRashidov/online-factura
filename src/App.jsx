import React from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import { storage } from "services";

import { useFetchOne } from "hooks";
import { auth, system } from "store/actions";
import { AuthorizedRoutes, UnAuthorizedRoutes } from "AppRoutes";

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useFetchOne({
		url: "/language",
		queryOptions: {
			onSuccess: (response) => dispatch(system.changeLanguages(response)),
		},
	});

	useFetchOne({
		url: "/user/2",
		queryOptions: {
			onSuccess: (user) => {
				dispatch(auth.success(user));
				storage.set("token", get(user, "token"));
			},
			onError: (error) => {
				dispatch(auth.failure(error));
				navigate("/login");
			},
		},
	});

	return (
		<>
			{storage.get("token") ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />}

			<ToastContainer className="app-toast" />
		</>
	);
};
