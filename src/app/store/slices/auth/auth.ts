import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TAuthState } from "./interface";
import type {
  AuthCredentials,
  AuthResponse,
} from "src/api/services/auth/interface";
import { authService } from "src/api/services/auth/authFactory";

export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refresh_token";

const initialState: TAuthState = {
  token: null,
  refreshToken: null,
  user: null,
};

export const login = createAsyncThunk<AuthResponse, AuthCredentials>(
  "auth/login",
  async ({ username, password }) => {
    const userData = await authService.login({ username, password });
    return userData;
  }
);

export const getProfile = createAsyncThunk<AuthResponse>(
  "auth/getProfile",
  async () => {
    const userData = await authService.getProfile();
    return userData;
  }
);

export const refreshToken = createAsyncThunk<AuthResponse>(
  "auth/refreshToken",
  async () => {
    const userData = await authService.refreshToken();
    return userData;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state) => {
      state.token = localStorage.getItem(TOKEN_KEY);
      state.refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log("FullFIELD", action.payload);
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      });
  },
});

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { dispatch }) => {
    console.log("initialize");
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      dispatch(authSlice.actions.setToken());
      dispatch(getProfile());
    }
  }
);

export const authReducer = authSlice.reducer;
