import React, { FC, useState, useCallback } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TProductFormValues } from "./types";
import { Box, Button } from "@mui/material";
import { ImagePreview } from "./imagePreview/ImagePreview";
import { ImageUpload } from "./imageUploadField/ImageUploadField";
import { FormTextField } from "../../../features/fields/textField/TextField";
import s from "./productForm.module.scss";
import { Title } from "../../../shared/ui/title/Title";

export const AddProductForm: FC = () => {
  const { handleSubmit, setValue, control, getValues, formState, reset } =
    useForm<TProductFormValues>({
      defaultValues: {
        name: "",
        description: "",
        price: 0,
        discount: 0,
        stock: 0,
        images: [],
        mainImageIndex: 0,
      },
    });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

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

      setValue("images", files);
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<TProductFormValues> = (data) => {
    console.log(data);
    reset();
  };

  const handleMainImageChange = useCallback(
    (index: number) => {
      setValue("mainImageIndex", index);
    },
    [setValue]
  );

  const handleDeleteImage = useCallback(
    (index: number) => {
      const newImages = [...previewImages];
      newImages.splice(index, 1);
      setPreviewImages(newImages);

      const currentImages = getValues("images") as File[];
      const newFiles = [...currentImages];
      newFiles.splice(index, 1);
      setValue("images", newFiles);
    },
    [setValue, previewImages, getValues]
  );

  return (
    <Box className={s.root}>
      <Title>Добавить товар</Title>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Controller
          name={"name"}
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <FormTextField
              errors={formState.errors.name?.message || ""}
              {...field}
              title="Название товара"
            />
          )}
        />

        <Controller
          name={"description"}
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <FormTextField
              {...field}
              errors={formState.errors.description?.message || ""}
              title="Описание товара"
              multiline
              rows={4}
            />
          )}
        />

        <Box className={s.horizontalFields}>
          <Box>
            <Controller
              name={"price"}
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <FormTextField
                  {...field}
                  errors={formState.errors.price?.message || ""}
                  title="Цена"
                  type="number"
                />
              )}
            />
          </Box>
          <Box>
            <Controller
              name={"discount"}
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <FormTextField
                  {...field}
                  errors={formState.errors.discount?.message || ""}
                  title="Скидка"
                  type="number"
                />
              )}
            />
          </Box>
          <Box>
            <Controller
              name={"stock"}
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <FormTextField
                  {...field}
                  errors={formState.errors.discount?.message || ""}
                  title="Количество на складе"
                  type="number"
                />
              )}
            />
          </Box>
        </Box>

        <ImageUpload onImageChange={handleImageChange} />

        <ImagePreview
          mainImageIndex={0}
          previewImages={previewImages}
          onDeleteImage={handleDeleteImage}
          onMainImageChange={handleMainImageChange}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={s.submitButton}
        >
          Добавить товар
        </Button>
      </form>
    </Box>
  );
};
