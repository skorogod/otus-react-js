import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import { productsService } from "src/api/services/product/productFactory";
import { TGetReourceParams } from "src/api/services/common.interface";
import { TProduct } from "src/interfaces/product.interface";
import { TNewProduct } from "src/api/services/product/interfaces";

const productsAdapter = createEntityAdapter<TProduct>();
const initialState = productsAdapter.getInitialState({
  pagination: {
    page: 1,
    limit: 20,
    totalPages: 1,
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }: TGetReourceParams) => {
    const products = await productsService.getAll({ page, limit });
    return products;
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (newProduct: TNewProduct) => {
    const data = await productsService.create(newProduct);
    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductsPaginationPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const newEntities: Record<string, TProduct> = {};
        action.payload.forEach((product) => {
          newEntities[product.id] = product;
        });
        productsAdapter.upsertMany(state, newEntities);
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        productsAdapter.upsertOne(state, action.payload);
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const { updateProductsPaginationPage } = productsSlice.actions;

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state: RootState) => state.products);

export const selectProductsPagination = (state: RootState) =>
  state.products.pagination;
