import React, { FC, useState } from "react";
import s from "./productPannel.module.scss";
import cn from "clsx";
import { Box, Button } from "@mui/material";
import { AddProductModal } from "../addProductModal/AddProductModal";
import AddIcon from "@mui/icons-material/Add";
import { ProductsFilters } from "src/features/productsFilters/ui/productsFilters/ProductsFilters";

type Props = {
  className?: string;
};

export const ProductPannel: FC<Props> = ({ className }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onModalClose = () => setModalVisible(false);

  return (
    <Box component="article" className={cn(s.root, className)}>
      <ProductsFilters />
      <Box component="div" className={cn(s.main)}>
        <Button
          onClick={() => setModalVisible(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Добавить
        </Button>
        <AddProductModal visible={modalVisible} onCloseClick={onModalClose} />
      </Box>
    </Box>
  );
};
