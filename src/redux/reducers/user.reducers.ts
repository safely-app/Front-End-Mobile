import {SET_AUTHENTICATED, USER_CREATED, UserActionTypes, SET_UNAUTHENTICATED, GET_USER, UserInterface} from '../types';

interface UserState {
  credentials: UserInterface;
}

const initialState: UserState = {
  credentials: {
    _id: "",
    email: "",
    token: "",
    username: "",
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
          token: '',
          username: ''
        }
      }
    }
    case GET_USER: {
      return {
        ...state,
        credentials: {
          ...state.credentials,
          email: action.payload.email,
          username: action.payload.username,
        }
      }
    }
    default:
      return state;
  }
}
