import React, { useEffect } from "react";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { AddProductForm } from "src/features/forms/productForm/AddProductForm";
import { addNewProduct } from "src/app/store/slices/products/products";
import { TNewProduct } from "src/api/services/product/interfaces";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { fetchCategories } from "src/app/store/slices/categories/categoriesSlice";
import { selectCategories } from "src/app/store/slices/categories/categoriesSlice";
import {
  selectProductsStatus,
  selectProductsError,
} from "src/app/store/slices/products/products";
import { Spinner } from "src/shared/ui/spinner/Spinner";
import { Modal } from "src/shared/modal/Modal";
import { setProductsError } from "src/app/store/slices/products/products";
import { Typography } from "@mui/material";

export const AddProductScreen = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const categories = useAppSelector(selectCategories);

  const onSubmitCb = (newProduct: TNewProduct) => {
    dispatch(addNewProduct(newProduct));
  };

  const onModalClose = () => {
    dispatch(setProductsError(""));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "pending") {
    return <Spinner />;
  }

  return (
    <>
      {error && (
        <Modal visible={Boolean(error)} onCloseClick={onModalClose}>
          <Typography className="error-text">{error}</Typography>
        </Modal>
      )}
      <AddProductForm categories={categories} onSubmitCb={onSubmitCb} />
    </>
  );
};
