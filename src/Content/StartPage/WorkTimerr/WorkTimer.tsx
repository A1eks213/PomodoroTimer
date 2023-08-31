import React, { useState, useEffect } from 'react';
import styles from './worktimer.module.css';
import { ITimerInformation } from '../../../store/timerInformation/reducer';
import { changeTomatoesLeftTodo, deleteTodo } from '../../../store/todoList/action';
import { useDispatch } from 'react-redux';
import { pushStats } from '../../../localStorage';
var classNames = require('classnames');

const getPadTime = (time: number) => time.toString().padStart(2, '0');

interface IWorkTimer {
  goToBreak: () => void;
  timerInformation: ITimerInformation,
}

export function WorkTimer({goToBreak, timerInformation} : IWorkTimer) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0.1 * 60);
  const [pauseTime, setPauseTime] = useState(1);
  const [workingTime, setWorkingTime] = useState(1);
  const [isCount, setIsCount] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [timerIsStarted, setTimerIsStarted] = useState(false);

  // когда таймер в работе
  function timerInAction() {
    setWorkingTime((prevWorkingTime) => (prevWorkingTime + 1))
    setTime((time) => (time >= 1 ? time - 1 : 0));
  }
  // возвращение таймера в начальное положение
  function backupTimer() {
    setTime(0.1 * 60)
    setIsCount(false);
    setTimerIsStarted(false)
    setWorkingTime(1)
  }

  const minutes = getPadTime(Math.floor(time / 60));
  const seconds = getPadTime(time - (Number(minutes) * 60));

  const handleStart = () => {
    if (timerInformation.name) {
      setIsCount(true)
      setTimerIsStarted(true)
    }
  }
  const handleStop = () => {
    setIsPause(true);
    setIsCount(false);
  }
  const handleContinue = () => {
    setIsCount(true)
    setIsPause(false);
    pushStats({ type: 'pauseTime', value: pauseTime })
    setPauseTime(1)
  }
  const handleDone = () => {
    pushStats({ type: 'pomidor', value: 1 })
    pushStats({ type: 'workingTime', value: workingTime })
    backupTimer()
    if ((timerInformation.numberOfTomatoes > 1) && (timerInformation.numberOfTomatoes !== timerInformation.tomatoesLeft + 1) ) {
      dispatch(changeTomatoesLeftTodo(timerInformation.id))
      goToBreak()
    } else {
      dispatch(deleteTodo(timerInformation.id))
    }
  }
  const handleReset = () => {
    pushStats({ type: 'break', value: 1 })
    pushStats({ type: 'workingTime', value: workingTime })
    pushStats({ type: 'pauseTime', value: pauseTime })
    setPauseTime(1)
    setIsPause(false)
    backupTimer()
    // dispatch(deleteTodo(timerInformation.id))
  }
  const handleAddMoreTime = () => {
    setTime(time + 6)
  }
  // отсчёт таймера
  useEffect(() => {
    const interval = setInterval(() => {
      isCount && timerInAction()
    }, 1000)
    if (time === 0) {
      pushStats({ type: 'workingTime', value: workingTime })
      pushStats({ type: 'pomidor', value: 1 })
      backupTimer()
      if ((timerInformation.numberOfTomatoes > 1) && (timerInformation.numberOfTomatoes !== timerInformation.tomatoesLeft + 1) ) {
        dispatch(changeTomatoesLeftTodo(timerInformation.id))
        goToBreak()
      } else {
        dispatch(deleteTodo(timerInformation.id))
      }
      // alert('Поздравляем, помидорка выполнена!!!')
    }
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line
  }, [isCount, time])
  // отсчёт времени на паузе
  useEffect(() => {
    const pauseInterval = setInterval(() => {
      isPause && setPauseTime((prevPauseTime) => (prevPauseTime + 1))
    }, 1000)
    return () => {
      clearInterval(pauseInterval)
    }
    // eslint-disable-next-line
  }, [isPause, pauseTime])
  return (
    <div className={styles.timerDiv}>
      <div className={timerIsStarted ? classNames(styles.timerHeaderStarted, styles.timerHeader) : styles.timerHeader}>
        <span className={styles.tomatoNameSpan}>{timerInformation.name || ''}</span>
        <span className={styles.tomatoNumberSpan}>Помидор {timerInformation.tomatoesLeft + 1}</span>
      </div>
      <div className={styles.timer}>
        <div className={styles.timerDisplay}>
          <div className={(timerIsStarted && !isPause) ? 
            classNames(styles.timeDivStarted, styles.timeDiv) : 
            styles.timeDiv}>
            {minutes}:{seconds}
          </div>
          <button className={styles.addMoreTimeBtn} onClick={handleAddMoreTime}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.27559 9.13215V16H6.72441V9.13215H0V6.70291H6.72441V0H9.27559V6.70291H16V9.13215H9.27559Z" fill="white" />
            </svg>
          </button>
        </div>
        {/* <div className={styles.taskDiv}>Задача -
          <span className={styles.taskSpan}>{` ${timerInformation.name}` || ''}</span>
        </div> */}
        <div className={styles.controlBtnsDiv}>
          {/* Когда таймер ещё не запущен */}
          {!timerIsStarted && (
            <>
              <button className={classNames(styles.startBtn, styles.btn)} onClick={handleStart} disabled={isCount ? true : false}> Старт </button>
              <button className={classNames(styles.initialStopBtn, styles.btn)}> Стоп </button>
            </>
          )}
          {/* Когда таймер запущен и идёт отсчёт */}
          {(timerIsStarted && isCount) && (
            <>
              <button className={classNames(styles.startBtn, styles.btn)} onClick={handleStop}> Пауза </button>
              <button className={classNames(styles.stopBtn, styles.btn)} onClick={handleDone}> Сделано </button>
            </>
          )}
          {/* Когда таймер уже был запущен и поставлен на паузу*/}
          {(timerIsStarted && !isCount) && (
            <>
              <button className={classNames(styles.startBtn, styles.btn)} onClick={handleContinue} > Продолжить </button>
              <button className={classNames(styles.stopBtn, styles.btn)} onClick={handleReset}> Стоп </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
