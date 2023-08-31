import { Reducer } from "redux";
import { IModalEditChange} from "./action";

export interface IModalEditState {
    modalEdit: IModalEdit,
  }
export interface IModalEdit {
  todoId: string,
  isModalOpened: boolean
}
  
  export type TModalEditReducerAction = IModalEditChange;
  
  export const initialModalEditState = {
    modalEdit: {todoId: '', isModalOpened: false}
  }
  
  export const modalEditReducer: Reducer<IModalEditState, TModalEditReducerAction> = (state = initialModalEditState, action) => {
    switch(action.type) {
      case 'MODALEDIT':
        return {
          ...state,
          modalEdit : action.modalEdit

        }
      default:
        return state;
    }
  }