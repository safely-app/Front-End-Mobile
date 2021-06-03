// user reducer types
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';
export const USER_CREATED = 'USER_CREATED';
export const LOADING_USER = 'LOADING_USER';
export const GET_USER = 'GET_USER';

export interface UserInterface {
  _id: string;
  email: string;
  token: string;
  username: string;
}

interface UserLoginAction {
  type: typeof SET_AUTHENTICATED;
  payload: UserInterface;
}

interface UserRegisterAction {
  type: typeof USER_CREATED;
  payload: UserInterface;
}

interface UserGetInfosAction {
  type: typeof GET_USER;
  payload: UserInterface;
}

export type UserActionTypes = UserLoginAction | UserRegisterAction | UserGetInfosAction;
