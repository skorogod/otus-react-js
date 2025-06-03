import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Alert,
  Snackbar,
  InputLabel,
} from "@mui/material";
import { RootState, AppDispatch } from "src/app/store";
import {
  fetchOrders,
  selectOrdersStatus,
  updateOrderStatus,
  setStatusFilter,
  selectStatusFilter,
} from "../../state/ordersSlice";
import { OrderStatus } from "../../state/interface";
import { SelectChangeEvent } from "@mui/material";

export const OrderPannel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.entities);
  const status = useSelector(selectOrdersStatus);
  const pagination = useSelector((state: RootState) => state.orders.pagination);
  const statusFilter = useSelector(selectStatusFilter);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch, statusFilter]);

  const handleChangePage = () => {
    dispatch(fetchOrders());
  };

  const handleChangeRowsPerPage = () => {
    dispatch(fetchOrders());
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      setLoadingOrderId(orderId);
      await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();
    } catch (err) {
      setError("Ошибка при обновлении статуса заказа");
    } finally {
      setLoadingOrderId(null);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    dispatch(setStatusFilter(event.target.value as OrderStatus | null));
    dispatch(fetchOrders());
  };

  const handleCloseError = () => {
    setError(null);
  };

  const getStatusText = (orderStatus: OrderStatus) => {
    const statusMap = {
      [OrderStatus.PendingConfirmation]: "Ожидает подтверждения",
      [OrderStatus.Processing]: "В обработке",
      [OrderStatus.Packaging]: "Упаковка",
      [OrderStatus.WaitingForDelivery]: "Ожидает доставки",
      [OrderStatus.InTransit]: "В пути",
      [OrderStatus.Delivered]: "Доставлен",
      [OrderStatus.ReturnRequested]: "Запрошен возврат",
      [OrderStatus.OrderCancelled]: "Отменён",
    };
    return statusMap[orderStatus];
  };

  if (status === "pending") {
    return <Typography>Загрузка...</Typography>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Фильтр по статусу</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter || ""}
            onChange={handleFilterChange}
            label="Фильтр по статусу"
          >
            <MenuItem value="">Все заказы</MenuItem>
            {Object.values(OrderStatus).map((statusValue) => (
              <MenuItem key={statusValue} value={statusValue}>
                {getStatusText(statusValue)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="таблица заказов">
          <TableHead>
            <TableRow>
              <TableCell>ID заказа</TableCell>
              <TableCell>Дата создания</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Количество товаров</TableCell>
              <TableCell>Общая сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(orders).map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as OrderStatus
                        )
                      }
                      displayEmpty
                      disabled={loadingOrderId === order.id}
                    >
                      {Object.values(OrderStatus).map((statusValue) => (
                        <MenuItem key={statusValue} value={statusValue}>
                          {getStatusText(statusValue)}
                        </MenuItem>
                      ))}
                    </Select>
                    {loadingOrderId === order.id && (
                      <CircularProgress
                        size={20}
                        sx={{
                          position: "absolute",
                          right: 30,
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      />
                    )}
                  </FormControl>
                </TableCell>
                <TableCell>{order.products.length}</TableCell>
                <TableCell>
                  {order.products.reduce(
                    (sum, item) => sum + item.product.price * item.quantity,
                    0
                  )}{" "}
                  ₽
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.totalPages * pagination.limit}
        rowsPerPage={pagination.limit}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице:"
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
