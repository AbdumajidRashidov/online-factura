import { get, isEmpty } from "lodash";

import { constants, time } from "services";

const sizeModifiers = {
	KILO: 1024,
	MEGA: 1048576,
};

const formatPhoneApi = (phone) => {
	const formattedPhone = String(phone).replace(/\(|\)|_|-|\s*/gi, "");

	return formattedPhone[0] !== "+" ? `+${formattedPhone}` : formattedPhone;
};
const formatPhoneView = (phone) => {
	if (!phone) return "";

	const formattedPhone = [];

	String(phone)
		.split("")
		.forEach((char, index) => {
			if (index === 4) formattedPhone[index] = ` (${char}`;
			else if (index === 5) formattedPhone[index] = `${char}) `;
			else if (index === 8) formattedPhone[index] = `${char}-`;
			else if (index === 10) formattedPhone[index] = `${char}-`;
			else formattedPhone[index] = char;
		});

	return formattedPhone.join("");
};

const formatCurrencyApi = (currency) => {
	if (!currency) return 0;
	return parseInt(String(currency).replace(/\s*/g, ""));
};
const formatCurrencyView = (currency, separator = " ") => {
	if (!currency) return 0;
	return String(currency).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

const formatSize = (size, measure) => {
	if (!size) return "";

	switch (measure) {
		case "MB":
			return `${(size / sizeModifiers.MEGA).toFixed(4)} MB`;
		case "KB":
			return `${(size / sizeModifiers.KILO).toFixed(4)} KB`;
		default:
			break;
	}
};

const formatFileSize = (bayt) => {
	let kb;
	if (bayt / 1024 < 1000) {
		kb = (bayt / 1024).toFixed(2);
		return `${kb} KB`;
	}
	return `${(bayt / 1024 / 1024).toFixed(2)} MB`;
};

const showGender = (genderType) =>
	constants.gender.find((item) => item.value === genderType)?.label;
const getGender = (genderType) => constants.gender.find((item) => item.value === genderType);

const showDay = (dayType) => constants.days.find((item) => item.value === dayType)?.label;
const getDay = (dayType) => constants.days.find((item) => item.value === dayType);

const showFoodTime = (foodTimeType) =>
	constants.foodTime.find((item) => item.value === foodTimeType)?.label;
const getFoodTime = (foodTimeType) =>
	constants.foodTime.find((item) => item.value === foodTimeType);

const showFoodType = (foodType) =>
	constants.foodTypes.find((item) => item.value === foodType)?.label;
const getFoodType = (foodType) => constants.foodTypes.find((item) => item.value === foodType);

const showFoodWhom = (foodWhomType) =>
	constants.foodWhom.find((item) => item.value === foodWhomType)?.label;
const getFoodWhom = (foodWhomType) =>
	constants.foodWhom.find((item) => item.value === foodWhomType);

const showDegree = (degreeType) =>
	constants.degreeTypes.find((item) => item.value === degreeType)?.label;

const getDegree = (degreeType) => constants.degreeTypes.find((item) => item.value === degreeType);

const showStoreType = (storeType) =>
	constants.storeTypes.find((item) => item.value === storeType)?.label;

const getStoreType = (storeType) => constants.storeTypes.find((item) => item.value === storeType);

const showCardType = (cardType) =>
	constants.cardTypes.find((item) => item.value === cardType)?.label;

const getCardType = (cardType) => constants.cardTypes.find((item) => item.value === cardType);

const showPaymentType = (paymentType) =>
	constants.paymentTypes.find((item) => item.value === paymentType)?.label;

const getPaymentType = (paymentType) =>
	constants.paymentTypes.find((item) => item.value === paymentType);

const showCashboxStatus = (status) =>
	constants.cashboxStatus.find((item) => item.value === status)?.label;

const getCashboxStatus = (status) => constants.cashboxStatus.find((item) => item.value === status);

const showRequestStatus = (status) =>
	constants.requestStatus.find((item) => item.value === status)?.label;

const getRequestStatus = (status) => constants.requestStatus.find((item) => item.value === status);

const getCashboxStatusType = (status) => {
	if (status === constants.CASHBOX_SHIFT_STATUS_PENDING) return "warning";
	else if (status === constants.CASHBOX_SHIFT_STATUS_APPROVED) return "success";
	else if (status === constants.CASHBOX_SHIFT_STATUS_CANCELED) return "danger";
	else return "success";
};

const getOrderStatus = (orderStatus) => {
	if (
		orderStatus === constants.ORDER_STATUS_CANCELED_BY_MANAGEMENT ||
		orderStatus === constants.ORDER_STATUS_CANCELED_BY_CASH_BOX ||
		orderStatus === constants.ORDER_STATUS_CANCELED_BY_SUPPLY ||
		orderStatus === constants.ORDER_STATUS_CANCELED_BY_STOCK
	)
		return "danger";
	else if (orderStatus === constants.ORDER_STATUS_APPROVED_BY_STOCK) return "success";
	else return "warning";
};

const showOrderStatus = (orderStatus) => {
	if (
		orderStatus === constants.ORDER_STATUS_CANCELED_BY_MANAGEMENT ||
		orderStatus === constants.ORDER_STATUS_CANCELED_BY_CASH_BOX ||
		orderStatus === constants.ORDER_STATUS_CANCELED_BY_SUPPLY ||
		orderStatus === constants.ORDER_STATUS_CANCELED_BY_STOCK
	)
		return "Canceled";
	else if (orderStatus === constants.ORDER_STATUS_CREATED) return "Pending in management";
	else if (orderStatus === constants.ORDER_STATUS_APPROVED_BY_MANAGEMENT)
		return "Pending in cashbox";
	else if (orderStatus === constants.ORDER_STATUS_APPROVED_BY_CASH_BOX)
		return "Pending in supply";
	else if (orderStatus === constants.ORDER_STATUS_APPROVED_BY_SUPPLY) return "Pending in store";
	else if (orderStatus === constants.ORDER_STATUS_APPROVED_BY_STOCK) return "Done";
	else return "Pending";
};

const menuName = (menuKey) => {
	switch (menuKey) {
		case "cashbox":
			return "Касса";
		case "stock":
			return "Склад";
		case "supply":
			return "Снабжение";
		case "kitchen":
			return "Кухня";
		case "inventory":
			return "Инвентарь";
		case "settings":
			return "Настройки";
		case "management":
			return "Управление";
		case "hr":
			return "Сотрудники";
		default:
			return "";
	}
};

const getRange = (range = []) => {
	if (isEmpty(range)) return {};

	return {
		start_at: time.toTimestamp(range[0]),
		end_at: time.toTimestamp(range[1]),
	};
};

const showUserFullName = (user) =>
	`${get(user, "userDetail.first_name", "")} ${get(user, "userDetail.last_name", "")}`;

const getDayType = (dayType) => constants.expiredDates.find((item) => item.value === dayType);

const day = 86400;
const month = 2628000;
const year = 31556952;
const parseInterval = (timestamp) => {
	if (Math.floor(timestamp / year) > 0) {
		return { count: Math.ceil(timestamp / year), type: getDayType(constants.TYPE_YEAR) };
	} else if (Math.floor(timestamp / month) > 0)
		return { count: Math.ceil(timestamp / month), type: getDayType(constants.TYPE_MONTH) };
	else if (Math.floor(timestamp / day) > 0)
		return { count: Math.ceil(timestamp / day), type: getDayType(constants.TYPE_DAY) };
	else return "";
};
const getDate = (timestamp) => {
	const date = new Date(timestamp * 1000);
	const day = `${date.getDate()}`;
	const year = `${date.getFullYear()}`;
	const month = `${date.getMonth()}`;

	const formattedDate = `${day}.${month}.${year}`;

	return formattedDate;
};

const showIntervalLabel = (timestamp) => {
	const interval = parseInterval(timestamp);
	return `${get(interval, "count", "")} ${get(interval, "type.label", "")}`;
};

const getTimeStamp = (str) => {
	const date = new Date(str);
	return Math.floor(date / 1000);
};

export const formatters = {
	showIntervalLabel,
	parseInterval,
	formatPhoneApi,
	formatPhoneView,
	formatSize,
	formatCurrencyApi,
	formatCurrencyView,
	showGender,
	getGender,
	showDay,
	getDay,
	showFoodTime,
	getFoodTime,
	showFoodWhom,
	getFoodWhom,
	showOrderStatus,
	getOrderStatus,
	menuName,
	showDegree,
	getDegree,
	getRange,
	showStoreType,
	getStoreType,
	showCashboxStatus,
	getCashboxStatus,
	getCashboxStatusType,
	showUserFullName,
	showCardType,
	getCardType,
	showFoodType,
	getFoodType,
	getPaymentType,
	showPaymentType,
	getDate,
	formatFileSize,
	getTimeStamp,
	showRequestStatus,
	getRequestStatus,
};
