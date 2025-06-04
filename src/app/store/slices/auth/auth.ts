import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { TAuthState } from "./interface";
import type {
  AuthCredentials,
  AuthResponse,
  SignUpCredentials,
  SignUpResponse,
  TGetProfileResponse,
} from "@/api/services/auth/interface";
import { authService } from "@/api/services/auth/authFactory";
import { RootState } from "../..";
import { TApiResponseError } from "@/api/services/base/interface";
import { updateProfile } from "../profile/profileSlice";

export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refresh_token";

const initialState: TAuthState = {
  token: null,
  refreshToken: null,
  user: null,
  error: "",
  status: "idle",
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

export const signup = createAsyncThunk<SignUpResponse, SignUpCredentials>(
  "auth/signup",
  async ({ email, name, password }, { rejectWithValue }) => {
    try {
      const userData = await authService.signup({ email, name, password });
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

const pendingMatcher = isAnyOf(login.pending, signup.pending);
const fulfilledMatcher = isAnyOf(login.fulfilled, signup.fulfilled);
const rejectedMatcher = isAnyOf(login.rejected, signup.rejected);

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
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.token;
        state.user = {
          ...action.payload.profile,
          id: action.payload.profile._id,
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
          ...action.payload.profile,
          id: action.payload.profile._id,
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
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(pendingMatcher, (state) => {
        state.status = "loading";
      })
      .addMatcher(fulfilledMatcher, (state) => {
        state.status = "idle";
      })
      .addMatcher(rejectedMatcher, (state) => {
        state.status = "failed";
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

export const { setAuthError } = authSlice.actions;

export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
export const selectProfile = (state: RootState) => state.auth.user;
export const selectUserId = createSelector(selectUser, (user) => user?.id);
export const selectAuthStatus = (state: RootState) => state.auth.status;

export const authReducer = authSlice.reducer;
