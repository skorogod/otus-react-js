import { SelectProps } from "@mui/material";
import React, { FC } from "react";
import { Category } from "../../../interfaces/category.interface";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FormItem } from "../../../shared/ui/formItem/FormItem";
import cn from "clsx";
import s from "./categoryField.module.scss";

type TCategoryFieldProps = SelectProps & {
  categories: Category[];
  title: string;
  errors: string;
  className?: string;
};

export const CategoryField: FC<TCategoryFieldProps> = ({
  categories,
  errors,
  className,
  title,
  ...restProps
}) => (
  <FormItem
    title={title}
    help={errors}
    className={cn(s.root, className)}
    required
    validateStatus={Boolean(errors)}
  >
    <FormControl fullWidth>
      <InputLabel id="category-select-label">Категория</InputLabel>
      <Select
        {...restProps}
        labelId="category-select-label"
        label="Категория"
        error={!!errors}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </FormItem>
);
