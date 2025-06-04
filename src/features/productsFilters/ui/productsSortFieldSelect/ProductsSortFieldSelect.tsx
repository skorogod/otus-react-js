import React, { FC } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import {
  CustomSelect,
  TCustomSelectProps,
  TSelectItem,
} from "@/shared/select/Select";

import {
  selectProductsSortField,
  setSortField,
} from "@/features/productsFilters/state/productsFiltersSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const items: Array<TSelectItem> = [
  { value: "id", label: "ID" },
  { value: "createdAt", label: "Дата добавления" },
  { value: "updatedAt", label: "Дата обновления" },
  { value: "name", label: "Название" },
];

type Props = Omit<TCustomSelectProps, "items" | "label" | "onChange">;

export const ProductsSortFieldSelect: FC<Props> = ({ ...restProps }) => {
  const sortField = useAppSelector(selectProductsSortField);
  const dispatch = useAppDispatch();

  const onChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setSortField(event.target.value));
  };

  return (
    <CustomSelect
      items={items}
      label="Сортировать по:"
      onChange={onChange}
      value={sortField}
      {...restProps}
    />
  );
};
