export const constants = {
	KEYCODE_TAB: 9,
	KEYCODE_ESC: 27,

	AUTHORIZED: "authorized",
	UNAUTHORIZED: "unauthorized",

	CASHBOX_SHIFT_STATUS_PENDING: 0,
	CASHBOX_SHIFT_STATUS_APPROVED: 1,
	CASHBOX_SHIFT_STATUS_CANCELED: -1,

	REQUEST_STATUS_PENDING: 1,
	REQUEST_STATUS_APPROVED: 2,
	REQUEST_STATUS_CANCELED: 0,

	CASHBOX_SHIFT_TYPE_OPEN: 1,
	CASHBOX_SHIFT_TYPE_CLOSE: 2,

	STEP_REGISTRATION_STARTED: 1,
	STEP_PHONE_CONFIRMED: 2,
	STEP_REGISTRATION_END: 3,

	TYPE_MALE: 1,
	TYPE_FEMALE: 2,

	DAY_MONDAY: 1,
	DAY_TUESDAY: 2,
	DAY_WEDNESDAY: 3,
	DAY_THURSDAY: 4,
	DAY_FRIDAY: 5,
	DAY_SATURDAY: 6,
	DAY_SUNDAY: 7,

	BREAKFAST: 1,
	LAUNCH: 2,
	DINNER: 3,

	TYPE_EMPLOYEE: 1,
	TYPE_PATIENT: 2,

	STORE_KITCHEN: 1,
	STORE_INVENTORY: 2,
	STORE_DRUG: 3,

	ORDER_STATUS_CREATED: 0,
	ORDER_STATUS_APPROVED_BY_MANAGEMENT: 1,
	ORDER_STATUS_CANCELED_BY_MANAGEMENT: -1,
	ORDER_STATUS_APPROVED_BY_CASH_BOX: 2,
	ORDER_STATUS_CANCELED_BY_CASH_BOX: -2,
	ORDER_STATUS_APPROVED_BY_SUPPLY: 3,
	ORDER_STATUS_CANCELED_BY_SUPPLY: -3,
	ORDER_STATUS_APPROVED_BY_STOCK: 4,
	ORDER_STATUS_CANCELED_BY_STOCK: -4,

	DEGREE_OFFICIAL: 1,
	DEGREE_NOT_OFFICIAL: 2,

	ORDER_TYPE_KITCHEN: 1,
	ORDER_TYPE_INVENTORY: 2,
	ORDER_TYPE_DRUG: 3,
	ORDER_TYPE_SUPPLY: 4,

	passportRegExp: /^[A-Z]{0,2}[0-9]{0,7}$/g,

	SLUG_LOCATION: "location",
	SLUG_MEASURE: "measure",
	SLUG_FOOD: "food",
	SLUG_PRODUCT: "product",
	SLUG_DRUG: "drug",
	SLUG_INVENTORY: "inventory",
	SLUG_TRANSACTION: "transaction",
	SLUG_SUPPLY: "supply",

	CARD_TYPE_HOSPITAL: 1,
	CARD_TYPE_AMBULATORY: 2,
	CARD_TYPE_REANIMATION: 3,

	CATEGORY_TYPE_MEASURE: 1,
	CATEGORY_TYPE_FOOD: 2,
	CATEGORY_TYPE_PRODUCT: 3,
	CATEGORY_TYPE_DRUG: 4,
	CATEGORY_TYPE_INVENTORY: 5,
	CATEGORY_TYPE_LOCATION: 6,
	CATEGORY_TYPE_CASH_BOX: 7,

	FOOD_TYPE_MAIN: 1,
	FOOD_TYPE_ADDITIONAL: 2,
	FOOD_TYPE_DRINK: 3,
	FOOD_TYPE_SALAD: 4,
	FOOD_TYPE_BREAD: 5,

	TRANSACTION_TYPE_COMING: 1,
	TRANSACTION_TYPE_CONSUMPTION: 2,
	TRANSACTION_TYPE_COLLECTION: 3,
	TRANSACTION_TYPE_ON_OPEN: 4,
	TRANSACTION_TYPE_ON_CLOSE: 5,

	TYPE_DAY: 1,
	TYPE_MONTH: 2,
	TYPE_YEAR: 3,

	TYPE_CASH: 1,
	TYPE_E_CASH: 2,
	TYPE_COMPANY_ACCOUNT: 3,
};

