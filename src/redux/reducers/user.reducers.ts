import { User, UserLoginCredentials } from '../types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userServices } from '../../services';

interface UserState {
  credentials: User;
}

const initialState: UserState = {
  credentials: {
    _id: "",
    email: "",
    token: "",
    username: "",
    response: {status: "", errorMsg: ""}
  },
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: UserLoginCredentials, thunkAPI) => {
    const response = await userServices.login({username: credentials.email, password: credentials.password});
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (credentials: {username: string, email: string, password: string}, thunkAPI) => {
    const response = await userServices.register({username: credentials.email, password: credentials.password, email: credentials.email});
    return response;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (credentials: {userId: string, token: string}, thunkAPI) => {
    const response = await userServices.getUser(credentials.token, credentials.userId);
    return response
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: state => initialState,
    resetFetchStatus: (state) => {
      if (state.credentials.response) {
        state.credentials.response = {status: "", errorMsg: ""};
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.credentials.response = {status: "Fetch pending", errorMsg: ""};
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.credentials.response.status = "Fetch success";
      state.credentials = action.payload;
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.credentials.response.errorMsg = "Fetch failed";
    })
    builder.addCase(registerUser.pending, (state) => {
      state.credentials.response = {status: "Fetch pending", errorMsg: ""};
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.credentials = action.payload;
    })
    builder.addCase(registerUser.rejected, (state) => {
      state.credentials.response.errorMsg = "Fetch failed";
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.credentials.username = action.payload.username;
      state.credentials.email = action.payload.email;
      state.credentials._id = action.payload._id;
    })
  }
});

export const { logoutUser, resetFetchStatus } = userSlice.actions;
export default userSlice.reducer;