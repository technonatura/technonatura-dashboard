import { takeLatest } from "redux-saga/effects";
import RegisterUser from "utils/registerUser";

// import { UserSignup } from "../reducers/auth";
import { AUTH_ACTIONS } from "../actions/auth";

export default function* watcherSaga() {
  // @ts-ignore
  yield takeLatest(AUTH_ACTIONS.AUTH_SIGNUP, RegisterUser);
}
