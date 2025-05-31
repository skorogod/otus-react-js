import React, { FC, useCallback, useState } from "react";
import {
  TAddCategoriesFormProps,
  TAddCategoriesFormValues,
} from "./interfaces";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { Title } from "src/shared/ui/title/Title";
import s from "./addCategoriesForm.module.scss";
import cn from "clsx";
import { FormTextField } from "src/features/fields/textField/TextField";
import { ImageUpload } from "src/shared/imageUploadField/ImageUploadField";
import { ImagePreview } from "src/shared/imagePreview/ImagePreview";

export const AddCategoriesForm: FC<TAddCategoriesFormProps> = ({
  className,
  onSubmitCb,
}) => {
  const { handleSubmit, control, reset, setValue, formState } =
    useForm<TAddCategoriesFormValues>({
      defaultValues: {
        name: "",
        photo: null,
      },
    });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onSubmit: SubmitHandler<TAddCategoriesFormValues> = (data) => {
    onSubmitCb({
      ...data,
      photo: data.photo?.name,
    });
    reset();
  };

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      const newPreviewImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviewImages.push(reader.result as string);
          if (newPreviewImages.length === files.length) {
            setPreviewImages(newPreviewImages);
          }
        };
        reader.readAsDataURL(file);
      }
      setValue("photo", files[0]);
    },
    [setValue]
  );

  const handleDeleteImage = () => {
    setValue("photo", null);
    setPreviewImages([]);
  };

  return (
    <Box component="div" className={cn(s.root, className)}>
      <Title>Добавить категорию</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <FormTextField
              errors={formState.errors.name?.message || ""}
              title="Название категории"
              {...field}
            />
          )}
        />
        <ImageUpload onImageChange={handleImageChange} />
        <ImagePreview
          mainImageIndex={0}
          previewImages={previewImages}
          onDeleteImage={handleDeleteImage}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={s.submitButton}
        >
          Добавить категорию
        </Button>
      </form>
    </Box>
  );
};
