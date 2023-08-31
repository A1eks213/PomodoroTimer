import  { ActionCreator } from "redux";
import { IModalEdit } from "./reducer";

export interface IModalEditChange {
	type: 'MODALEDIT';
	modalEdit: IModalEdit;
}



export const setModalEdit: ActionCreator<IModalEditChange> = (modalEdit: IModalEdit) => {
	return {
	  type: 'MODALEDIT',
	  modalEdit,
	};
  }