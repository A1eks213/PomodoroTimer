import { useSelector } from 'react-redux';
import { MenuButton } from '../../../../../MenuButton';
import styles from './todoitem.module.css';
import { IRootState } from '../../../../../store/store';
import { IModalEdit } from '../../../../../store/modalEdit/reducer';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalEdit } from '../../../../../store/modalEdit/action';
import { editTodo } from '../../../../../store/todoList/action';
var classNames = require('classnames');

interface ITodoItem {
  name: string,
  numberOfTomatoes: number;
  id: string
}

export function TodoItem({name, numberOfTomatoes, id}: ITodoItem) {
  const dispatch = useDispatch();
  const modalEdit = useSelector<IRootState, IModalEdit>((state) => state.modalEdit.modalEdit);

  const [inputValue, setInputValue] = useState(name);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const clearModalEdit = () => {dispatch(setModalEdit({todoId: '', isModalOpened: false}))}
  const onEdit = () => { 
    dispatch(editTodo(id, inputValue));
    clearModalEdit()
  };
  return (
    <li className={styles.todoItem}>
      {(modalEdit.isModalOpened && modalEdit.todoId === id) ? 
        <div className={styles.inputEditContainer}>
          <input className={styles.inputEdit} value={inputValue} onChange={handleChange}></input>
          <button onClick={onEdit} className={classNames(styles.confirmBtn, styles.btn)}>Сохранить</button>
          <button onClick={clearModalEdit} className={classNames(styles.cancelBtn, styles.btn)}>Отмена</button>
        </div>
      :
      <div className={styles.itemContainer}>
        <div className={styles.numberOfTomatoesDiv}>{numberOfTomatoes}</div>
        {name}
        <MenuButton todoId={id}/>
      </div>
      }
    </li>
  );
}
