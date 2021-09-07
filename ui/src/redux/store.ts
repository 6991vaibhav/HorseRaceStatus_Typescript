import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import raceReducer from "./reducers/race";
import loginReducer from "./reducers/login";

const rootReducer = combineReducers({
  login: loginReducer,
  race: raceReducer,
});

export type RootStore = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
