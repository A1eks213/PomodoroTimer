import React from 'react';
import styles from './maininformation.module.css';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './TodoList';

export function MainInformation() {
  return (
    <div className={styles.mainInfoDiv}>
      <h2 className={styles.mainInfoTitle}>Ура! Теперь можно начать работать:</h2>
      <ul className={styles.instructionList}>
        <li>Выберите категорию и напишите название текущей задачи</li>
        <li>Запустите таймер («помидор»)</li>
        <li>Работайте пока «помидор» не прозвонит</li>
        <li>Сделайте короткий перерыв (3-5 минут)</li>
        <li>Продолжайте работать "помидор" за "помидором", показа задача не будет выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут)</li>
      </ul>
      <AddTodoForm></AddTodoForm>
      <TodoList />
      
    </div>
  );
}
