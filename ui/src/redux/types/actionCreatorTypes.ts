import { ThunkAction } from "redux-thunk";
import { HorseEntryTypes } from "../../components/race/types/raceTypes";
import { InitialStateType, LoginResponseType } from "./reduxTypes";

export interface LoginActionType {
  type: string;
  payload: LoginResponseType;
}

export interface HorseStatusActionType {
  type: string;
  payload: HorseEntryTypes[];
}

export type raceActionCreator = ThunkAction<
  void,
  InitialStateType,
  {},
  HorseStatusActionType
>