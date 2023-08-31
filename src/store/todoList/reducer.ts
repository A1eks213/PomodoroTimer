import { Reducer } from "redux";
import { IToDo, IChange, IDelete, IIncrease, IDecrease, IChangeTomatoesLeft, IEdit } from "./action";


export interface IToDoState {
  toDoList: IToDo[],
}

export type TTodoReducerAction = IChange | IDelete | IEdit | IIncrease | IDecrease | IChangeTomatoesLeft;

export const initialToDoState = {
  toDoList: [],
}

export const toDoReducer: Reducer<IToDoState, TTodoReducerAction> = (state= initialToDoState, action) => {
  switch(action.type) {
    case 'ADDTODO':
    case 'DELETETODO':
    case 'INCREASETODO':
    case 'DECREASETODO':
    case 'CHANGETOMATOESLEFTTODO':
    case 'EDITTODO':
      return {
        ...state,
        toDoList: action.list,
      }
    default:
      return state;
  }
}