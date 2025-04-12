import React, { FC } from "react";
import { ProductCartList } from "../../shared/productCartList/ProductCartList";
import styles from "./productCartScreen.module.scss";

export const ProductCartScreen: FC = () => (
  <div className={styles.productCartScreen}>
    <h1 className={styles.title}>Корзина</h1>
    <ProductCartList />
  </div>
);
