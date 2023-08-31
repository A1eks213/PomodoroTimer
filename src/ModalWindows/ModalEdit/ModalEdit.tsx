import * as ReactDOM from 'react-dom';
import styles from './modaledit.module.css';
import { useDispatch } from 'react-redux';
import { setModalEdit } from '../../store/modalEdit/action';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { IToDo, editTodo } from '../../store/todoList/action';
import { ChangeEvent, useState } from 'react';

interface IModalEdit {
  todoId: string,
}

export function ModalEdit({todoId}: IModalEdit) {
  const todoList = useSelector<IRootState, IToDo[]>((state) => state.toDo.toDoList);
  const thisTodo = todoList.find((el) => el.id === todoId);

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(thisTodo?.name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const clearModalEdit = () => {dispatch(setModalEdit({todoId: '', isModalOpened: false}))}
  const onEdit = () => { 
    dispatch(editTodo(todoId, inputValue));
    clearModalEdit()
  };
  const node = document.querySelector('#modal-root');
  if (!node) return null;
  return ReactDOM.createPortal((
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <span className={styles.modalTitle}>Редактирование задачи</span>
        <input className={styles.editInput} value={inputValue} onChange={handleChange}></input>
        <button className={styles.editBtn} onClick={onEdit}>Изменить</button>
        <span className={styles.cancelBtn} onClick={clearModalEdit}>Отмена</span>
        <button className={styles.closeModalBtn} onClick={clearModalEdit}></button>
      </div>
    </div>
  ), node);
}
