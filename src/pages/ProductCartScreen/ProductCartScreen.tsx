import React, { FC } from "react";
import { ProductCartList } from "../../shared/productCartList/ProductCartList";
import styles from "./productCartScreen.module.scss";
import { useSelector } from "react-redux";
import { selectCartProductsWithCount } from "@/features/cart/cart.slice";
import { Button, Box, Typography } from "@mui/material";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import {
  addOrder,
  selectOrdersStatus,
  setOrdersStatus,
} from "@/features/orders/state/ordersSlice";
import { OrderStatus } from "@/features/orders/state/interface";
import { Modal } from "@/shared/modal/Modal";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import cn from "clsx";

export const ProductCartScreen: FC = () => {
  const products = useSelector(selectCartProductsWithCount);
  const dispatch = useAppDispatch();
  const ordersStatus = useAppSelector(selectOrdersStatus);

  const onModalClose = () => {
    dispatch(setOrdersStatus("idle"));
  };

  const onCreateOrderClick = () => {
    dispatch(
      addOrder({
        products: products.map((product) => ({
          id: product.id,
          quantity: product.counter,
        })),
        status: OrderStatus.PendingConfirmation,
      })
    );
  };

  return (
    <div className={styles.productCartScreen}>
      <h1 className={styles.title}>Корзина</h1>
      {Boolean(products.length) && (
        <Box component="div" className={cn(styles.btnContainer)}>
          <Button
            variant="contained"
            color="success"
            onClick={onCreateOrderClick}
          >
            Оформить заказ
          </Button>
        </Box>
      )}
      <ProductCartList products={products} />
      <Modal
        className={cn(styles.statusModal)}
        onCloseClick={onModalClose}
        visible={ordersStatus === "success"}
      >
        <Box>
          <Typography>Заказ успешно создан</Typography>
          <Button color="success" onClick={onModalClose}>
            ОК
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
