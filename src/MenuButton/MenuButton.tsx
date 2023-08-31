import React from 'react';
import styles from './menubutton.module.css';
import { MenuButtonItemsList } from './MenuButtonItemsList';
import { Dropdown } from '../Dropdown';

interface IMenuButton {
  todoId: string
}
export function MenuButton({todoId}: IMenuButton) {
  return (
    <>
    <div className={styles.menu}>
        < Dropdown 
          button={
            <button className={styles.menuButton}>
            <svg width="5" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9"/>
              <circle cx="2.5" cy="10" r="2.5" fill="#D9D9D9"/>
              <circle cx="2.5" cy="17.5" r="2.5" fill="#D9D9D9"/>
            </svg>
          </button>
          }
        >
          <div className={styles.dropdownDiv}>
            <MenuButtonItemsList todoId={todoId} /> 
          </div>
        </Dropdown>
        
    </div>
    </>
  );
}
