import {combineReducers} from 'redux';
import userReducer from './user.reducers';

export const rootReducer = combineReducers({
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export * from './user.reducers';
