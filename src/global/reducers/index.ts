import { combineReducers } from "redux";
import UserReducer from "./auth";

const reducers = combineReducers({
  user: UserReducer,
});

export default reducers;
