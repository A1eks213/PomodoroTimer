import { Reducer} from "redux";
import { toDoReducer, IToDoState, initialToDoState, TTodoReducerAction } from "./todoList/reducer";
import { ITimerInformationState, TTimerInformationReducerAction, initialTimerInformationState, timerInformationReducer } from "./timerInformation/reducer";
import { IModalDeleteState, TModalDeleteReducerAction, initialModalDeleteState, modalDeleteReducer } from "./modalDelete/reducer";
import statsReducer, { IStatsState, TstatsAction, initialStatsState } from "./stats/reducer";
import { IModalEditState, TModalEditReducerAction, initialModalEditState, modalEditReducer } from "./modalEdit/reducer";
export interface IRootState {
	toDo: IToDoState;
  timerInformation: ITimerInformationState;
  modalDelete: IModalDeleteState,
  modalEdit: IModalEditState,
  stats: IStatsState;
}

type TRootAction = TTodoReducerAction | TTimerInformationReducerAction | TModalDeleteReducerAction | TModalEditReducerAction | TstatsAction;

export const rootReducer: Reducer<IRootState, TRootAction> = (
	state = {
		toDo: {
			...initialToDoState,
		},
    timerInformation: {
      ...initialTimerInformationState,
    },
    modalDelete: {
      ...initialModalDeleteState
    },
    modalEdit: {
      ...initialModalEditState
    },
    stats: {
			...initialStatsState,
		},
	},
	action
) => {
  switch (action.type) {
    case 'MODALDELETE':
      return {
        ...state,
        modalDelete: modalDeleteReducer(state.modalDelete, action),
      };
      case 'MODALEDIT':
      return {
        ...state,
        modalEdit: modalEditReducer(state.modalEdit, action),
      };
    case 'TIMERINFORMATION':
      return {
        ...state,
        timerInformation: timerInformationReducer(state.timerInformation, action),
      };
    case 'ADDTODO':
    case 'DELETETODO':
    case 'INCREASETODO':
    case 'DECREASETODO':
    case 'CHANGETOMATOESLEFTTODO':
    case 'EDITTODO':
      return {
        ...state,
        toDo: toDoReducer(state.toDo, action),
      };
    case 'STATSUPDATE':
    case 'STATSGETDAY':
    case 'STATSGETWEEK':
      return {
        ...state,
        stats: statsReducer(state.stats, action),
      };
    default:
      return state;
  }
};

