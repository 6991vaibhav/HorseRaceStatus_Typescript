import { HorseEntryTypes, HorseType } from "../../components/race/types/raceTypes";

export interface LoginResponseType {
  token: string;
  email: string;
  password: string;
}

export interface LoginDataType {
  data: null | LoginResponseType;
}

export interface RaceResponseType {
  event: string;
  horse: HorseType;
  time: number;
}

export interface RaceReduxType {
  data: HorseEntryTypes[];
}

export interface LoginType {
  login: LoginDataType;
}

export interface InitialStateType {
  login: LoginDataType;
  race: RaceReduxType;
}