import { IoTAppInterface } from "types/models/IoT/IoTApp.model";
import {
  IoTCSDispatchTypes,
  IoTCS_ACTIONS,
} from "../actions/IoTCloudServiceApp.action";

export interface AuthState {
  loading: boolean;
  app?: IoTAppInterface;
  fetched: boolean;
  message: string;
}

const defaultState: AuthState = {
  loading: true,
  message: "",
  fetched: false,
};

const authReducer = (
  state: AuthState = defaultState,
  action: IoTCSDispatchTypes
): AuthState => {
  switch (action.type) {
    case IoTCS_ACTIONS.IoTCS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { app } = action;
      // console.log("ACTION", action);
      return { ...state, app, loading: false, fetched: true, message: "" };
    case IoTCS_ACTIONS.IoTCS_FAIL:
      return {
        ...state,
        loading: false,
        fetched: false,
        message: action.message,
      };

    default:
      return state;
  }
};

export default authReducer;
