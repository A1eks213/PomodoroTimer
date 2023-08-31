import { Reducer } from "redux";
import { IModalDeleteChange} from "./action";

export interface IModalDeleteState {
    modalDelete: IModalDelete,
  }
export interface IModalDelete {
  todoId: string,
  isModalOpened: boolean
}
  
  export type TModalDeleteReducerAction = IModalDeleteChange;
  
  export const initialModalDeleteState = {
    modalDelete: {todoId: '', isModalOpened: false}
  }
  
  export const modalDeleteReducer: Reducer<IModalDeleteState, TModalDeleteReducerAction> = (state = initialModalDeleteState, action) => {
    switch(action.type) {
      case 'MODALDELETE':
        return {
          ...state,
          modalDelete : action.modalDelete

        }
      default:
        return state;
    }
  }