import { ActionCreator } from 'redux';
import { IdayStats, IweekState } from './reducer';
import { getStatsByDay, getStatsByWeek } from '../../localStorage';
export interface IgetStatsDay {
	type: 'STATSGETDAY';
	dayStats: IdayStats;
}

export interface IgetStatsWeek {
    type: 'STATSGETWEEK';
    weekStats: IweekState;
}

export interface IupdateStatsAction {
    type: 'STATSUPDATE';
}

export const getStatsDay: ActionCreator<IgetStatsDay> = (week: number, day: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
	const dayStats = getStatsByDay(week, day);
	return {
		type: 'STATSGETDAY',
		dayStats,
	};
};

export const getStatsWeek: ActionCreator<IgetStatsWeek> = (week: number) => {
	const weekStats = getStatsByWeek(week);
	return {
		type: 'STATSGETWEEK',
		weekStats,
	};
};