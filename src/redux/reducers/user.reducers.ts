import { UserLoginCredentials } from '../types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userServices } from '../../services';

interface UserState {
  credentials: {
    id: string,
    hashedId: string,
    email: string,
    token: string
    username: string
    role: string
  };
  timestamp: {
    createdAt: string,
    updatedAt: string
  };
  statusResponse: {response: {status: string, errorMsg: string}}
}

const initialState: UserState = {
  credentials: {
    id: "",
    hashedId: "",
    email: "",
    token: "",
    username: "",
    role: ""
  },
  timestamp: {
    createdAt: "",
    updatedAt: ""
  },
  statusResponse: {
    response: {status: "", errorMsg: ""}
  }
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
      if (state.statusResponse.response) {
        state.statusResponse.response = {status: "", errorMsg: ""};
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.statusResponse.response = {status: "Fetch pending", errorMsg: ""};
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.statusResponse.response.status = "Fetch success";
      state.credentials.id = action.payload.data._id;
      state.credentials.email = action.payload.data.email;
      state.credentials.token = action.payload.data.token;
      state.credentials.hashedId = action.payload.data.hashedId;
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.statusResponse.response.errorMsg = "Fetch failed";
    })
    builder.addCase(registerUser.pending, (state) => {
      state.statusResponse.response = {status: "Fetch pending", errorMsg: ""};
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.statusResponse.response.status = "Fetch success";
      state.credentials.id = action.payload.data._id;
      state.credentials.email = action.payload.data.email;
      state.credentials.token = action.payload.data.token;
      state.credentials.hashedId = action.payload.data.hashedId;
    })
    builder.addCase(registerUser.rejected, (state) => {
      state.statusResponse.response.errorMsg = "Fetch failed";
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.statusResponse.response.status = "Fetch success";
      state.credentials.username = action.payload.data.username;
      state.credentials.email = action.payload.data.email;
      state.credentials.id = action.payload.data._id;
      state.credentials.role = action.payload.data.role;
      state.timestamp.createdAt = action.payload.data.createdAt;
      state.timestamp.updatedAt = action.payload.data.updatedAt;
    })
  }
});

export const { logoutUser, resetFetchStatus } = userSlice.actions;
export default userSlice.reducer;