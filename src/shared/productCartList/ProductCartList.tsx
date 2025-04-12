import React, { FC } from "react";
import { ProductInCart } from "../productInCart/ProductInCart";
import { TProduct } from "../../interfaces/product.interface";
import styles from "./productCartList.module.scss";

export const ProductCartList: FC = () => {
  // Здесь будет логика получения товаров из хранилища
  const products: (TProduct & { counter: number })[] = [];

  if (products.length === 0) {
    return <div className={styles.emptyCart}>Ваша корзина пуста</div>;
  }

  return (
    <div className={styles.productCartList}>
      {products.map((product) => (
        <ProductInCart key={product.id} {...product} />
      ))}
    </div>
  );
};
