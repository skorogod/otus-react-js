import React, { FC } from "react";
import type { TProduct } from "../../../interfaces/product.interface";
import productsListScss from "./productsList.module.scss";
import { InfiniteScroll } from "../../infiniteScroll/Infinitescroll";

type TProductsListProps = {
  products: TProduct[];
  getNextProducts: () => void;
  renderProduct: (product: TProduct) => React.ReactNode;
};

export const ProductList: FC<TProductsListProps> = ({
  products,
  getNextProducts,
  renderProduct,
}) => (
  <InfiniteScroll
    next={getNextProducts}
    className={productsListScss.products_list}
    observerOptions={{
      root: null,
      threshold: 0.1,
    }}
  >
    {products.map((product) => renderProduct(product))}
  </InfiniteScroll>
);
