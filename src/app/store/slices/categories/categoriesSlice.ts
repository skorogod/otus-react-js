import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { Category } from "src/interfaces/category.interface";
import { categoryService } from "src/api/services/category/category.service";
import { RootState } from "../..";

const categoriesAdapter = createEntityAdapter<Category>();
const initialState = categoriesAdapter.getInitialState({
  page: 1,
  limit: 10,
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, storeApi) => {
    const state = storeApi.getState() as RootState;
    const categories = await categoryService.getAll({
      page: state.categories.page,
      limit: state.categories.limit,
    });
    return categories.data;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchCategories.fulfilled, (state, action) => {
      categoriesAdapter.setAll(state, action.payload);
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const { selectAll: selectCategories } = categoriesAdapter.getSelectors(
  (state: RootState) => state.categories
);
