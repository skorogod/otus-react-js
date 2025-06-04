import React, { FC, useState, useCallback, useRef } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TProductFormValues } from "./interfaces";
import { Box, Button } from "@mui/material";
import { ImagePreview } from "../../../../shared/imagePreview/ImagePreview";
import { ImageUploadWithRef } from "../../../../shared/imageUploadField/ImageUploadField";
import { FormTextField } from "../../../fields/textField/TextField";
import s from "./updateProductForm.module.scss";
import { Title } from "../../../../shared/ui/title/Title";
import type { TUpdateProducFormProps } from "./interfaces";
import { CategoryField } from "src/features/fields/categoryField/CategoryField";

export const UpdateProductForm: FC<TUpdateProducFormProps> = ({
  title,
  submitBtnLabel,
  onSubmitCb,
  categories,
  onImageChangeCb,
  product,
}) => {
  const { handleSubmit, setValue, control, formState, reset } =
    useForm<TProductFormValues>({
      defaultValues: {
        ...product,
        categoryId: product.category.id,
        discount: product.oldPrice
          ? 100 - Math.round((product.price * 100) / product.oldPrice)
          : 0,
        description: product.desc,
        stock: Math.round(Math.random() * 100),
      },
    });

  const imageUploadRef = useRef<HTMLInputElement | null>(null);
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

      if (onImageChangeCb && e.target.files) {
        onImageChangeCb(e.target.files).then((response) =>
          setValue("photo", response.url)
        );
      }
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<TProductFormValues> = (data) => {
    onSubmitCb({
      id: product.id,
      data: {
        ...data,
        desc: data.description,
        price: data.discount
          ? Number(((data.oldPrice * (100 - data.discount)) / 100).toFixed(2))
          : data.oldPrice,
        oldPrice: data.discount ? data.oldPrice : undefined,
        photo: data.photo || "",
      },
    });
    reset();
  };

  const handleDeleteImage = useCallback(() => {
    setValue("photo", "");
    setPreviewImages([]);

    if (imageUploadRef.current) {
      imageUploadRef.current.files = null;
      imageUploadRef.current.value = "";
    }
  }, [setValue]);

  return (
    <Box className={s.root}>
      <Title>{title || "Обновить товар"}</Title>
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

        <Controller
          name={"photo"}
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <FormTextField
              errors={formState.errors.name?.message || ""}
              {...field}
              title="Ссылка на изображение"
            />
          )}
        />

        <ImageUploadWithRef
          ref={imageUploadRef}
          onImageChange={handleImageChange}
        />

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
          {submitBtnLabel || "Обновить"}
        </Button>
      </form>
    </Box>
  );
};
