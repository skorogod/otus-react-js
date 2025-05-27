import React, { FC } from "react";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { Modal } from "src/shared/modal/Modal";
import { addNewProduct } from "../../state/productsSlice";
import { TNewProduct } from "src/api/services/product/interfaces";
import { AddProductForm } from "src/features/forms/productForm/AddProductForm";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { selectCategories } from "src/app/store/slices/categories/categoriesSlice";
import s from "./addProductModal.module.scss";
import cn from "clsx";

type Props = {
  visible: boolean;
  onCloseClick: () => void;
};

export const AddProductModal: FC<Props> = ({ visible, onCloseClick }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const onSubmitCb = (newProduct: TNewProduct) => {
    dispatch(addNewProduct(newProduct));
  };

  return (
    <Modal className={cn(s.root)} visible={visible} onCloseClick={onCloseClick}>
      <AddProductForm onSubmitCb={onSubmitCb} categories={categories} />
    </Modal>
  );
};
