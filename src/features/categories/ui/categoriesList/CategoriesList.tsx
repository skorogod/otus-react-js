import React, { FC } from "react";
import s from "./categoriesList.module.scss";
import { InfiniteScroll } from "src/shared/infiniteScroll/Infinitescroll";
import { Category } from "src/interfaces/category.interface";
import cn from "clsx";

type Props = {
  categories: Category[];
  getNextCategories: () => void;
  renderCategory: (category: Category) => React.ReactNode;
};

export const CategoriesList: FC<Props> = ({
  categories,
  getNextCategories,
  renderCategory,
}) => (
  <InfiniteScroll
    next={getNextCategories}
    className={cn(s.categoriesList)}
    observerOptions={{
      root: null,
      threshold: 0.1,
    }}
  >
    {categories.map((category) => renderCategory(category))}
  </InfiniteScroll>
);