constants.paymentTypes = [
	{
		label: "Cash",
		value: constants.TYPE_CASH,
	},
	{
		label: "ECash",
		value: constants.TYPE_E_CASH,
	},
	{
		label: "Company Account",
		value: constants.TYPE_COMPANY_ACCOUNT,
	},
];

constants.expiredDates = [
	{
		label: "Day",
		value: constants.TYPE_DAY,
	},
	{
		label: "Month",
		value: constants.TYPE_MONTH,
	},
	{
		label: "Year",
		value: constants.TYPE_YEAR,
	},
];

constants.foodTypes = [
	{
		label: "Main food",
		value: constants.FOOD_TYPE_MAIN,
	},
	{
		label: "Drink",
		value: constants.FOOD_TYPE_DRINK,
	},
	{
		label: "Salad",
		value: constants.FOOD_TYPE_SALAD,
	},
	{
		label: "Bread",
		value: constants.FOOD_TYPE_BREAD,
	},
];

constants.approveWhom = [
	{
		label: "Cashbox",
		value: constants.ORDER_STATUS_APPROVED_BY_MANAGEMENT,
	},
	{
		label: "Supply",
		value: constants.ORDER_STATUS_APPROVED_BY_CASH_BOX,
	},
];

constants.cardTypes = [
	{
		label: "Hospital",
		value: constants.CARD_TYPE_HOSPITAL,
	},
	{
		label: "Ambulatory",
		value: constants.CARD_TYPE_AMBULATORY,
	},
	{
		label: "Reanimation",
		value: constants.CARD_TYPE_REANIMATION,
	},
];

constants.gender = [
	{
		label: "Male",
		value: constants.TYPE_MALE,
	},
	{
		label: "Female",
		value: constants.TYPE_FEMALE,
	},
];

constants.days = [
	{
		label: "Monday",
		value: constants.DAY_MONDAY,
	},
	{
		label: "Tuesday",
		value: constants.DAY_TUESDAY,
	},
	{
		label: "Wednesday",
		value: constants.DAY_WEDNESDAY,
	},
	{
		label: "Thursday",
		value: constants.DAY_THURSDAY,
	},
	{
		label: "Friday",
		value: constants.DAY_FRIDAY,
	},
	{
		label: "Saturday",
		value: constants.DAY_SATURDAY,
	},
	{
		label: "Sunday",
		value: constants.DAY_SUNDAY,
	},
];

constants.foodTime = [
	{
		label: "Breakfast",
		value: constants.BREAKFAST,
	},
	{
		label: "Launch",
		value: constants.LAUNCH,
	},
	{
		label: "Dinner",
		value: constants.DINNER,
	},
];

constants.foodWhom = [
	{
		label: "Employee",
		value: constants.TYPE_EMPLOYEE,
	},
	{
		label: "Patient",
		value: constants.TYPE_PATIENT,
	},
];

constants.orderTypes = [
	{
		label: "Pending",
		value: constants.ORDER_PENDING,
	},
	{
		label: "In progress",
		value: constants.ORDER_IN_PROGRESS,
	},
	{
		label: "Paid",
		value: constants.ORDER_PAID,
	},
	{
		label: "Done",
		value: constants.ORDER_DONE,
	},
];

constants.storeTypes = [
	{
		label: "Kitchen",
		value: constants.STORE_KITCHEN,
	},
	{
		label: "Inventory",
		value: constants.STORE_INVENTORY,
	},
	{
		label: "Drug",
		value: constants.STORE_DRUG,
	},
];

constants.degreeTypes = [
	{
		label: "Official",
		value: constants.DEGREE_OFFICIAL,
	},
	{
		label: "Not official",
		value: constants.DEGREE_NOT_OFFICIAL,
	},
];

constants.cashboxStatus = [
	{
		label: "Pending",
		value: constants.CASHBOX_SHIFT_STATUS_PENDING,
	},
	{
		label: "Approved",
		value: constants.CASHBOX_SHIFT_STATUS_APPROVED,
	},
	{
		label: "Canceled",
		value: constants.CASHBOX_SHIFT_STATUS_CANCELED,
	},
];

constants.requestStatus = [
	{
		label: "Pending",
		value: constants.REQUEST_STATUS_PENDING,
	},
	{
		label: "Approved",
		value: constants.REQUEST_STATUS_APPROVED,
	},
	{
		label: "Canceled",
		value: constants.REQUEST_STATUS_CANCELED,
	},
];

constants.selectAll = {
	label: "Все",
	value: null,
};
