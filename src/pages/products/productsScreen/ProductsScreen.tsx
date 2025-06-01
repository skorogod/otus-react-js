import React, { useEffect } from "react";
import { ProductList } from "../../../shared/product/productList/ProductList";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import {
  fetchProducts,
  selectProductsPagination,
  selectProductsWithCartCount,
  updateProductsPaginationPage,
} from "src/features/products/state/productsSlice";
import { ProductCard } from "src/shared/product/productCard/ProductCard";
import { useSelector } from "react-redux";
import {
  increaseProductCartCount,
  decreaseProductCartCount,
  setProductCartCount,
} from "src/app/store/slices/cart/cart.slice";
import { TProduct } from "src/interfaces/product.interface";
import s from "./productScreen.module.scss";
import cn from "clsx";
import { ProductsFilters } from "src/features/productsFilters/ui/productsFilters/ProductsFilters";
import { ToCart } from "src/shared/toCart/ToCart";

export const ProductsScreen = () => {
  const products = useSelector(selectProductsWithCartCount);
  const pagination = useSelector(selectProductsPagination);
  const dispatch = useAppDispatch();

  const getNextProducts = () => {
    dispatch(fetchProducts({ ...pagination }));
    dispatch(updateProductsPaginationPage(pagination.page + 1));
  };

  const onIncreaseProductCount = (product: TProduct) => (count: number) => {
    dispatch(increaseProductCartCount({ product, count }));
  };

  const onDecreaseProductCount = (product: TProduct) => (count: number) => {
    dispatch(decreaseProductCartCount({ product, count }));
  };

  const onSetProductCount = (product: TProduct) => (count: number) => {
    dispatch(setProductCartCount({ product, count }));
  };

  useEffect(() => {
    if (!products.length) {
      getNextProducts();
    }
  }, []);

  return (
    <section className={cn(s.root)}>
      <ProductsFilters />
      <ProductList
        products={products}
        renderProduct={(product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            desc={product.desc}
            price={product.price}
            oldPrice={product.oldPrice}
            photo={product.photo}
            category={product.category}
            footer={
              <ToCart
                counter={product.cartCount || 0}
                onCountIncrease={onIncreaseProductCount(product)}
                onCountDecrease={onDecreaseProductCount(product)}
                onCountSet={onSetProductCount(product)}
              />
            }
          />
        )}
        getNextProducts={getNextProducts}
      />
    </section>
  );
};
