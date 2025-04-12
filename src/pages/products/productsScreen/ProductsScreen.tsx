import React, { useEffect } from "react";
import { ProductList } from "../../../shared/product/productList/ProductList";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import {
  fetchProducts,
  selectProducts,
  selectProductsPagination,
  updateProductsPaginationPage,
} from "src/app/store/slices/products/products";
import { ProductCard } from "src/shared/product/productCard/ProductCard";
import { useSelector } from "react-redux";
import { addToCart } from "src/app/store/slices/cart/cart.slice";
import { TProduct } from "src/interfaces/product.interface";

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
    <ProductList
      products={products}
      renderProduct={(product) => (
        <ProductCard
          id={product.id}
          key={product.id}
          title={product.title}
          costFull={product.costFull}
          costDiscount={product.costDiscount}
          description={product.description}
          category={product.category}
          image={product.images[0]}
          type={product.type}
          onCountChange={onProductCountChange(product)}
        />
      )}
      getNextProducts={getNextProducts}
    />
  );
};
