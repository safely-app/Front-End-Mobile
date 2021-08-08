import {ActionCreator} from 'redux';
import {request, failure} from './common.actions';
import {userServices} from '../../services';
import {SET_AUTHENTICATED, UserActionTypes, USER_CREATED, SET_UNAUTHENTICATED, GET_USER, UserInterface} from '../types';
import { Dispatch } from 'redux';

export const loginUserSuccess: ActionCreator<UserActionTypes> = (
  credentials: UserInterface,
) => {
  return {type: SET_AUTHENTICATED, payload: credentials};
};

const registerUserSuccess: ActionCreator<UserActionTypes> = (credentials: UserInterface) => {
  return {type: USER_CREATED, payload: credentials};
};

export const logoutUser = () => {
  return {type: SET_UNAUTHENTICATED}
};

export const getUserAction: ActionCreator<UserActionTypes> = (credentials: UserInterface) => {
  return {type: GET_USER, payload: credentials}
};

export function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return (dispatch: Dispatch) => {
    dispatch(request());
    return userServices
      .login({username, password})
      .then(response => {
        dispatch(loginUserSuccess(response));
      })
      .catch(error => {
        dispatch(failure('Login failed'));
      });
  };
}

export function registerUser({username, email, password}: {username: string, email: string, password: string}) {
  return (dispatch: Dispatch) => {
    dispatch(request());
    return userServices
      .register({username, password, email})
      .then(response => {
        dispatch(registerUserSuccess(response));
      })
      .catch(error => {
        dispatch(failure('Register failed'));
      });
  };
}

export function getUser(userId: string, token: string) {
  return (dispatch: Dispatch) => {
    dispatch(request());
    return userServices
    .getUser(token, userId)
    .then(response => {
      dispatch(getUserAction(response));
    })
    .catch(error => {
      dispatch(failure('Cannot get user info'));
    })
  }
}