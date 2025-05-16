import React from "react";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { AddProductForm } from "src/features/forms/productForm/AddProductForm";
import { addNewProduct } from "src/app/store/slices/products/products";
import { TNewProduct } from "src/api/services/product/interfaces";
import { Category } from "src/interfaces/category.interface";

export const AddProductScreen = () => {
  const dispatch = useAppDispatch();
  const onSubmitCb = (newProduct: TNewProduct) => {
    dispatch(addNewProduct(newProduct));
  };
  const categories: Category[] = [];
  return <AddProductForm categories={categories} onSubmitCb={onSubmitCb} />;
};
