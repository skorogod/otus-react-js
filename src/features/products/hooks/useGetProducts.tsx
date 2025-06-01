import { useAppSelector } from "src/app/hooks/useAppSelector";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { selectProductsFiltersNAme } from "src/features/productsFilters/state/productsFiltersSlice";
import {
  fetchProducts,
  selectProductsPagination,
} from "../state/productsSlice";
import { useEffect } from "react";

export const useGetProducts = () => {
  const dispatch = useAppDispatch();
  const productsFilterName = useAppSelector(selectProductsFiltersNAme);
  const pagination = useAppSelector(selectProductsPagination);

  useEffect(() => {
    dispatch(
      fetchProducts({
        name: productsFilterName || undefined,
        pagination: {
          pageNumber: 1,
          pageSize: pagination.limit,
        },
      })
    );
  }, [productsFilterName]);
};
