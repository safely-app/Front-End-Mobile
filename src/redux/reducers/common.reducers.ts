import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
    error: any;
    condition: string;
}

const initialState: ErrorState = {
    error: {},
    condition: ""
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        request: (state) => {
            state.condition = "request"
        },
        failure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.condition = "failed";
        },
        resetFetch: (state) => {
            state.error = {};
            state.condition = "";
        }
    }
});

export const { request, failure, resetFetch } = commonSlice.actions;
export default commonSlice.reducer;