import React, { useEffect, useState } from 'react';
import styles from './breaktimer.module.css';
import { ITimerInformation } from '../../../store/timerInformation/reducer';
var classNames = require('classnames');

interface IBreakTimer {
  goToWork: () => void;
  timerInformation: ITimerInformation,
}
const getPadTime = (time: number) => time.toString().padStart(2, '0');

export function BreakTimer({goToWork, timerInformation}: IBreakTimer) {
  const [time, setTime] = useState(0.1 * 60);
  const [isCount, setIsCount] = useState(true);
  const [isPause, setIsPause] = useState(false);
  
  function timerInAction() {
    setTime((time) => (time >= 1 ? time - 1 : 0));
  }
  // отсчёт таймера
  useEffect(() => {
    const interval = setInterval(() => {
      isCount && timerInAction()
    }, 1000)
    if (time === 0) {
      setIsCount(false)
      goToWork()
    }
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line
  }, [isCount, time])
  const minutes = getPadTime(Math.floor(time / 60));
  const seconds = getPadTime(time - (Number(minutes) * 60));

  const handleAddMoreTime = () => {
    setTime(time + 6)
  }
  const handleContinue = () => {
    setIsCount(true);
    setIsPause(false);
  }
  const handlePause = () => {
    setIsCount(false);
    setIsPause(true);
  }
  return (
    <div className={styles.breakTimerDiv}>
      <div className={styles.breakTimerHeader}>
        <span className={styles.pauseNameSpan}>{timerInformation.name}</span>
        <span className={styles.pauseNumberSpan}> Перерыв {timerInformation.tomatoesLeft}</span>
      </div>
      <div className={styles.breakTimer}>
        <div className={styles.breakTimerDisplay}>
          <div className={isPause ? classNames(styles.breakTimeDivPause, styles.breakTimeDiv) : styles.breakTimeDiv}>
            {minutes}:{seconds}
          </div>
          <button className={styles.addMoreTimeBtn} onClick={handleAddMoreTime}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.27559 9.13215V16H6.72441V9.13215H0V6.70291H6.72441V0H9.27559V6.70291H16V9.13215H9.27559Z" fill="white" />
            </svg>
          </button>
        </div>
        {/* <div className={styles.taskDiv}>Задача -
          <span className={styles.taskSpan}>{` ${timerInformation.name}`}</span>
        </div> */}
        <div className={styles.controlBtnsDiv}>
          {isCount ?
            <button className={classNames(styles.pauseContinueBtn, styles.btn)} onClick={handlePause}> Пауза </button> :
            <button className={classNames(styles.pauseContinueBtn, styles.btn)} onClick={handleContinue}> Продолжить </button> 
          }
          <button className={classNames(styles.skipBtn, styles.btn)} onClick={goToWork}> Пропустить </button>
        </div>
      </div>
    </div>
  );
}
