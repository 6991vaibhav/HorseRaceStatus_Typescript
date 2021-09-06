import initialState from "./initialState";
import { UPDATE_LOGIN_TOKEN } from "../actions/actionTypes";
import { LoginDataType } from "../types/reduxTypes";
import { LoginActionType } from "../types/actionCreatorTypes";

const loginReducer = (state = initialState.login, action: LoginActionType): LoginDataType => {
  switch (action.type) {
    case UPDATE_LOGIN_TOKEN:
      return {
        ...state,
        data: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default loginReducer;
