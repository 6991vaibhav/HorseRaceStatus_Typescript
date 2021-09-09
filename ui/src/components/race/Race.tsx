import React from "react";
import { Redirect } from "react-router-dom";
import { getRaceStatus } from "../../redux/actions/raceActions";
import { HorseEntryTypes } from "./types/raceTypes";
import HorseEntry from "./HorseEntry";
import { InitialStateType } from "../../redux/types/reduxTypes";
import { useAppDispatch, useAppSelector } from "../../redux/react-redux-hooks";
import {
  RACE_COMPLETED_MSG,
  RACE_STATUS_PLACEHOLDER,
} from "../../helpers/constants";

const Race = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { race, login } = useAppSelector((state: InitialStateType) => state);
  const { data } = race;
  React.useEffect(() => {
    if (login.data) {
      dispatch(getRaceStatus());
    }
  }, [dispatch, login]);

  // If token not there redirect to login on refresh
  if (!login.data) {
    return <Redirect to="/" />;
  }

  const isRaceCompleted = !data.some(
    (item: HorseEntryTypes) => item.endTime === null
  );

  return (
    <div>
      {data.length === 0 && (
        <div className="no-records">
          <span className="blink">{RACE_STATUS_PLACEHOLDER}</span>
        </div>
      )}
      {data.length > 0 && (
        <>
          <h3 className="title">Race Status</h3>
          {isRaceCompleted && (
            <div className="success">{RACE_COMPLETED_MSG}</div>
          )}
          <table className="race-status-wrapper">
            <thead>
              <tr>
                <th className="horse-id">No</th>
                <th className="horse-name">Horse</th>
                <th className="race-time">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry: HorseEntryTypes) => {
                return <HorseEntry key={entry.id} row={entry} />;
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Race;
