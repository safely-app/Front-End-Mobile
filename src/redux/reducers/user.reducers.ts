import {SET_AUTHENTICATED, USER_CREATED, UserLoginInterface, UserActionTypes, SET_UNAUTHENTICATED, GET_USER_INFOS, UserInterface} from '../types';

interface UserState {
  credentials: UserInterface;
}

const initialState: UserState = {
  credentials: {
    _id: null,
    email: null,
    token: null,
    username: null,
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
    case GET_USER_INFOS: {
      console.log('reducer');
      console.log(action.payload);
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
