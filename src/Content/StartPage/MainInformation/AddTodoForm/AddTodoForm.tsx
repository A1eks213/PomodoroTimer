import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './addtodoform.module.css';
import { addTodo } from '../../../../store/todoList/action';
import { nanoid } from 'nanoid';
export function AddTodoForm() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  function handleSubmit(e: FormEvent) {
    if (inputValue) {
      e.preventDefault()
      dispatch(addTodo({name: inputValue, id: nanoid(), numberOfTomatoes: 1, tomatoesLeft: 0}))
      setInputValue('')
    } else {
      e.preventDefault()
    }
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value)
  }
  return (
    <form className={styles.addTodoForm} onSubmit={handleSubmit}>
      <input 
        type="text"
        className={styles.inputTodo}
        placeholder='Название задачи'
        value={inputValue}
        onChange={handleChange}/>
      <button type='submit' className={styles.btnAddTodo}>Добавить</button>
    </form>
  );
}
