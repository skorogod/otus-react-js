import React, { FC } from "react";
import s from "./products.module.scss";
import cn from "clsx";
import { Box, SelectChangeEvent } from "@mui/material";
import { ProductsSortFieldSelect } from "../productsSortFieldSelect/ProductsSortFieldSelect";
import { ProductsSortTypeSelect } from "../productsSortTypeSelect/ProductsSortTypeSelect";
import { ProductsFitlerName } from "../productsFilterName/ProductsFilterName";
import { Category } from "@/interfaces/category.interface";
import { CategoriesFilter } from "../categoriesFilter/CategoriesFilter";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import { setCategoryIds } from "../../state/productsFiltersSlice";

type Props = {
  categories: Array<{ id: Category["id"]; name: Category["name"] }>;
};

export const ProductsFilters: FC<Props> = ({ categories }) => {
  const dispatch = useAppDispatch();

  const onCategoriesChange = (e: SelectChangeEvent<Array<Category["id"]>>) => {
    const {
      target: { value },
    } = e;

    if (typeof value === "string") {
      dispatch(setCategoryIds(value.split(",")));
    } else {
      dispatch(setCategoryIds(value));
    }
  };

  return (
    <Box component="div" className={cn(s.root)}>
      <CategoriesFilter
        handleChange={onCategoriesChange}
        categories={categories}
      />
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
};
