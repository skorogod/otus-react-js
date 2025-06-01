import React, { FC, useEffect, useRef, useState } from "react";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { setProductsFiltersName } from "../../state/productsFiltersSlice";
import ClearIcon from "@mui/icons-material/Clear";

type TProps = TextFieldProps;

export const ProductsFitlerName: FC<TProps> = ({ ...restProps }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const timeOut = useRef<NodeJS.Timeout | null>(null);

  const clearValue = () => {
    dispatch(setProductsFiltersName(""));
    setValue("");
  };

  useEffect(() => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
      timeOut.current = null;
    }
    timeOut.current = setTimeout(() => {
      dispatch(setProductsFiltersName(value));
    }, 1000);
    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
    };
  }, [value]);

  return (
    <TextField
      label="Поиск по названию"
      onChange={(e) => setValue(e.target.value)}
      value={value}
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
