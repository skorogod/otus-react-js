import React, { FC, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import { Modal } from "@/shared/modal/Modal";
import {
  selectProductById,
  selectUpdateProductId,
  updateProduct,
} from "../../state/productsSlice";
import { TUpdateProductParams } from "@/api/services/product/interfaces";
import s from "./updateProduct.module.scss";
import cn from "clsx";
import { Category } from "@/interfaces/category.interface";
import { categoryService } from "@/api/services/category/category.service";
import { uploadFileService } from "@/api/services/uploadFile/uploadFileService";
import { UpdateProductForm } from "../updateProductForm/UpdateProductForm";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { RootState } from "@/app/store";

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
