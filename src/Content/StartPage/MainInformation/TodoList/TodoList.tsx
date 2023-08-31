import React, { useEffect } from 'react';
import styles from './todolist.module.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store/store';
import { IToDo } from '../../../../store/todoList/action';
import { TodoItem } from './TodoItem';
import { addTimerInformation } from '../../../../store/timerInformation/action';
import { useDispatch } from 'react-redux';
import { IModalDelete } from '../../../../store/modalDelete/reducer';
import { ModalDelete } from '../../../../ModalWindows/ModalDelete';


export function TodoList() {
  const todoList = useSelector<IRootState, IToDo[]>((state) => state.toDo.toDoList);
  const modalDelete = useSelector<IRootState, IModalDelete>((state) => state.modalDelete.modalDelete);
  const dispatch = useDispatch();
  useEffect(() => {
    if (todoList.length > 0) {
      dispatch(addTimerInformation({name: todoList[0].name, id: todoList[0].id, numberOfTomatoes: todoList[0].numberOfTomatoes, tomatoesLeft: todoList[0].tomatoesLeft}))
    } else {
      dispatch(addTimerInformation({name: '', id: '', numberOfTomatoes: 1, tomatoesLeft: 0}))
    }
  }, [todoList, dispatch])

  let amountOfWork = 0;
  todoList.forEach((el) => {amountOfWork += el.numberOfTomatoes})
  return (
    <>
    {modalDelete.isModalOpened && <ModalDelete todoId={modalDelete.todoId}/>}
    <ul className={styles.todoList}>
      {todoList.map((item) => <TodoItem key={item.id} name={item.name} numberOfTomatoes={item.numberOfTomatoes} id={item.id}/>)}
    </ul>
    <div className={styles.leadTimeDiv}>{amountOfWork > 2 ? 
      `${Math.floor(amountOfWork * 25 / 60)} ${Math.floor(amountOfWork * 25 / 60) > 1 ? 
        `${Math.floor(amountOfWork * 25 / 60) > 4 ? 'часов' : 'часа'}`
        :
        'час'} 
          ${amountOfWork * 25 % 60} минут` :
      `${amountOfWork * 25} минут` }</div>
    </>
  );
}
