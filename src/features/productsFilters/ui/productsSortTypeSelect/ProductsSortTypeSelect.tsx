import { SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import {
  selectProductsSortType,
  setSortType,
} from "src/features/productsFilters/state/productsFiltersSlice";
import {
  CustomSelect,
  TCustomSelectProps,
  TSelectItem,
} from "src/shared/select/Select";

const items: Array<TSelectItem> = [
  { value: "ASC", label: "По возрастанию" },
  { value: "DESC", label: "По убыванию" },
];

type Props = Omit<TCustomSelectProps, "onChange" | "label" | "items">;

export const ProductsSortTypeSelect: FC<Props> = ({ ...restProps }) => {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectProductsSortType);

  const onChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setSortType(event.target.value));
  };

  return (
    <CustomSelect
      onChange={onChange}
      label="Порядок сортировки"
      items={items}
      value={sortType}
      {...restProps}
    />
  );
};
