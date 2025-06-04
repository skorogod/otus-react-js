import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { Category } from "src/interfaces/category.interface";
import { categoryService } from "src/api/services/category/category.service";
import { RootState } from "src/app/store";
import { TAddCategory } from "src/api/services/category/interfaces";
import { TApiResponseError } from "src/api/services/base/interface";

type TCategoriesState = {
  status: "idle" | "pending" | "failed";
  error: string;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
};

const categoriesAdapter = createEntityAdapter<Category>();
const initialState = categoriesAdapter.getInitialState<TCategoriesState>({
  status: "idle",
  error: "",
  pagination: {
    page: 1,
    limit: 20,
    totalPages: 1,
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, storeApi) => {
    const state = storeApi.getState() as RootState;
    const categories = await categoryService.getAll({
      pagination: {
        pageNumber: state.categories.pagination.page,
        pageSize: state.categories.pagination.limit,
      },
    });
    return categories.data;
  }
);

export const addCategory = createAsyncThunk<Category, TAddCategory>(
  "categories/addCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const data = await categoryService.create(newCategory);
      return data;
    } catch (error) {
      const apiError = error as TApiResponseError;
      if (apiError.response?.data.errors[0]) {
        return rejectWithValue(apiError.response.data.errors[0].message);
      }
      throw error;
    }
  }
);

const pendingMatcher = isAnyOf(addCategory.pending);
const fulfilledMatcher = isAnyOf(addCategory.fulfilled);
const rejectedMatcher = isAnyOf(addCategory.rejected);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoriesStatus: (state, action) => {
      state.status = action.payload;
    },
    setCategoriesError: (state, action) => {
      state.error = action.payload;
    },
    updateCategoriesPaginationPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchCategories.fulfilled, (state, action) => {
        categoriesAdapter.upsertMany(state, action.payload);
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        categoriesAdapter.upsertOne(state, action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = action.error.message || "Произошла ошибка";
        }
      })
      .addMatcher(pendingMatcher, (state) => {
        state.status = "pending";
      })
      .addMatcher(fulfilledMatcher, (state) => {
        state.status = "idle";
      })
      .addMatcher(rejectedMatcher, (state) => {
        state.status = "failed";
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const { selectAll: selectCategories } = categoriesAdapter.getSelectors(
  (state: RootState) => state.categories
);

export const selectCategoriesPagination = (state: RootState) =>
  state.categories.pagination;

export const {
  setCategoriesError,
  setCategoriesStatus,
  updateCategoriesPaginationPage,
} = categoriesSlice.actions;

export const selectCategoriesStatus = (state: RootState) =>
  state.categories.status;
export const selectCategoriesError = (state: RootState) =>
  state.categories.error;
