import  { ActionCreator } from "redux";
import { ITimerInformation } from "./reducer";

export interface ITimerInformationChange {
	type: 'TIMERINFORMATION';
	timerInformation: ITimerInformation;
}



export const addTimerInformation: ActionCreator<ITimerInformationChange> = (timerInformation: ITimerInformation) => {
	return {
	  type: 'TIMERINFORMATION',
	  timerInformation,
	};
  }