import {combineReducers} from 'redux';
import userReducer from './user.reducers';
import commonReducer from './common.reducers';
import { request, failure, resetFetch } from './common.reducers';
// import * from './user.reducers';

export const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export * from './user.reducers';
// export { request, failure, resetFetch, loginUser, registerUser, getUser, logoutUser };
