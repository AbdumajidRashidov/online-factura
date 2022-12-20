import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FastField } from "formik";
import { get } from "lodash";

import Container from "containers";
import { Fields, Typography, InputPassword, Button, AppLink } from "components";
import { PasswordSendModal } from "../components/PasswordSendModal";

import { ReactComponent as UserIcon } from "assets/icons/user.svg";
import { ReactComponent as PhoneIcon } from "assets/icons/phone.svg";
import { useOverlay } from "hooks";
import { storage } from "services";
import { useDispatch } from "react-redux";
import { auth } from "store/actions";

const Register = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const dispatch = useDispatch();

	const codeSentModal = useOverlay({
		uniqueName: "codeSent",
		onClose: () => navigate("/cashbox/create", { state: { fromRegister: true } }),
	});

	return (
		<>
			<PasswordSendModal
				isOpen={codeSentModal.isOverlayOpen}
				handleModalClose={codeSentModal.handleOverlayClose}
			/>

			<div className="auth__heading mb_30">
				<Typography Type="h1" className="auth__title" text="Регистрация" />
				<Typography
					Type="p"
					className="auth__subtitle"
					text="Заполните форму ниже, чтобы зарегистрироваться."
				/>
			</div>

			<Container.Form
				url="/register"
				className="row g-3"
				onSuccess={(user) => {
					const fromRegister = get(state, "fromRegister");
					fromRegister && dispatch(auth.success(get(user, "data")));
					storage.set("token", get(user, "token"));
					codeSentModal.handleOverlayOpen();
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
								placeholder="email"
								value={"eve.holt@reqres.in"}
								prepend={<UserIcon />}
								disabled
							/>
						</div>

						<div className="col-12">
							<FastField
								name="password"
								component={InputPassword}
								placeholder="Пароль"
								prepend={<PhoneIcon />}
							/>
						</div>

						<div className="col-12 mb_30">
							<FastField
								name="terms"
								component={Fields.CheckBox}
								label={
									<>
										"Регистрируясь, вы соглашаетесь с нашими условиями в
										отношении нашей{" "}
										<a className="color_brand-blue" href="#">
											политики конфиденциальности
										</a>
										.
									</>
								}
							/>
						</div>

						<div className="col-12 mb_15">
							<Button
								className="btn w_full"
								design="primary"
								type="submit"
								text="Регистрация"
								isLoading={isSubmitting}
							/>
						</div>
					</>
				)}
			</Container.Form>

			<Typography Type="p" className="text-align_center control__text">
				{() => (
					<>
						Вы уже зарегистрированы?{" "}
						<AppLink link="/login" className="color_brand-blue" text="Войти" />
					</>
				)}
			</Typography>
		</>
	);
};

export default Register;
