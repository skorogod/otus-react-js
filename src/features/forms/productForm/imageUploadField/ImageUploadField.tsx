import React from "react";
import { Box, Button } from "@mui/material";
import s from "./imageUpload.module.scss";
import { styled } from "@mui/material/styles";

interface ImageUploadProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = styled("input")({
  display: "none",
});

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => (
  <Box>
    <label htmlFor="contained-button-file">
      <Input
        id="contained-button-file"
        type="file"
        multiple
        onChange={onImageChange}
      />
      <Button variant="contained" component="span" className={s.uploadButton}>
        Загрузить изображения
      </Button>
    </label>
  </Box>
);
