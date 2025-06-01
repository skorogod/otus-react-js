import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { productsService } from "src/api/services/product/productFactory";
import { TGetReourceParams } from "src/api/services/common.interface";
import { TProduct } from "src/interfaces/product.interface";
import { TNewProduct } from "src/api/services/product/interfaces";

type TProductsState = {
  status: "idle" | "pending" | "failed";
  error: string;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
};

const productsAdapter = createEntityAdapter<TProduct>();
const initialState = productsAdapter.getInitialState<TProductsState>({
  status: "idle",
  error: "",
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
    return products.data;
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (newProduct: TNewProduct) => {
    const data = await productsService.create(newProduct);
    return data;
  }
);

const pendingMatcher = isAnyOf(addNewProduct.pending);
const fulfilledMatcher = isAnyOf(
  addNewProduct.fulfilled,
  fetchProducts.fulfilled
);
const rejectedMatcher = isAnyOf(fetchProducts.rejected, addNewProduct.rejected);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductsPaginationPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
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
      })
      .addMatcher(pendingMatcher, (state) => {
        state.error = "";
        state.status = "pending";
      })
      .addMatcher(fulfilledMatcher, (state) => {
        state.status = "idle";
      })
      .addMatcher(rejectedMatcher, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error";
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const { updateProductsPaginationPage, setProductsError } =
  productsSlice.actions;

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state: RootState) => state.products);

export const selectProductsWithCartCount = createSelector(
  selectProducts,
  (state: RootState) => state.cart.items,
  (products, productsInCart) =>
    products.map((product) => ({
      ...product,
      cartCount: productsInCart[product.id]?.quantity || 0,
    }))
);

export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductsPagination = (state: RootState) =>
  state.products.pagination;
