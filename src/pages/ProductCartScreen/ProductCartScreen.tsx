import React, { FC } from "react";
import { ProductCartList } from "../../shared/productCartList/ProductCartList";
import styles from "./productCartScreen.module.scss";
import { useSelector } from "react-redux";
import { selectCartProductsWithCount } from "src/app/store/slices/cart/cart.slice";

export const ProductCartScreen: FC = () => {
  const products = useSelector(selectCartProductsWithCount);
  return (
    <div className={styles.productCartScreen}>
      <h1 className={styles.title}>Корзина</h1>
      <ProductCartList products={products} />
    </div>
  );
};
