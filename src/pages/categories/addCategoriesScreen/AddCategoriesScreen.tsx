import React from "react";
import { TAddCategory } from "../../../api/services/category/interfaces";
import { useAppSelector } from "../../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../../app/store/hooks/useAppDispatch";
import { Spinner } from "../../../shared/ui/spinner/Spinner";
import { Modal } from "../../../shared/modal/Modal";
import { Typography } from "@mui/material";
import { AddCategoriesForm } from "../../../features/categories/ui/addCategoriesForm/AddCategoriesForm";
import {
  selectCategoriesError,
  setCategoriesError,
  addCategory,
  selectCategoriesStatus,
} from "../../../features/categories/state/categoriesSlice";

export const AddCategoriesScreen = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectCategoriesStatus);
  const error = useAppSelector(selectCategoriesError);

  const onSubmitCb = (newCategory: TAddCategory) => {
    dispatch(addCategory(newCategory));
  };

  const onModalClose = () => {
    dispatch(setCategoriesError(""));
  };

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
      <AddCategoriesForm onSubmitCb={onSubmitCb} />
    </>
  );
};
