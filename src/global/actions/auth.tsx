import { Dispatch } from "redux";

/* eslint-disable no-unused-vars */
import { UserInterface } from "types/models/User.model";

// eslint-disable-next-line no-shadow
export enum AUTH_ACTIONS {
  AUTH_LOADING = "AUTH_LOADING",
  AUTH_FAIL = "AUTH_FAIL",
  AUTH_LOGOUT = "AUTH_LOGOUT",
  AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS",
  AUTH_SIGNUP_SUCCESS = "AUTH_SIGNUP_SUCCESS",
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_SIGNUP = "AUTH_SIGNUP",
  AUTH_SET_TOKEN = "AUTH_SET_TOKEN",
  AUTH_CHECK_TOKEN = "AUTH_SET_TOKEN",
}

export interface AuthFail {
  type: AUTH_ACTIONS.AUTH_FAIL;
  message: string;
}

export interface AuthLogout {
  type: AUTH_ACTIONS.AUTH_LOGOUT;
}

export interface AuthSetToken {
  type: AUTH_ACTIONS.AUTH_SET_TOKEN;
}
export interface AuthCheckToken {
  type: AUTH_ACTIONS.AUTH_CHECK_TOKEN;
}

export interface AuthMain {
  type: AUTH_ACTIONS.AUTH_LOGIN | AUTH_ACTIONS.AUTH_SIGNUP;
  token?: string;
  user?: UserInterface;
}

export interface AuthSuccess {
  type: AUTH_ACTIONS.AUTH_LOGIN_SUCCESS | AUTH_ACTIONS.AUTH_SIGNUP_SUCCESS;
  token: string;
  user: UserInterface;
}

export type AuthDispatchTypes =
  | AuthFail
  | AuthSuccess
  | AuthMain
  | AuthCheckToken
  | AuthLogout;

export const UserLogin = (form: { username: string; password: string }) => ({
  type: AUTH_ACTIONS.AUTH_LOGIN,
  form,
});
export const UserSignup = (form: { username: string; password: string }) => ({
  type: AUTH_ACTIONS.AUTH_SIGNUP,
  form,
});

export const UserLoginSuccess = (user: UserInterface, token: string) => ({
  type: AUTH_ACTIONS.AUTH_LOGIN_SUCCESS,
  token,
  user,
});

export const UserLogout =
  () => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch<AuthLogout>({
      type: AUTH_ACTIONS.AUTH_LOGOUT,
    });
  };

export const UserSignUpLoginSuccess =
  (user: UserInterface, token: string) =>
  async (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch<AuthSuccess>({
      type: AUTH_ACTIONS.AUTH_SIGNUP_SUCCESS,
      token,
      user,
    });
  };

export const UserAuthFail =
  (message: string) => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch<AuthFail>({
      type: AUTH_ACTIONS.AUTH_FAIL,
      message,
    });
  };

export const UserCheckTokenSuccess =
  (user: UserInterface, token: string) =>
  async (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch<AuthSuccess>({
      type: AUTH_ACTIONS.AUTH_LOGIN_SUCCESS,
      token,
      user,
    });
  };
