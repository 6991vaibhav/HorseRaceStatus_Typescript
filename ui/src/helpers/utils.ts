import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import { HorseEntryTypes } from "../components/race/types/raceTypes";
import { RaceResponseType } from "../redux/types/reduxTypes";

// comparator to sort status list
export const sortRaceStatus = (data: HorseEntryTypes[]): HorseEntryTypes[] => {
  return data.sort((a, b) => {
    if (!a.endTime) {
      return 1;
    } else if (!b.endTime) {
      return -1;
    } else {
      return a.endTime - b.endTime;
    }
  });
};

// To add or update record in status list.
export const updateRaceStatus = (
  data: HorseEntryTypes[],
  newRecord: RaceResponseType
): HorseEntryTypes[] => {
  if (newRecord.event === "start") {
    const newHorseDetail = {
      id: newRecord.horse.id,
      name: newRecord.horse.name,
      startTime: 0,
      endTime: null,
    };
    data = [...data, newHorseDetail];
    const isAnyHorseFinished = data.find((item) => item.endTime !== null);
    return isAnyHorseFinished ? sortRaceStatus(data) : data;
  } else {
    const clonedData = cloneDeep(data);
    if (newRecord.horse) {
      const itemIndex = findIndex(
        clonedData,
        (item: HorseEntryTypes) => item.id === newRecord.horse.id
      );
      if (itemIndex !== -1) {
        Object.assign(clonedData[itemIndex], { endTime: newRecord.time });
      }
    }
    return sortRaceStatus(clonedData);
  }
};

// format time to seconds string value
export const formatTime = (time: number | null): string | 0 | null => {
  const formattedTime =
    time && `${(time / 1000).toFixed(1)}`.split(".").join(",");
  return formattedTime && `${formattedTime}s`;
};

export const validateEmail = (val: string): boolean => {
  const regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regexp.test(val)
}
