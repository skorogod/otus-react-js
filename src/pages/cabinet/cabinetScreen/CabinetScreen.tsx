import React, { useState } from "react";
import s from "./cabinetScreen.module.scss";
import cn from "clsx";
import { Box, Tabs, Tab, Button } from "@mui/material";
import { ProductsFilters } from "src/features/productsFilters/ui/productsFilters/ProductsFilters";
import AddIcon from "@mui/icons-material/Add";
import { AddProductModal } from "src/features/products/ui/addProductModal/AddProductModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export const CabinetScreen = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onCloseClick = () => setVisible(false);

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Товары" id="1" />
        <Tab label="Категории" id="2" />
      </Tabs>
      <Box component="div" className={cn(s.pannels)}>
        <CustomTabPanel value={value} index={0}>
          <ProductsFilters />
          <Box>
            <Button
              onClick={() => setVisible(true)}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Добавить
            </Button>
            <AddProductModal visible={visible} onCloseClick={onCloseClick} />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Категории
        </CustomTabPanel>
      </Box>
    </Box>
  );
};
