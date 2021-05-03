// user reducer types
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';
export const USER_CREATED = 'USER_CREATED';
export const LOADING_USER = 'LOADING_USER';

export interface UserLoginInterface {
  _id: string;
  email: string;
  token: string;
}

export interface UserRegisterInterface {
  _id: string;
  username: string;
  email: string;
  token: string;
}

interface UserLoginAction {
  type: typeof SET_AUTHENTICATED;
  payload: UserLoginInterface;
}

interface UserRegisterAction {
  type: typeof CREATE_USER;
  payload: UserRegisterInterface;
}

export type UserActionTypes = UserLoginAction | UserRegisterAction;
