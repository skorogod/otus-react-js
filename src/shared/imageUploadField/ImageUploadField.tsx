import React, { forwardRef, Ref } from "react";
import { Box, Button } from "@mui/material";
import s from "./imageUpload.module.scss";
import { styled } from "@mui/material/styles";

interface ImageUploadProps {
  label?: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

const Input = styled("input")({
  display: "none",
});

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageChange,
  label,
}) => (
  <Box component="div">
    <label htmlFor="contained-button-file">
      <Input
        id="contained-button-file"
        type="file"
        multiple
        onChange={onImageChange}
      />
      <Button variant="contained" component="span" className={s.uploadButton}>
        {label || "Загрузить изображение"}
      </Button>
    </label>
  </Box>
);

export const ImageUploadWithRef = forwardRef<
  HTMLInputElement,
  ImageUploadProps
>(({ onImageChange, label }, ref) => (
  <Box component="div">
    <label htmlFor="contained-button-file">
      <Input
        ref={ref}
        id="contained-button-file"
        type="file"
        multiple
        onChange={onImageChange}
      />
      <Button variant="contained" component="span" className={s.uploadButton}>
        {label || "Загрузить изображение"}
      </Button>
    </label>
  </Box>
));
