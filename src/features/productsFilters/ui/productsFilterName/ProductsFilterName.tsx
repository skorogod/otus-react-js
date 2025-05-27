import React, { ChangeEvent, FC } from "react";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import {
  selectProductsFiltersNAme,
  setProductsFiltersName,
} from "../../state/productsFiltersSlice";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { debounce } from "lodash";
import ClearIcon from "@mui/icons-material/Clear";

type TProps = TextFieldProps;

export const ProductsFitlerName: FC<TProps> = ({ ...restProps }) => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectProductsFiltersNAme);

  const onChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setProductsFiltersName(event.target.value));
    },
    2000,
    { leading: true, maxWait: 3500, trailing: true }
  );

  const clearValue = () => {
    dispatch(setProductsFiltersName(""));
  };

  return (
    <TextField
      label="Поиск по названию"
      value={name}
      onChange={onChange}
      {...restProps}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton onClick={clearValue}>
              <ClearIcon />
            </IconButton>
          ),
        },
      }}
    />
  );
};
