import { Reducer } from "redux";
import { ITimerInformationChange } from "./action";

export interface ITimerInformationState {
    timerInformation: ITimerInformation,
  }
export interface ITimerInformation {
  name: string,
  id: string,
  numberOfTomatoes: number,
  tomatoesLeft: number,
}
  
  export type TTimerInformationReducerAction = ITimerInformationChange;
  
  export const initialTimerInformationState = {
    timerInformation: {id: '', name: '', numberOfTomatoes: 1, tomatoesLeft: 0}
  }
  
  export const timerInformationReducer: Reducer<ITimerInformationState, TTimerInformationReducerAction> = (state = initialTimerInformationState, action) => {
    switch(action.type) {
      case 'TIMERINFORMATION':
        return {
          ...state,
          timerInformation : action.timerInformation

        }
      default:
        return state;
    }
  }