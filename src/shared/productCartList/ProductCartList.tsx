import React, { FC } from "react";
import { ProductInCart } from "../productInCart/ProductInCart";
import { TProduct } from "../../interfaces/product.interface";
import styles from "./productCartList.module.scss";
import { removeFromCart } from "@/features/cart/cart.slice";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";

type Props = {
  products: Array<TProduct & { counter: number }>;
};

export const ProductCartList: FC<Props> = ({ products }) => {
  // Здесь будет логика получения товаров из хранилища
  const dispatch = useAppDispatch();

  if (products.length === 0) {
    return <div className={styles.emptyCart}>Ваша корзина пуста</div>;
  }

  const onDelete = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className={styles.productCartList}>
      {products.map((product) => (
        <ProductInCart
          key={product.id}
          product={product}
          counter={product.counter}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
};
