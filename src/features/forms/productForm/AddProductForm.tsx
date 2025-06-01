import React, { FC, useState, useCallback } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TProductFormValues } from "./interfaces";
import { Box, Button } from "@mui/material";
import { ImagePreview } from "../../../shared/imagePreview/ImagePreview";
import { ImageUpload } from "../../../shared/imageUploadField/ImageUploadField";
import { FormTextField } from "../../fields/textField/TextField";
import s from "./productForm.module.scss";
import { Title } from "../../../shared/ui/title/Title";
import type { TAddProducFormProps } from "./interfaces";
import { CategoryField } from "src/features/fields/categoryField/CategoryField";

export const AddProductForm: FC<TAddProducFormProps> = ({
  onSubmitCb,
  categories,
}) => {
  const { handleSubmit, setValue, control, getValues, formState, reset } =
    useForm<TProductFormValues>({
      defaultValues: {
        name: "",
        description: "",
        oldPrice: 0,
        discount: 0,
        stock: 0,
        photos: [],
        mainImageIndex: 0,
        categoryId: "",
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

      setValue("photos", files);
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<TProductFormValues> = (data) => {
    onSubmitCb({
      ...data,
      desc: data.description,
      price: Number(((data.oldPrice * (100 - data.discount)) / 100).toFixed(2)),
      photos: data.photos.map((photo) => photo.name),
      photo: data.photos[data.mainImageIndex]?.name || "",
    });
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

      const currentImages = getValues("photos") as File[];
      const newFiles = [...currentImages];
      newFiles.splice(index, 1);
      setValue("photos", newFiles);
    },
    [setValue, previewImages, getValues]
  );

  return (
    <Box className={s.root}>
      <Title>Добавить товар</Title>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Controller
          name={"categoryId"}
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <CategoryField
              errors={formState.errors.categoryId?.message || ""}
              title="Категория товара"
              categories={categories}
              {...field}
            />
          )}
        />
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
              name={"oldPrice"}
              control={control}
              rules={{
                min: {
                  value: 1,
                  message: "Цена должна быть больше 0",
                },
                required: "Обязательное поле",
              }}
              render={({ field }) => (
                <FormTextField
                  {...field}
                  errors={formState.errors.oldPrice?.message || ""}
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
              rules={{
                required: "Обязательное поле",
                min: {
                  value: 1,
                  message: "Количество должно быть больше нуля",
                },
              }}
              render={({ field }) => (
                <FormTextField
                  {...field}
                  errors={formState.errors.stock?.message || ""}
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
