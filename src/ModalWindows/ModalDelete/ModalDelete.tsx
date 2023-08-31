import React from 'react';
import styles from './modaldelete.module.css';
import * as ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../store/todoList/action';
import { setModalDelete } from '../../store/modalDelete/action';

interface IModalDelete {
  todoId: string,
}
export function ModalDelete({todoId}: IModalDelete) {
  const dispatch = useDispatch();
  const clearModalDelete = () => {dispatch(setModalDelete({todoId: '', isModalOpened: false}))}
  const onDelete = () => { 
    dispatch(deleteTodo(todoId));
    clearModalDelete()
  };
  const node = document.querySelector('#modal-root');
  if (!node) return null;
  return ReactDOM.createPortal((
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <span className={styles.modalTitle}>Удалить задачу?</span>
        <button className={styles.deleteBtn} onClick={onDelete}>Удалить</button>
        <span className={styles.cancelBtn} onClick={clearModalDelete}>Отмена</span>
        <button className={styles.closeModalBtn} onClick={clearModalDelete}></button>
      </div>
    </div>
  ), node);
}
