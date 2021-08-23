import { combineReducers } from "redux";
import UserReducer from "./auth";
import IoTCSReducer from "./IoTCSApp.reducer";

const reducers = combineReducers({
  user: UserReducer,
  iotApp: IoTCSReducer,
});

export default reducers;
