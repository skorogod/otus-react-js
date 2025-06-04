import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Order } from "../../../interfaces/order.interface";
import { RootState } from "../../../app/store";
import { TApiResponseError } from "../../../api/services/base/interface";
import { orderService } from "../../../api/services/order/orderService";
import {
  TAddOrderParams,
  TGetOrdersResponse,
} from "../../../api/services/order/interfaces";
import { clearCart } from "../../../features/cart/cart.slice";
import { OrderStatus } from "./interface";

const ordersAdapter = createEntityAdapter<Order>();

type TOrdersState = {
  status: "idle" | "pending" | "failed" | "success";
  error: string;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
  statusFilter: OrderStatus | null;
};

const initialState = ordersAdapter.getInitialState<TOrdersState>({
  status: "idle",
  error: "",
  pagination: {
    page: 1,
    limit: 20,
    totalPages: 1,
  },
  statusFilter: null,
});

export const fetchOrders = createAsyncThunk<TGetOrdersResponse, void>(
  "orders/fetchOrders",
  async (_, storeApi) => {
    const state = storeApi.getState() as RootState;
    const orders = await orderService.getAll({
      pagination: {
        pageNumber: state.orders.pagination.page,
        pageSize: state.orders.pagination.limit,
      },
      status: state.orders.statusFilter || undefined,
    });
    return orders;
  }
);

export const updateOrderStatus = createAsyncThunk<
  Order,
  { orderId: string; status: OrderStatus }
>("orders/updateStatus", async ({ orderId, status }, { rejectWithValue }) => {
  try {
    const data = await orderService.updateStatus(orderId, status);
    return data;
  } catch (error) {
    const apiError = error as TApiResponseError;
    if (apiError.response?.data.errors[0]) {
      return rejectWithValue(apiError.response.data.errors[0].message);
    }
    throw error;
  }
});

export const addOrder = createAsyncThunk<Order, TAddOrderParams>(
  "orders/addOrder",
  async (newCategory, { rejectWithValue, dispatch }) => {
    try {
      const data = await orderService.create(newCategory);
      dispatch(clearCart());
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

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersStatus: (state, action) => {
      state.status = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.pagination.page = 1; // Сбрасываем страницу при изменении фильтра
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchOrders.fulfilled, (state, action) => {
        if (action.payload.pagination.pageNumber === 1) {
          return ordersAdapter.setAll(state, action.payload.data);
        }
        return ordersAdapter.upsertMany(state, action.payload.data);
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = "success";
        ordersAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        ordersAdapter.upsertOne(state, action.payload);
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
export const { setOrdersStatus, setStatusFilter } = ordersSlice.actions;

export const selectOrdersStatus = (state: RootState) => state.orders.status;
export const selectStatusFilter = (state: RootState) =>
  state.orders.statusFilter;
