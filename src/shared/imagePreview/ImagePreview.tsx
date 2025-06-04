import React, { FC } from "react";
import { Box, IconButton } from "@mui/material";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import s from "./imagePreview.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImagePreviewProps {
  mainImageIndex: number;
  previewImages: string[];
  onDeleteImage: (index: number) => void;
  onMainImageChange?: (index: number) => void;
}

export const ImagePreview: FC<ImagePreviewProps> = ({
  previewImages,
  mainImageIndex,
  onDeleteImage,
  onMainImageChange,
}) => (
  <Box className={s.root}>
    {previewImages.map((image, index) => (
      <Box key={index} className={s.imageBox}>
        <img src={image} className={s.image} />
        <IconButton
          size="small"
          className={s.deleteButton}
          onClick={() => onDeleteImage(index)}
        >
          <DeleteIcon />
        </IconButton>
        {onMainImageChange && (
          <IconButton
            aria-label="set main"
            size="small"
            className={s.mainImageButton}
            onClick={() => onMainImageChange(index)}
          >
            {index === (mainImageIndex || 0) ? (
              <RadioButtonCheckedIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </IconButton>
        )}
      </Box>
    ))}
  </Box>
);
