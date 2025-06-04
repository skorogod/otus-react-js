import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { productsService } from "src/api/services/product/productFactory";
import { TProduct } from "src/interfaces/product.interface";
import {
  TGetProductsParams,
  TNewProduct,
  TUpdateProductParams,
} from "src/api/services/product/interfaces";

type TProductsState = {
  updateProductId: TProduct["id"] | null;
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
  updateProductId: null,
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
  async (params: TGetProductsParams) => {
    const products = await productsService.getAll({
      ...params,
    });
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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: TUpdateProductParams) => {
    const result = await productsService.update(id, data);
    return result;
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
    setUpdateProductId: (state, action) => {
      state.updateProductId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.fulfilled, (state, action) => {
        productsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload.pagination.pageNumber === 1) {
          return productsAdapter.setAll(state, action.payload.data);
        }
        return productsAdapter.upsertMany(state, action.payload.data);
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
export const {
  updateProductsPaginationPage,
  setProductsError,
  setUpdateProductId,
} = productsSlice.actions;

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

export const selectUpdateProductId = (state: RootState) =>
  state.products.updateProductId;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductsPagination = (state: RootState) =>
  state.products.pagination;
