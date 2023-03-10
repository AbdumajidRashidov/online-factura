import { system } from "../actions";
import config from "config";

const initState = {
	lngCode: config.lngCode,
	languages: [],
	theme: config.theme,
};

export const systemReducer = (state = initState, action) => {
	const { type, payload } = action;

	switch (type) {
		case system.LNG:
			return { ...state, lngCode: payload };

		case system.LANGUAGES:
			return { ...state, languages: payload };

		case system.THEME:
			return { ...state, theme: payload };

		default:
			return { ...state };
	}
};
