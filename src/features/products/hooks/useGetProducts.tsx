import { useAppSelector } from "src/app/hooks/useAppSelector";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import {
  selectProductsCategoryIds,
  selectProductsFiltersNAme,
  selectProductsSortField,
  selectProductsSortType,
} from "src/features/productsFilters/state/productsFiltersSlice";
import {
  fetchProducts,
  selectProductsPagination,
} from "../state/productsSlice";
import { useEffect } from "react";

export const useGetProducts = () => {
  const dispatch = useAppDispatch();
  const productsFilterName = useAppSelector(selectProductsFiltersNAme);
  const pagination = useAppSelector(selectProductsPagination);
  const productsSortField = useAppSelector(selectProductsSortField);
  const productsSortType = useAppSelector(selectProductsSortType);
  const categoryIds = useAppSelector(selectProductsCategoryIds);

  useEffect(() => {
    dispatch(
      fetchProducts({
        name: productsFilterName || undefined,
        categoryIds: categoryIds,
        sorting: {
          field: productsSortField,
          type: productsSortType,
        },
        pagination: {
          pageNumber: 1,
          pageSize: pagination.limit,
        },
      })
    );
  }, [productsFilterName, productsSortField, productsSortType, categoryIds]);
};
