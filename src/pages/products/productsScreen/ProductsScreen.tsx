import React from "react";
import { ProductList } from "../../../shared/product/productList/ProductList";
import { useAppDispatch } from "../../../app/store/hooks/useAppDispatch";
import {
  fetchProducts,
  selectProductsPagination,
  selectProductsWithCartCount,
  updateProductsPaginationPage,
} from "../../../features/products/state/productsSlice";
import { ProductCard } from "../../../features/products/ui/AddProductCard/ProductCard";
import { useSelector } from "react-redux";
import {
  increaseProductCartCount,
  decreaseProductCartCount,
  setProductCartCount,
} from "../../../features/cart/cart.slice";
import { TProduct } from "../../../interfaces/product.interface";
import s from "./productScreen.module.scss";
import cn from "clsx";
import { ProductsFilters } from "../../../features/productsFilters/ui/productsFilters/ProductsFilters";
import { ToCart } from "../../../shared/toCart/ToCart";
import { useAppSelector } from "../../../app/hooks/useAppSelector";
import {
  selectProductsCategoryIds,
  selectProductsFiltersName,
  selectProductsSortField,
  selectProductsSortType,
} from "../../../features/productsFilters/state/productsFiltersSlice";
import { useGetProducts } from "../../../features/products/hooks/useGetProducts";
import { useGetCategories } from "../../../features/categories/hooks/useGetCategories";

export const ProductsScreen = () => {
  const products = useSelector(selectProductsWithCartCount);
  const pagination = useSelector(selectProductsPagination);
  const productsFiltersName = useAppSelector(selectProductsFiltersName);
  const productsSortField = useAppSelector(selectProductsSortField);
  const productsSortType = useAppSelector(selectProductsSortType);
  const dispatch = useAppDispatch();
  const categories = useGetCategories();
  const categoryIds = useAppSelector(selectProductsCategoryIds);

  const getNextProducts = () => {
    dispatch(
      fetchProducts({
        categoryIds: categoryIds,
        sorting: {
          field: productsSortField,
          type: productsSortType,
        },
        pagination: {
          pageNumber: pagination.page,
          pageSize: pagination.limit,
        },
        name: productsFiltersName || undefined,
      })
    );
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

  useGetProducts();

  return (
    <section className={cn(s.root)}>
      <ProductsFilters categories={categories} />
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
