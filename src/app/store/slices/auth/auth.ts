import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TAuthState } from "./interface";
import type {
  AuthCredentials,
  AuthResponse,
  SignUpResponse,
  TGetProfileResponse,
} from "src/api/services/auth/interface";
import { authService } from "src/api/services/auth/authFactory";
import { RootState } from "../..";
import { TApiResponseError } from "src/api/services/base/interface";

export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refresh_token";

const initialState: TAuthState = {
  token: null,
  refreshToken: null,
  user: null,
  error: "",
};

export const login = createAsyncThunk<AuthResponse, AuthCredentials>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userData = await authService.login({ email, password });
      return userData;
    } catch (error) {
      const apiError = error as TApiResponseError;
      if (apiError.response?.data.errors[0]) {
        return rejectWithValue(apiError.response.data.errors[0].message);
      }
      throw error;
    }
  }
);

export const signup = createAsyncThunk<SignUpResponse, AuthCredentials>(
  "auth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userData = await authService.signup({ email, password });
      return userData;
    } catch (error) {
      const apiError = error as TApiResponseError;
      if (apiError.response?.data.errors) {
        return rejectWithValue(apiError.response.data.errors[0].message);
      }
      throw error;
    }
  }
);

export const getProfile = createAsyncThunk<TGetProfileResponse>(
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
        state.token = action.payload.token;
        state.refreshToken = action.payload.token;
        state.user = {
          id: action.payload.profile._id,
          email: action.payload.profile.email,
        };
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = action.error.message || "Произошла ошибка";
        }
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = {
          id: action.payload.profile._id,
          email: action.payload.profile.email,
        };
      })
      .addCase(signup.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = action.error.message || "Произошла ошибка";
        }
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
      });
  },
});

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { dispatch }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      dispatch(authSlice.actions.setToken());
      dispatch(getProfile());
    }
  }
);

export const selectAuthError = (state: RootState) => state.auth.error;

export const authReducer = authSlice.reducer;
