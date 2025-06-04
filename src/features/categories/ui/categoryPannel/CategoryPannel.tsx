import { Box, Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import s from "./categoryPannel.module.scss";
import cn from "clsx";
import AddIcon from "@mui/icons-material/Add";
import { AddCategoryModal } from "../addCategoryModal/AddCategoryModal";
import { CategoriesList } from "../categoriesList/CategoriesList";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import {
  fetchCategories,
  selectCategories,
  selectCategoriesPagination,
} from "../../state/categoriesSlice";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import { CategoryCard } from "../categoryCard/CategoryCard";
import { updateCategoriesPaginationPage } from "../../state/categoriesSlice";

type Props = {
  className?: string;
};

export const CategoryPannel: FC<Props> = ({ className }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const categories = useAppSelector(selectCategories);
  const pagination = useAppSelector(selectCategoriesPagination);
  const dispatch = useAppDispatch();

  const getNextCategories = () => {
    dispatch(fetchCategories());
    dispatch(updateCategoriesPaginationPage(pagination.page + 1));
  };

  useEffect(() => {
    if (!categories.length) {
      getNextCategories();
    }
  }, []);

  return (
    <Box component="article" className={cn(s.root, className)}>
      <Box>
        <Button
          onClick={() => setModalVisible(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Добавить
        </Button>
        <AddCategoryModal
          visible={modalVisible}
          onCloseClick={() => setModalVisible(false)}
        />
        <Box component="div" className={s.categoriesListContainer}>
          <CategoriesList
            categories={categories}
            getNextCategories={getNextCategories}
            renderCategory={(category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                photo={category.photo || ""}
                footer={
                  <Box>
                    <Button variant="contained" color="success">
                      Изменить
                    </Button>
                  </Box>
                }
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};
