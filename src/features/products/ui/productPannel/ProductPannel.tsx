import React, { FC, useState, useEffect } from "react";
import s from "./productPannel.module.scss";
import cn from "clsx";
import { Box, Button } from "@mui/material";
import { AddProductModal } from "../addProductModal/AddProductModal";
import AddIcon from "@mui/icons-material/Add";
import { ProductsFilters } from "@/features/productsFilters/ui/productsFilters/ProductsFilters";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import {
  selectProducts,
  fetchProducts,
  updateProductsPaginationPage,
  selectProductsPagination,
  setUpdateProductId,
  selectUpdateProductId,
} from "../../state/productsSlice";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import { ProductList } from "@/shared/product/productList/ProductList";
import { ProductCard } from "@/features/products/ui/AddProductCard/ProductCard";
import { useGetCategories } from "@/features/categories/hooks/useGetCategories";
import {
  selectProductsSortField,
  selectProductsSortType,
  selectProductsCategoryIds,
} from "@/features/productsFilters/state/productsFiltersSlice";
import { UpdateProductModal } from "../updateProductModal/UpdateProductModal";

type Props = {
  className?: string;
};

export const ProductPannel: FC<Props> = ({ className }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const products = useAppSelector(selectProducts);
  const pagination = useAppSelector(selectProductsPagination);
  const dispatch = useAppDispatch();
  const categories = useGetCategories();
  const productsSortField = useAppSelector(selectProductsSortField);
  const productsSortType = useAppSelector(selectProductsSortType);
  const categoryIds = useAppSelector(selectProductsCategoryIds);
  const updateProductId = useAppSelector(selectUpdateProductId);

  const onModalClose = () => setModalVisible(false);

  const getNextProducts = () => {
    dispatch(
      fetchProducts({
        categoryIds: categoryIds,
        sorting: {
          field: productsSortField,
          type: productsSortType,
        },
        pagination: {
          pageNumber: pagination.page,
          pageSize: pagination.limit,
        },
      })
    );
    dispatch(updateProductsPaginationPage(pagination.page + 1));
  };

  useEffect(() => {
    if (!products.length) {
      getNextProducts();
    }
  }, []);

  const onUpdateClick = (productId: string) => () => {
    dispatch(setUpdateProductId(productId));
  };

  return (
    <Box component="article" className={cn(s.root, className)}>
      <ProductsFilters categories={categories} />
      <Box component="div" className={cn(s.main)}>
        <Button
          onClick={() => setModalVisible(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Добавить
        </Button>
        <AddProductModal visible={modalVisible} onCloseClick={onModalClose} />
        {updateProductId && (
          <UpdateProductModal
            visible={Boolean(updateProductId)}
            onCloseClick={() => dispatch(setUpdateProductId(null))}
          />
        )}
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
                  <Button
                    onClick={onUpdateClick(product.id)}
                    variant="contained"
                    color="success"
                  >
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
