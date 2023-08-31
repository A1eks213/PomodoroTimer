import React, { useRef, useState } from 'react';
import styles from './selectweek.module.css';
import { Dropdown } from '../../../Dropdown';


export interface IOptions {
	id: string;
	value: number;
	text: string
}

interface ISelectWeek {
	list: IOptions[];
	callbackOnSelect?: (value: IOptions) => void;
	currentSelect: IOptions;
}



export function SelectWeek({ currentSelect, list, callbackOnSelect }: ISelectWeek) {
	const [currentValue, setCurrentValue] = useState(currentSelect);
	const [currentList, setCurrentList] = useState(list);
	const ref = useRef<HTMLDivElement>(null);
	const setCurrentValueAction = (item: IOptions) => () => {
		setCurrentValue(item);
		const newlist = [currentValue, ...currentList.filter((el) => el.id !== item.id)];
		setCurrentList(newlist);
		if (ref.current) ref.current.classList.remove('open');
		if (callbackOnSelect) callbackOnSelect(item);
	};
	return (
		< Dropdown
			button={
				<div
					ref={ref}
					className={styles.select}
					onClick={(e) => {
						e.currentTarget.classList.toggle('open');
					}}>
					<span>{currentValue.text}</span>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2"/>
          </svg>
				</div>
			}
		>
			<div className={styles.selectWeekDropdownDiv}>
				{currentList.map((el) => (
					<li key={el.id} className={styles.selectWeekDropdownItem}>
						<button className={styles.options} onClick={setCurrentValueAction(el)}>
							{el.text}
						</button>
					</li>
				))}
			</div>
		</Dropdown>
	);
}
