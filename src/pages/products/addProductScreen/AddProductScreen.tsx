import React, { useEffect } from "react";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { AddProductForm } from "src/features/forms/productForm/AddProductForm";
import { addNewProduct } from "src/app/store/slices/products/products";
import { TNewProduct } from "src/api/services/product/interfaces";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { fetchCategories } from "src/app/store/slices/categories/categoriesSlice";
import { selectCategories } from "src/app/store/slices/categories/categoriesSlice";

export const AddProductScreen = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const onSubmitCb = (newProduct: TNewProduct) => {
    dispatch(addNewProduct(newProduct));
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return <AddProductForm categories={categories} onSubmitCb={onSubmitCb} />;
};
