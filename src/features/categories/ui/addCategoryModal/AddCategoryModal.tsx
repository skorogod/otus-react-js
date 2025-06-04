import React, { FC } from "react";
import { TAddCategory } from "../../../../api/services/category/interfaces";
import { useAppDispatch } from "../../../../app/store/hooks/useAppDispatch";
import { addCategory } from "../../state/categoriesSlice";
import { Modal } from "../../../../shared/modal/Modal";
import { AddCategoriesForm } from "../addCategoriesForm/AddCategoriesForm";
import s from "./addCategoryModal.module.scss";
import cn from "clsx";
import { uploadFileService } from "../../../../api/services/uploadFile/uploadFileService";

type Props = {
  visible: boolean;
  onCloseClick: () => void;
};

export const AddCategoryModal: FC<Props> = ({ visible, onCloseClick }) => {
  const dispatch = useAppDispatch();

  const onSubmitCb = (newCategory: TAddCategory) => {
    dispatch(addCategory(newCategory));
    onCloseClick();
  };

  const onImageChangeCb = async (files: FileList) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    return await uploadFileService.upload(formData);
  };

  return (
    <Modal className={cn(s.root)} visible={visible} onCloseClick={onCloseClick}>
      <AddCategoriesForm
        onSubmitCb={onSubmitCb}
        onImageChangeCb={onImageChangeCb}
      />
    </Modal>
  );
};
