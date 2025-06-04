import React, { useState } from "react";
import s from "./cabinetScreen.module.scss";
import cn from "clsx";
import { Box, Tabs, Tab } from "@mui/material";
import { ProductPannel } from "src/features/products/ui/ProductPannel/ProductPannel";
import { CategoryPannel } from "src/features/categories/ui/categoryPannel/CategoryPannel";
import { OrderPannel } from "src/features/orders/ui/orderPannel/orderPannel";

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

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Товары" id="0" />
        <Tab label="Категории" id="1" />
        <Tab label="Заказы" id="2" />
      </Tabs>
      <Box component="div" className={cn(s.pannels)}>
        <CustomTabPanel value={value} index={0}>
          <ProductPannel />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CategoryPannel />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <OrderPannel />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};
