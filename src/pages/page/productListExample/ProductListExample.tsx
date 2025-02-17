import React, { useEffect, useState } from "react";
import { createRandomProduct } from "../../../helpers/createProduct";

import { TProduct } from "../../../interfaces/product.interface";
import { ProductList } from "../../../shared/product/productList/ProductList";

export const ProductsListExample = () => {
  const [products, setProducts] = useState<TProduct[] | never[]>([]);

  const getNextProducts = (count = 10) => {
    const nextProducts: Array<TProduct> = [];
    for (let i = 0; i < count; i++) {
      nextProducts.push(createRandomProduct(new Date().toLocaleDateString("ru")));
    }
    setProducts([...products, ...nextProducts]);
  };

  useEffect(() => {
    getNextProducts(10);
  }, []);

  return <ProductList products={products} getNextProducts={getNextProducts} />;
};
