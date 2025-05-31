import { Box, Button } from "@mui/material";
import React, { FC, useState } from "react";
import s from "./categoryPannel.module.scss";
import cn from "clsx";
import AddIcon from "@mui/icons-material/Add";
import { AddCategoryModal } from "../addCategoryModal/AddCategoryModal";

type Props = {
  className?: string;
};

export const CategoryPannel: FC<Props> = ({ className }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Box component="article" className={cn(s.root, className)}>
      <Box>
        <Button
          onClick={() => setModalVisible(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Добавить
        </Button>
        <AddCategoryModal
          visible={modalVisible}
          onCloseClick={() => setModalVisible(false)}
        />
      </Box>
    </Box>
  );
};
