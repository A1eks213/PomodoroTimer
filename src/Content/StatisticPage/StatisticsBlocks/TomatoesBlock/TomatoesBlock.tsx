import React from 'react';
import styles from './tomatoesblock.module.css';
import tomato from '../../../../img/numberOfTomatoes.png';

interface ITomatoesBlock {
  numberOfTomatoes: number
}
export function TomatoesBlock({numberOfTomatoes}: ITomatoesBlock) {
  function returnEnds(el: number) {
    if (el === 1) {
      return 'помидор';
    } else if  (el >= 2 && el <= 4) {
      return 'помидора';
    } else {
      return 'помидоров';
    }
  }
  return (
    <div className={styles.tomatoesBlock}>
      {numberOfTomatoes === 0 ?
        (<div className={styles.zeroTomatoes}>

        </div>) :
        (<div className={styles.numberOfTomatoes}>
          <div className={styles.imgAndNumber}>
            <img src={tomato} alt="" />
            <span className={styles.numberSpan}>{`x ${numberOfTomatoes}`}</span>
          </div>
          <div className={styles.redBlock}>
            {`${numberOfTomatoes}  ${returnEnds(numberOfTomatoes)}`
            }
          </div>
        </div>)}
    </div>
  );
}
