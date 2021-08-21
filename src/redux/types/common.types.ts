export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_RESET = 'FETCH_RESET';

interface FetchRequestAction {
  type: typeof FETCH_REQUEST;
}

interface FetchFailureAction {
  type: typeof FETCH_FAILURE;
  payload: any;
}

interface FetchResetAction {
  type: typeof FETCH_RESET;
}

export type FetchActionTypes = FetchRequestAction | FetchFailureAction | FetchResetAction;
