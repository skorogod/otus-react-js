import React, { FC, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { Category } from "@/interfaces/category.interface";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  categories: Array<{ id: Category["id"]; name: Category["name"] }>;
  handleChange: (e: SelectChangeEvent<Array<Category["id"]>>) => void;
};

export const CategoriesFilter: FC<Props> = ({ categories, handleChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<
    Array<Category["id"]>
  >([]);

  const onChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
    handleChange(event);
  };

  const getSelectedCateories = () =>
    categories
      .filter((item) => selectedCategories.includes(item.id))
      .map((item) => item.name);

  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel id="categories-filter-label">Категории</InputLabel>
      <Select
        size="small"
        labelId="categories-filter-label"
        id="categories-select"
        multiple
        value={selectedCategories}
        onChange={onChange}
        label="Категории"
        renderValue={() => getSelectedCateories().join(", ")}
        MenuProps={MenuProps}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            <Checkbox checked={selectedCategories.includes(category.id)} />
            <ListItemText primary={category.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
