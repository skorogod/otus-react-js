import React, { FC } from "react";
import s from "./select.module.scss";
import cn from "clsx";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
} from "@mui/material";

type TValue = string | number | readonly string[] | undefined;

export type TSelectItem = { value: TValue; label: string };

export type TCustomSelectProps = SelectProps & {
  classsName?: string;
  label: string;
  items: Array<TSelectItem>;
};

export const CustomSelect: FC<TCustomSelectProps> = ({
  className,
  labelId,
  label,
  value,
  onChange,
  items,
  id,
  ...restProps
}) => (
  <FormControl className={cn(s.root, className)}>
    <InputLabel id={labelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      id={id}
      value={value}
      label={label}
      onChange={onChange}
      {...restProps}
    >
      {items.map((item) => (
        <MenuItem value={item.value}>{item.label}</MenuItem>
      ))}
    </Select>
  </FormControl>
);
