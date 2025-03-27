import React, { FC } from "react";
import type { TProduct } from "../../../interfaces/product.interface";
import productsListScss from "./productsList.module.scss";
import { InfiniteScroll } from "../../infiniteScroll/Infinitescroll";
import { ProductCard } from "../productCard/ProductCard";

type TProductsListProps = {
  products: TProduct[];
  getNextProducts: () => void;
};

export const ProductList: FC<TProductsListProps> = ({
  products,
  getNextProducts,
}) => (
  <InfiniteScroll
    next={getNextProducts}
    className={productsListScss.products_list}
    observerOptions={{
      root: null,
      threshold: 0.1,
    }}
  >
    {products.map((product) => (
      <ProductCard
        id={product.id}
        key={product.id}
        title={product.title}
        costFull={product.costFull}
        costDiscount={product.costDiscount}
        description={product.description}
        category={product.category}
        image={product.images[0]}
        count={Math.round(Math.random() * 100)}
        type={product.type}
      />
    ))}
  </InfiniteScroll>
);
