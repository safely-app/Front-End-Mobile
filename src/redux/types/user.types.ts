// user reducer types
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';
export const USER_CREATED = 'USER_CREATED';
export const LOADING_USER = 'LOADING_USER';
export const GET_USER_INFOS = 'GET_USER_INFOS';

export interface UserInterface {
  _id: string;
  email: string;
  token: string;
  username: string;
}

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

export interface UserGetInformation {
  id: string,
  username: string,
  email: string,
  role: string,
  createdAt: string,
  updatedAt: string
}

interface UserLoginAction {
  type: typeof SET_AUTHENTICATED;
  payload: UserLoginInterface;
}

interface UserRegisterAction {
  type: typeof CREATE_USER;
  payload: UserRegisterInterface;
}

interface UserGetInfosAction {
  type: typeof GET_USER_INFOS;
  payload: UserGetInformation;
}

export type UserActionTypes = UserLoginAction | UserRegisterAction | UserGetInfosAction;
