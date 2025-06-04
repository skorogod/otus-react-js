import { useAppSelector } from "../../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../../app/store/hooks/useAppDispatch";
import { useEffect } from "react";
import {
  fetchProducts,
  selectProductsPagination,
} from "../state/productsSlice";
import {
  selectProductsSortField,
  selectProductsSortType,
  selectProductsCategoryIds,
} from "../../productsFilters/state/productsFiltersSlice";
import { selectProductsFiltersName } from "../../../features/productsFilters/state/productsFiltersSlice";

export const useGetProducts = () => {
  const dispatch = useAppDispatch();
  const productsFilterName = useAppSelector(selectProductsFiltersName);
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
