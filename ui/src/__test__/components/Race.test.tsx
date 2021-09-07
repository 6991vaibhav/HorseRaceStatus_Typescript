import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import Race from "../../components/race/Race";
import * as ReactReduxHooks from "../../redux/react-redux-hooks";
import { getRaceStatus } from "../../redux/actions/raceActions";

configure({ adapter: new Adapter() });

describe("Race Status Display", () => {
  let wrapper: any;
  let useEffect: any;
  let store: any;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: any) => f());
  };

  beforeEach(() => {
    store = configureStore([thunk])({
      login: {
        data: {
          token: "asdadds33432424nweddnweedk732723hadd",
          email: "6991vaibhav@gmail.com",
          password: "lTgAYaLP9jRs",
        },
      },
      race: {
        data: [
          { id: 3, name: "Soho", startTime: 0, endTime: null },
          { id: 14, name: "Aries", startTime: 0, endTime: null },
          { id: 25, name: "Patriot", startTime: 0, endTime: null },
        ],
      },
    });

    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();

    jest
      .spyOn(ReactReduxHooks, "useAppSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useAppDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<Race />);
  });

  describe("on Mount", () => {
    it("dispatch fetch race status action to store", () => {
      store.dispatch(getRaceStatus());
    });
  });

  it("should render Race component correctly", () => {
    expect(wrapper.find(".race-status-wrapper")).toHaveLength(1);
  });
});
