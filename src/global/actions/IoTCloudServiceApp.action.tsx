import { Dispatch } from "redux";

/* eslint-disable no-unused-vars */
import { IoTAppInterface } from "types/models/IoT/IoTApp.model";

// eslint-disable-next-line no-shadow
export enum IoTCS_ACTIONS {
  IoTCS_LOADING = "IoTCS_LOADING",
  IoTCS_FAIL = "IoTCS_FAIL",
  IoTCS_SUCCESS = "IoTCS_SUCCESS",
}

export interface IoTCSFail {
  type: IoTCS_ACTIONS.IoTCS_FAIL;
  message: string;
}

export interface IoTCSSuccess {
  type: IoTCS_ACTIONS.IoTCS_SUCCESS;
  app: IoTAppInterface;
}

export type IoTCSDispatchTypes = IoTCSSuccess | IoTCSFail;

export const IoTCSSuccess = (app: IoTAppInterface) => ({
  type: IoTCS_ACTIONS.IoTCS_SUCCESS,
  app,
});

export const IoTCSFail =
  (message: string) => async (dispatch: Dispatch<IoTCSDispatchTypes>) => {
    dispatch<IoTCSFail>({
      type: IoTCS_ACTIONS.IoTCS_FAIL,
      message,
    });
  };
