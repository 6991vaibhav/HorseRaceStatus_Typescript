import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from "enzyme-adapter-react-16";
import { RootState } from '../../redux/store';
import * as ReactReduxHooks from "../../redux/react-redux-hooks";
import Race from '../../components/race/Race';

configure({ adapter: new Adapter() });

const setUp = (state: RootState | {}, props: any) => {
  const mockStore = configureStore();

  const store = mockStore(state);
  jest
      .spyOn(ReactReduxHooks, "useAppSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useAppDispatch")
      .mockImplementation(() => store.dispatch);
  const wrapper = shallow(<Race {...props} store={store} />);
  return wrapper;
};

describe('Race Component', () => {
  it('should render Race Component correctly', () => {
    const state = {
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
    }
    const component = setUp(state, {});
    const classInstance = component.find('.race-wrapper');
    expect(classInstance.length).toBe(1);
  })

  it('should render Race Component correctly with no data', () => {
    const state = {
      login: {
        data: {
          token: "asdadds33432424nweddnweedk732723hadd",
          email: "6991vaibhav@gmail.com",
          password: "lTgAYaLP9jRs",
        },
      },
      race: {
        data: [],
      },
    }
    const component = setUp(state, {});
    const classInstance = component.find('.race-wrapper');
    expect(classInstance.length).toBe(1);
  })
})
