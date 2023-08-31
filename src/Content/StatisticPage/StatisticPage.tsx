import React, { useEffect, useState } from 'react';
import styles from './statisticpage.module.css';
import { TodayStatsBlock } from './StatisticsBlocks/TodayStatsBlock';
import { TomatoesBlock } from './StatisticsBlocks/TomatoesBlock';
import { FocusBlock } from './StatisticsBlocks/FocusBlock';
import { PauseBlock } from './StatisticsBlocks/PauseBlock';
import { BreaksBlock } from './StatisticsBlocks/BreaksBlock';
import { ChardBlock } from './StatisticsBlocks/ChardBlock';
import 'chart.js/auto';
import { todayWeekDay } from '../../utils/statisticFunctions';
import { IOptions, SelectWeek } from './SelectWeek';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { getStatsDay, getStatsWeek } from '../../store/stats/action';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { IdayStats, workTimeAtDay } from '../../store/stats/reducer';


export function StatisticPage() {
  const dispatch = useDispatch()
  const [currentDay, setCurrentDay] = useState(todayWeekDay());
  const [currentWeek, setCurrentWeek] = useState(0);
  const dataset = useSelector<IRootState, workTimeAtDay>((state) => state.stats.weekStats.workTimeAtDay);
  const { tomatoCount, breakCount, workTime, breakTime } = useSelector<IRootState, IdayStats>(
		(state) => state.stats.dayStats
	);

  useEffect(() => {
		dispatch(getStatsWeek(currentWeek));
		dispatch(getStatsDay(currentWeek, currentDay));
	}, [currentWeek, currentDay, dispatch]);
  const changeWeekCallBack = (opt: IOptions) => {
		setCurrentWeek(opt.value);
		setCurrentDay(1);
	}; 

  const focus = workTime !== 0 ?
  Math.ceil(((workTime / 60) / ((workTime / 60) + (breakTime / 60))) * 100) : 0;
  return (
    <div className={styles.statsPage}>
      <div className={styles.statsHeader}>
        <h2>Ваша статистика</h2>
        <SelectWeek 
          callbackOnSelect={changeWeekCallBack}
					list={[
						{ id: nanoid(), text: 'Прошедшая неделя', value: -1 },
						{ id: nanoid(), text: '2 недели назад', value: -2 },
					]}
					currentSelect={{ id: nanoid(), text: 'Эта неделя', value: 0 }}
        />
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.leftInfoDiv}>
          <TodayStatsBlock weekDay={currentDay} workTime={Math.ceil(workTime)} />
          <TomatoesBlock numberOfTomatoes={tomatoCount}/>
        </div>
        <div className={styles.chartDiv}>
          <ChardBlock onBarClick={(d) => setCurrentDay(d)} active={currentDay - 1} dataset={dataset} />
        </div>
        <div className={styles.FPB}>
          <FocusBlock focus={focus} />
          <PauseBlock pauseTime={Math.ceil(breakTime / 60)}/>
          <BreaksBlock breaks={breakCount}/>
        </div>
      </div>
    </div>
  );
}
