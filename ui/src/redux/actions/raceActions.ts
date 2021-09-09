import axios from "axios";
import { updateRaceStatus } from "../../helpers/utils";
import { loginToRaceDashboard } from "./loginActions";
import { UPDATE_HORSE_STATUS } from "./actionTypes";
import { HorseEntryTypes } from "../../components/race/types/raceTypes";
import { LoginResponseType } from "../types/reduxTypes";
import { raceActionCreator } from "../types/actionCreatorTypes";
import apiUrls from "../../helpers/apiUrls";

export const updateHorseStatus = (data: HorseEntryTypes[]) => ({
  type: UPDATE_HORSE_STATUS,
  payload: data,
});

export const fetchRaceStatus = async (token: string) => {
  const url = apiUrls.results;
  try {
    const response = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response;
  } catch {
    return false;
  }
};

export const getRaceStatus =
  (): raceActionCreator =>
  async (dispatch, getState): Promise<void> => {
    const state = getState();
    if (state.login.data) {
      try {
        const { token, email, password }: LoginResponseType = state.login.data;
        const raceStatusData = state.race.data;
        const res = await fetchRaceStatus(token);
        if (res) {
          if (res.status === 204) {
            dispatch(getRaceStatus());
          } else if (res.status === 200 && !res.data.error) {
            const nextRace =
              res.data.event === "start" &&
              raceStatusData.some(
                (item: HorseEntryTypes) => item.endTime !== null
              );
            if (nextRace) {
              // clear the previous race status data
              dispatch(updateHorseStatus([]));
            }
            // get sorted list of statuses
            const updatedStatusList = updateRaceStatus(
              nextRace ? [] : raceStatusData,
              res.data
            );
            dispatch(updateHorseStatus(updatedStatusList));
            dispatch(getRaceStatus());
          } else {
            try {
              const loginRes = await loginToRaceDashboard({
                email,
                password,
              });
              if (!loginRes.data.error) {
                dispatch(getRaceStatus());
              }
            } catch {
              console.error("Error relogging in.");
            }
          }
        }
      } catch {
        console.error("Error in fetching results.");
      }
    }
  };
