import  { ActionCreator } from "redux";
import { IModalDelete } from "./reducer";

export interface IModalDeleteChange {
	type: 'MODALDELETE';
	modalDelete: IModalDelete;
}



export const setModalDelete: ActionCreator<IModalDeleteChange> = (modalDelete: IModalDelete) => {
	return {
	  type: 'MODALDELETE',
	  modalDelete,
	};
  }