import {SET_AUTHENTICATED, USER_CREATED, UserLoginInterface, UserActionTypes, SET_UNAUTHENTICATED} from '../types';

interface UserState {
  credentials: UserLoginInterface;
}

const initialState: UserState = {
  credentials: {
    _id: null,
    email: null,
    token: null,
  },
};

export function userReducer(
  state: UserState = initialState,
  action: UserActionTypes,
): UserState {
  switch (action.type) {
    case SET_AUTHENTICATED: {
      return {
        ...state,
        credentials: {
          ...state.credentials,
          _id: action.payload._id,
          email: action.payload.email,
          token: action.payload.token,
        }
      };
    }
    case USER_CREATED: {
      return {
        ...state,
        credentials: {
          ...state.credentials,
          _id: action.payload._id,
          email: action.payload.email,
          token: action.payload.token,
        }
      };
    }
    case SET_UNAUTHENTICATED: {
      return {
        ...state,
        credentials: {
          ...state.credentials,
          _id: '',
          email: '',
          token: ''
        }
      }
    }
    default:
      return state;
  }
}
