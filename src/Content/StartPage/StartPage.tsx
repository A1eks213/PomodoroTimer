import React, { useState } from 'react';
import styles from './startpage.module.css';
import { MainInformation } from './MainInformation';
import { WorkTimer } from './WorkTimerr';
import { BreakTimer } from './BreakTimer';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { ITimerInformation } from '../../store/timerInformation/reducer';

export function StartPage() {
  const [workTimer, setWorkTimer] = useState(true); 
  const workTimerCallBack = () => { setWorkTimer(false) }
  const breakTimerCallBack = () => { setWorkTimer(true) }

  const timerInformation = useSelector<IRootState, ITimerInformation>((state) => state.timerInformation.timerInformation);
  return (
    <div className={styles.startPage}>
      <MainInformation />
      {(workTimer === true) ? 
        <WorkTimer goToBreak={workTimerCallBack} timerInformation={timerInformation}/> : 
        <BreakTimer goToWork={breakTimerCallBack}  timerInformation={timerInformation}></BreakTimer>
      }
    </div>
  );
}
