import dayjs from "dayjs";
import { IweekState } from "./store/stats/reducer";
import { getDateByWeek, isDayBetween, isDaySame, todayWeekDay } from "./utils/statisticFunctions";

export interface IStatsItem {
    type: string,
    value: number
}

export function pushStats({ type, value }: IStatsItem) {
    const statsJson = localStorage.getItem('statsArray');
    const statsArray = statsJson !== null ? JSON.parse(statsJson) : [];
    statsArray.push({ type: type, date: dayjs().unix(), value: value })
    localStorage.setItem('statsArray', JSON.stringify(statsArray))
}

export function getStatsByDay(week: number, day: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    const statList = JSON.parse(localStorage.getItem('statsArray') || '[]');
    const needbaleDay = getDateByWeek(week, day);
    const today = getDateByWeek(0, todayWeekDay());
    const firstDay = getDateByWeek(-2, 1);
    if (!isDayBetween(needbaleDay, firstDay, today)) {
        return {
            tomatoCount: 0,
            breakTime: 0,
            breakCount: 0,
            workTime: 0,
        };
    }

    const res = {
        tomatoCount: 0,
        breakTime: 0,
        breakCount: 0,
        workTime: 0,
    };

    for (let stat of statList) {
        if (isDaySame(stat.date, needbaleDay)) {
            if (stat.type === 'break') res.breakCount += stat.value;
            if (stat.type === 'pauseTime') res.breakTime += stat.value;
            if (stat.type === 'pomidor') res.tomatoCount += stat.value;
            if (stat.type === 'workingTime') res.workTime += stat.value;
        }
    }

    return res;
}

export function getStatsByWeek(week: number) {
    const day1 = getStatsByDay(week, 1).workTime;
    const day2 = getStatsByDay(week, 2).workTime;
    const day3 = getStatsByDay(week, 3).workTime;
    const day4 = getStatsByDay(week, 4).workTime;
    const day5 = getStatsByDay(week, 5).workTime;
    const day6 = getStatsByDay(week, 6).workTime;
    const day7 = getStatsByDay(week, 7).workTime;
    const res: IweekState = {
        workTimeAtDay: [day1, day2, day3, day4, day5, day6, day7],
    };
    return res;
}


