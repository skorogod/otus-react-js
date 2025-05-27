import React, { useEffect } from "react";
import { ProductList } from "../../../shared/product/productList/ProductList";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import {
  fetchProducts,
  selectProducts,
  selectProductsPagination,
  updateProductsPaginationPage,
} from "src/features/products/state/productsSlice";
import { ProductCard } from "src/shared/product/productCard/ProductCard";
import { useSelector } from "react-redux";
import { addToCart } from "src/app/store/slices/cart/cart.slice";
import { TProduct } from "src/interfaces/product.interface";
import s from "./productScreen.module.scss";
import cn from "clsx";
import { ProductsFilters } from "src/features/productsFilters/ui/productsFilters/ProductsFilters";

export const ProductsScreen = () => {
  const products = useSelector(selectProducts);
  const pagination = useSelector(selectProductsPagination);
  const dispatch = useAppDispatch();

  const getNextProducts = () => {
    dispatch(fetchProducts({ ...pagination }));
    dispatch(updateProductsPaginationPage(pagination.page + 1));
  };

  const onProductCountChange = (product: TProduct) => (count: number) => {
    dispatch(addToCart({ product, count }));
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
            onCountChange={onProductCountChange(product)}
          />
        )}
        getNextProducts={getNextProducts}
      />
    </section>
  );
};
