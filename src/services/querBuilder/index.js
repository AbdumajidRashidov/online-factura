import { isArray } from "lodash";

export const queryBuilder = (url, config = {}) => {
	if (Object.keys(config).length <= 0) return url;

	const { sort = "-id", limit, page, include = [], extra = {}, filter = {} } = config;
	const queryObj = new URLSearchParams();

	if (Object.keys(filter).length)
		Object.entries(filter).forEach((item) => {
			if (isArray(item[1])) {
				item[1].forEach((inner, index) =>
					queryObj.append(`filter[${item[0]}][${index}]`, inner)
				);
			} else if (item[1] || item[1] === 0) queryObj.append(`filter[${item[0]}]`, item[1]);
		});

	if (Object.keys(extra).length)
		Object.entries(extra).forEach((item) => {
			if (item[0] && item[1]) queryObj.append(item[0], item[1]);
		});

	if (include.length) queryObj.set("include", include.toString());

	if (sort) queryObj.set("sort", sort);

	if (limit) queryObj.set("per-page", limit);

	if (page && page !== 1) queryObj.set("page", page);

	return `${url}?${decodeURIComponent(queryObj.toString())}`;
};
