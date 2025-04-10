import React, { useCallback, useEffect } from "react";
import { ProductList } from "../../../shared/product/productList/ProductList";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import {
  fetchProducts,
  selectProducts,
  selectProductsPagination,
  updateProductsPaginationPage,
} from "src/app/store/slices/products/products";
import { useSelector } from "react-redux";

export const ProductsScreen = () => {
  const products = useSelector(selectProducts);
  const pagination = useSelector(selectProductsPagination);
  const dispatch = useAppDispatch();

  console.log("products", products);

  const getNextProducts = () => {
    dispatch(fetchProducts({ ...pagination }));
    dispatch(updateProductsPaginationPage(pagination.page + 1));
  };

  useEffect(() => {
    if (!products.length) {
      getNextProducts();
    }
  }, []);

  return <ProductList products={products} getNextProducts={getNextProducts} />;
};
