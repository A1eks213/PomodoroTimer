import React from 'react';
import styles from './header.module.css';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

export function Header(): React.JSX.Element {
  return (
    <header className={styles.header}>
      <Link className={styles.logoLink} to={'/pomodoro'}> 
        <img src={logo} alt="" />
      </Link>
      <Link className={styles.statisticLink} to={'/statistic'}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill="#DC3E22"/>
        <defs>
        <clipPath id="clip0_16_639">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
      </svg>
        Статистика
      </Link>
    </header>
  );
}
