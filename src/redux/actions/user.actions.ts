import {ActionCreator} from 'redux';
import {request, failure} from './common.actions';
import {userServices} from '../../services';
import {SET_AUTHENTICATED, UserLoginInterface, UserActionTypes, UserRegisterInterface, USER_CREATED, SET_UNAUTHENTICATED, UserGetInformation, GET_USER_INFOS} from '../types';

const loginUserSuccess: ActionCreator<UserActionTypes> = (
  credentials: UserLoginInterface,
) => {
  return {type: SET_AUTHENTICATED, payload: credentials};
};

const registerUserSuccess: ActionCreator<UserActionTypes> = (credentials: UserRegisterInterface) => {
  return {type: USER_CREATED, payload: credentials};
};

export const logoutUser = () => {
  return {type: SET_UNAUTHENTICATED}
};

export const getUserAction: ActionCreator<UserActionTypes> = (credentials: UserGetInformation) => {
  return {type: GET_USER_INFOS, payload: credentials}
};

export function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return dispatch => {
    dispatch(request());
    return userServices
      .login({username, password})
      .then(response => {
        console.log(response);
        dispatch(loginUserSuccess(response));
      })
      .catch(error => {
        dispatch(failure('Login failed'));
      });
  };
}

export function registerUser({username, email, password}: {username: string, email: string, password: string}) {
  return dispatch => {
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
  return dispatch => {
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