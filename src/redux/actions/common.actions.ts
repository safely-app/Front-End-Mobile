import {ActionCreator} from 'redux';
import {FETCH_REQUEST, FETCH_FAILURE, FetchActionTypes, FETCH_RESET} from '../types';

export const request: ActionCreator<FetchActionTypes> = () => {
  return {type: FETCH_REQUEST};
};

export const failure: ActionCreator<FetchActionTypes> = (error: any) => {
  return {type: FETCH_FAILURE, payload: error};
};

export const resetFetch: ActionCreator<FetchActionTypes> = () => {
  return {type: FETCH_RESET}
};
