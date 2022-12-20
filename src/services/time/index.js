import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { get } from "lodash";

import { constants } from "services";

dayjs.extend(duration);

export const time = {
	toTimestamp: (date) => dayjs(date).unix(),
	toDate: (timestamp) => (timestamp ? dayjs.unix(timestamp).toDate() : dayjs().toDate()),

	formatTimestamp: (timestamp, format = "DD.MM.YYYY") =>
		timestamp ? dayjs.unix(timestamp).format(format) : "",

	getCurrentTime: () => dayjs().toDate(),

	getExpiredDate: ({ count, type } = {}) => {
		const duration = {};

		switch (get(type, "value")) {
			case constants.TYPE_DAY:
				duration.days = count;
				break;
			case constants.TYPE_MONTH:
				duration.months = count;
				break;
			case constants.TYPE_YEAR:
				duration.years = count;
				break;
			default:
				break;
		}

		return dayjs.duration(duration).asSeconds();
	},

	getFromHours: (time = "") => {
		const formattedTime = time.split(":");
		const hours = parseInt(formattedTime[0]);
		const minutes = parseInt(formattedTime[1]);

		return dayjs().startOf("day").add(hours, "hour").add(minutes, "minute").unix();
	},
};
