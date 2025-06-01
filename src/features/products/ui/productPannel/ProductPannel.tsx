import React, { FC, useState, useEffect } from "react";
import s from "./productPannel.module.scss";
import cn from "clsx";
import { Box, Button } from "@mui/material";
import { AddProductModal } from "../addProductModal/AddProductModal";
import AddIcon from "@mui/icons-material/Add";
import { ProductsFilters } from "src/features/productsFilters/ui/productsFilters/ProductsFilters";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import {
  selectProducts,
  fetchProducts,
  updateProductsPaginationPage,
  selectProductsPagination,
} from "../../state/productsSlice";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { ProductList } from "src/shared/product/productList/ProductList";
import { ProductCard } from "src/shared/product/productCard/ProductCard";

type Props = {
  className?: string;
};

export const ProductPannel: FC<Props> = ({ className }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const products = useAppSelector(selectProducts);
  const pagination = useAppSelector(selectProductsPagination);
  const dispatch = useAppDispatch();

  const onModalClose = () => setModalVisible(false);

  const getNextProducts = () => {
    dispatch(fetchProducts({ ...pagination }));
    dispatch(updateProductsPaginationPage(pagination.page + 1));
  };

  useEffect(() => {
    if (!products.length) {
      getNextProducts();
    }
  }, []);

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
        <ProductList
          products={products}
          renderProduct={(product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              desc={product.desc}
              price={product.price}
              oldPrice={product.oldPrice}
              photo={product.photo}
              category={product.category}
              footer={
                <Box>
                  <Button variant="contained" color="success">
                    Изменить
                  </Button>
                </Box>
              }
            />
          )}
          getNextProducts={getNextProducts}
        />
      </Box>
    </Box>
  );
};
