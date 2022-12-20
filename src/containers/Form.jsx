import React from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { isFunction, get } from "lodash";

import { httpClient, utils, queryBuilder } from "services";
import { useGetLanguage, useNotification } from "hooks";

export const FormContainer = ({
	url,
	params,
	method = "post",
	children,
	isFormData = false,
	fields = [],
	normalizeData,
	axiosConfig = {},
	onSuccess = () => {},
	onError = () => {},
	onFinal = () => {},
	onSubmit,
	shouldValidate = true,
	...formProps
}) => {
	const { languages } = useGetLanguage();
	const notifier = useNotification();

	const { initialValues, validationSchema } = utils.formHelpers.createFormSchema(
		fields,
		languages
	);

	const handleSubmit = (values, formHelpers) => {
		const formValues = utils.formHelpers.getFormValues(
			values,
			fields,
			isFormData,
			normalizeData,
			languages
		);

		const requestUrl = params ? queryBuilder(url, params) : url;

		httpClient[method](requestUrl, formValues, axiosConfig)
			.then(({ data }) => {
				formHelpers.resetForm();
				onSuccess(data, formHelpers);
				notifier.success("Действие успешно завершено");
			})

			.catch((error) => {
				formHelpers.setErrors(get(error, "response.data.errors"));
				onError(error, formHelpers);

				notifier.error(utils.formHelpers.gerErrorMessage(error));
			})

			.finally(() => {
				formHelpers.setSubmitting(false);
				onFinal();
			});
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={shouldValidate ? validationSchema : false}
			onSubmit={
				isFunction(onSubmit)
					? (values) => onSubmit(utils.formHelpers.getFormValues(values, fields))
					: handleSubmit
			}
			enableReinitialize={true}
		>
			{(formik) => <Form {...formProps}>{children(formik)}</Form>}
		</Formik>
	);
};

FormContainer.propTypes = {
	url: PropTypes.string,
	method: PropTypes.oneOf(["post", "put"]),
	children: PropTypes.func,
	isFormData: PropTypes.bool,
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.any,
			validationType: PropTypes.string,
			validations: PropTypes.array,
			lazy: PropTypes.func,
			submitKey: PropTypes.string,
			onSubmitValue: PropTypes.func,
			isLanguageSchema: PropTypes.bool,
		})
	),
	axiosConfig: PropTypes.object,
	normalizeData: PropTypes.func,
	onSuccess: PropTypes.func,
	onError: PropTypes.func,
	onFinal: PropTypes.func,
};

/*

    yupValidation = string | number | boolean | date | object | array

    Field Object Structure
        name: String,
        value: Any,
        validationType: yupValidation,
        validations: [{type: yupValidation, params: Any}]
        onSubmitKey: String
        onSubmitValue: Function

*/
