import React, { FC, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { Modal } from "src/shared/modal/Modal";
import {
  selectProductById,
  selectUpdateProductId,
  updateProduct,
} from "../../state/productsSlice";
import { TUpdateProductParams } from "src/api/services/product/interfaces";
import s from "./updateProduct.module.scss";
import cn from "clsx";
import { Category } from "src/interfaces/category.interface";
import { categoryService } from "src/api/services/category/category.service";
import { uploadFileService } from "src/api/services/uploadFile/uploadFileService";
import { UpdateProductForm } from "../updateProductForm/UpdateProductForm";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { RootState } from "src/app/store";

type Props = {
  visible: boolean;
  onCloseClick: () => void;
};

export const UpdateProductModal: FC<Props> = ({ visible, onCloseClick }) => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const productId = useAppSelector(selectUpdateProductId);
  const product = useAppSelector((state: RootState) =>
    selectProductById(state, productId || "")
  );

  useLayoutEffect(() => {
    categoryService.getAll({}).then((response) => setCategories(response.data));
  }, []);

  const onSubmitCb = (params: TUpdateProductParams) => {
    dispatch(updateProduct(params));
    onCloseClick();
  };

  const onImageChangeCb = (files: FileList) => {
    const data = new FormData();
    data.append("file", files[0]);
    return uploadFileService.upload(data);
  };

  return (
    <Modal className={cn(s.root)} visible={visible} onCloseClick={onCloseClick}>
      <UpdateProductForm
        title="Изменить товар"
        submitBtnLabel="Обновить"
        product={product}
        onImageChangeCb={onImageChangeCb}
        onSubmitCb={onSubmitCb}
        categories={categories}
      />
    </Modal>
  );
};
