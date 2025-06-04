import React, { FC, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../../app/store/hooks/useAppDispatch";
import { Modal } from "../../../../shared/modal/Modal";
import { addNewProduct } from "../../state/productsSlice";
import { TNewProduct } from "../../../../api/services/product/interfaces";
import { AddProductForm } from "../AddProductForm/AddProductForm";
import s from "./addProductModal.module.scss";
import cn from "clsx";
import { Category } from "../../../../interfaces/category.interface";
import { categoryService } from "../../../../api/services/category/category.service";
import { uploadFileService } from "../../../../api/services/uploadFile/uploadFileService";

type Props = {
  visible: boolean;
  onCloseClick: () => void;
};

export const AddProductModal: FC<Props> = ({ visible, onCloseClick }) => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);

  useLayoutEffect(() => {
    categoryService.getAll({}).then((response) => setCategories(response.data));
  }, []);

  const onSubmitCb = (newProduct: TNewProduct) => {
    dispatch(addNewProduct(newProduct));
    onCloseClick();
  };

  const onImageChangeCb = (files: FileList) => {
    const data = new FormData();
    data.append("file", files[0]);
    return uploadFileService.upload(data);
  };

  return (
    <Modal className={cn(s.root)} visible={visible} onCloseClick={onCloseClick}>
      <AddProductForm
        onImageChangeCb={onImageChangeCb}
        onSubmitCb={onSubmitCb}
        categories={categories}
      />
    </Modal>
  );
};
