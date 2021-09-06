import axios from "axios";
import { Dispatch } from "redux";
import { LoginParamType } from "../../components/login/types/loginTypes";
import { LoginResponseType } from "../types/reduxTypes";
import { UPDATE_LOGIN_TOKEN } from "./actionTypes";
import apiUrls from "../../helpers/apiUrls";

export const loginToRaceDashboard = (loginData: LoginParamType) => {
  const url = apiUrls.auth;
  return axios.post(url, loginData);
};

export const updateLoginToken =
  (loginCred: LoginResponseType) => (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_LOGIN_TOKEN,
      payload: loginCred,
    });
  };
