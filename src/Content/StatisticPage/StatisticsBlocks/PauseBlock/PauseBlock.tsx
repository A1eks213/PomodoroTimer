import React from 'react';
import styles from './pauseblock.module.css';
var classNames = require('classnames');

interface IPauseBlock {
  pauseTime: number,
}
export function PauseBlock({pauseTime}: IPauseBlock) {
  return (
    <div className={classNames(styles.pauseTimeBlock, pauseTime > 0 ? styles.activePause : styles.none)}>
      <h2 className={styles.pauseTimeTitle}>Время на паузе</h2>
      <span className={styles.pauseTimeValue}>
        {pauseTime > 59 ?
          `${Math.floor(pauseTime / 60)}ч ${pauseTime - Math.floor(pauseTime / 60) * 60}м ` :
          `${Math.floor(pauseTime)}м` }
        </span>
      <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M64.3154 37.1579V64.3158L77.8944 77.8947" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
