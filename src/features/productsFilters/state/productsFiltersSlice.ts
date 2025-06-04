import { createSlice } from "@reduxjs/toolkit";
import type { TProductsFiltersState } from "./interface";
import { RootState } from "@/app/store";

const initialState: TProductsFiltersState = {
  sortType: "DESC",
  sortField: "createdAt",
  name: "",
  categoryIds: undefined,
};

const productsFiltersSlice = createSlice({
  name: "productsFilters",
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setProductsFiltersName: (state, action) => {
      state.name = action.payload;
    },
    setCategoryIds: (state, action) => {
      state.categoryIds = action.payload;
    },
  },
});

export const productsFiltersReducer = productsFiltersSlice.reducer;
export const {
  setSortType,
  setSortField,
  setProductsFiltersName,
  setCategoryIds,
} = productsFiltersSlice.actions;

export const selectProductsSortType = (state: RootState) =>
  state.productsFilters.sortType;
export const selectProductsSortField = (state: RootState) =>
  state.productsFilters.sortField;
export const selectProductsFiltersNAme = (state: RootState) =>
  state.productsFilters.name;

export const selectProductsCategoryIds = (state: RootState) =>
  state.productsFilters.categoryIds;
