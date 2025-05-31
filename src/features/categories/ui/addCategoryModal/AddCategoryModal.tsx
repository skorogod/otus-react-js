import React, { FC } from "react";
import { TAddCategory } from "src/api/services/category/interfaces";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { addCategory } from "../../state/categoriesSlice";
import { Modal } from "src/shared/modal/Modal";
import { AddCategoriesForm } from "../addCategoriesForm/AddCategoriesForm";
import s from "./addCategoryModal.module.scss";
import cn from "clsx";

type Props = {
  visible: boolean;
  onCloseClick: () => void;
};

export const AddCategoryModal: FC<Props> = ({ visible, onCloseClick }) => {
  const dispatch = useAppDispatch();

  const onSubmitCb = (newCategory: TAddCategory) => {
    dispatch(addCategory(newCategory));
  };

  return (
    <Modal className={cn(s.root)} visible={visible} onCloseClick={onCloseClick}>
      <AddCategoriesForm onSubmitCb={onSubmitCb} />
    </Modal>
  );
};
