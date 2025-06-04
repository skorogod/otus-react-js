import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TUpdateProfileData } from "@/api/services/profile/interface";
import { profileService } from "@/api/services/profile/profile.service";
import { TProfileState } from "./interfaces";
import { TStatus } from "../types";
import { RootState } from "../..";
import { TChangeProfilePasswordParams } from "@/api/services/auth/interface";
import { TApiResponseError } from "@/api/services/base/interface";

const initialState: TProfileState = {
  status: "idle",
  error: "",
};

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data: TUpdateProfileData, { rejectWithValue }) => {
    try {
      const profile = await profileService.updateProfile(data);
      return profile;
    } catch (error) {
      const apiError = error as TApiResponseError;
      if (apiError.response?.data.errors[0]) {
        return rejectWithValue(apiError.response.data.errors[0].message);
      }
      throw error;
    }
  }
);

export const changeProfilePassword = createAsyncThunk<
  { success: boolean },
  TChangeProfilePasswordParams
>("profile/changePassword", async (data, { rejectWithValue }) => {
  try {
    const result = await profileService.changeProfilePassword(data);
    return result;
  } catch (error) {
    const apiError = error as TApiResponseError;
    if (apiError.response?.data.errors[0]) {
      return rejectWithValue(apiError.response.data.errors[0].message);
    }
    throw error;
  }
});

const pendingMatcher = isAnyOf(
  updateProfile.pending,
  changeProfilePassword.pending
);
const fulfilledMatcher = isAnyOf(
  updateProfile.fulfilled,
  changeProfilePassword.fulfilled
);
const rejectedMatcher = isAnyOf(
  updateProfile.rejected,
  changeProfilePassword.rejected
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<TStatus>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addMatcher(pendingMatcher, (state) => {
        state.status = "loading";
      })
      .addMatcher(fulfilledMatcher, (state) => {
        state.status = "idle";
      })
      .addMatcher(rejectedMatcher, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = action.error.message || "Error";
        }
      });
  },
});

export const selectProfileStatus = (state: RootState) => state.profile.status;
export const selectProfileError = (state: RootState) => state.profile.error;

export const profileReducer = profileSlice.reducer;
export const { setStatus, setError } = profileSlice.actions;
