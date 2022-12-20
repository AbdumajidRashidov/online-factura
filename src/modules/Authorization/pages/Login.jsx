import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FastField } from "formik";
import { get } from "lodash";

import { storage } from "services";
import { auth } from "store/actions";

import Containers from "containers";
import { Fields, Typography, InputPassword, Button, AppLink } from "components";

import { ReactComponent as UserIcon } from "assets/icons/user.svg";
import { ReactComponent as PhoneIcon } from "assets/icons/phone.svg";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<>
			<div className="auth__heading mb_30">
				<Typography Type="h1" className="auth__title" text="Войти" />
				<Typography
					Type="p"
					className="auth__subtitle"
					text="Заполните форму ниже, чтобы Войти"
				/>
			</div>

			<Containers.Form
				url="/login"
				className="row g-3"
				onSuccess={(user) => {
					console.log(user);
					dispatch(auth.success(get(user, "token")));
					storage.set("token", get(user, "token"));
					navigate("/");
				}}
				fields={[
					{
						name: "email",
						validations: [{ type: "typeError" }, { type: "required" }],
						value: "eve.holt@reqres.in",
					},
					{
						name: "password",
						validations: [{ type: "typeError" }, { type: "required" }],
					},
				]}
			>
				{({ isSubmitting }) => (
					<>
						<div className="col-12">
							<FastField
								name="email"
								component={Fields.InputText}
								placeholder="Имя пользователя"
								value={"eve.holt@reqres.in"}
								prepend={<UserIcon />}
								disabled
							/>
						</div>

						<div className="col-12 mb_30">
							<FastField
								name="password"
								component={InputPassword}
								placeholder="Пароль"
								prepend={<PhoneIcon />}
							/>
						</div>

						<div className="col-12 mb_30 text-align_right">
							<AppLink
								link="/forgot-password"
								className="color_brand-blue text-decoration_underline"
								text="Забыли свой пароль?"
							/>
						</div>

						<div className="col-12 mb_15">
							<Button
								className="btn w_full"
								design="primary"
								type="submit"
								text="Вход"
								isLoading={isSubmitting}
							/>
						</div>
					</>
				)}
			</Containers.Form>

			<Typography Type="p" className="text-align_center control__text">
				{() => (
					<>
						Нет аккаунта?{" "}
						<AppLink
							link="/register"
							className="color_brand-blue"
							text="Зарегистрироваться"
						/>
					</>
				)}
			</Typography>
		</>
	);
};

export default Login;
