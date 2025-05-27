import React from "react";
import s from "./products.module.scss";
import cn from "clsx";
import { Box } from "@mui/material";
import { ProductsSortFieldSelect } from "../productsSortFieldSelect/ProductsSortFieldSelect";
import { ProductsSortTypeSelect } from "../productsSortTypeSelect/ProductsSortTypeSelect";
import { ProductsFitlerName } from "../productsFilterName/ProductsFilterName";

export const ProductsFilters = () => (
  <Box component="div" className={cn(s.root)}>
    <ProductsSortFieldSelect
      id="products-sort-field"
      labelId="products-sort-field-label"
      size="small"
    />
    <ProductsSortTypeSelect
      id="products-sort-type"
      labelId="products-sort-type-label"
      size="small"
    />
    <ProductsFitlerName
      className={cn(s.productsFilterName)}
      id="products-filter-name"
      size="small"
    />
  </Box>
);
