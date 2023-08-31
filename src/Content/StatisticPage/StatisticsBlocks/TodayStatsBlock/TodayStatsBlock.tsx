import React from 'react';
import styles from './todaystatsblock.module.css';

interface ITodayStatsBlock {
  workTime: number;
  weekDay: number
}
export function TodayStatsBlock({ workTime, weekDay }: ITodayStatsBlock) {
  const currentDay = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'][weekDay - 1];
  const workTimeInMinutes = workTime / 60;
  return (
    <div className={styles.todayStatsBlock}>
      <h2 className={styles.weekday}>{currentDay}</h2>
      {workTime === 0 ?
        <div className={styles.workTimeDiv}>Нет данных</div> :
        <div className={styles.workTimeDiv}>
          Вы работали над задачами в течение
          <span className={styles.workTimeSpan}>
            {workTime > 59 ?
              `${workTimeInMinutes > 59 ?
                ` ${Math.floor(workTimeInMinutes / 60)} ${(Math.floor(workTimeInMinutes / 60)) < 2 ? 'часа ' : 'часов '} 
              ${Math.floor(workTimeInMinutes - Math.floor(workTimeInMinutes / 60) * 60)} ${(workTimeInMinutes - Math.floor(workTimeInMinutes / 60) * 60) < 2 ? 'минуты' : 'минут'}`
                :
                ` ${Math.floor(workTimeInMinutes)}  ${(workTimeInMinutes) < 2 ? 'минуты' : 'минут'}`
              }` :
              ` ${workTime}  ${workTime > 1 ? ' секунд' : ' секунды'}`
            }
          </span>
        </div>
      }
    </div>
  );
}
