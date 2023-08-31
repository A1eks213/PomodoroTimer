import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';
import isBetween from 'dayjs/plugin/isBetween';

export const todayWeekDay = () => {
	const today = dayjs().day() === 0 ? 7 : dayjs().day();
	return today as 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

export const getDateByWeek = (week: number, day: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
	dayjs.extend(weekday);
	const neededWeek = day === 7 ? week + 1 : week;
	const anglosaxDay = [1, 2, 3, 4, 5, 6, 0][day - 1];
	const ISODate = dayjs()
		.weekday(anglosaxDay + 7 * neededWeek)
		.set('hours', 0)
		.set('minutes', 0)
		.set('seconds', 0)
		.set('milliseconds', 0)
		.toISOString();
	return dayjs(ISODate).unix();
};



export const isDayBetween = (needbaleday:number, firstDay:number, lastday:number) => {
    dayjs.extend(isBetween)
    return dayjs.unix(needbaleday).isBetween(dayjs.unix(firstDay), dayjs.unix(lastday), 'day', '[]')
};

export const isDaySame = (day1: number, day2: number) => dayjs.unix(day1).isSame(dayjs.unix(day2), 'day');