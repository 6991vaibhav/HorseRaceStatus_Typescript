import initialState from "./initialState";
import { UPDATE_HORSE_STATUS } from "../actions/actionTypes";
import { HorseStatusActionType } from "../types/actionCreatorTypes";

const raceReducer = (state = initialState.race, action: HorseStatusActionType) => {
  switch (action.type) {
    case UPDATE_HORSE_STATUS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};

export default raceReducer;
