import React, { FC, useCallback, useRef, useState } from "react";
import {
  TAddCategoriesFormProps,
  TAddCategoriesFormValues,
} from "./interfaces";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { Title } from "../../../../shared/ui/title/Title";
import s from "./addCategoriesForm.module.scss";
import cn from "clsx";
import { FormTextField } from "../../../../features/fields/textField/TextField";
import { ImageUploadWithRef } from "../../../../shared/imageUploadField/ImageUploadField";
import { ImagePreview } from "../../../../shared/imagePreview/ImagePreview";

export const AddCategoriesForm: FC<TAddCategoriesFormProps> = ({
  className,
  onSubmitCb,
  onImageChangeCb,
}) => {
  const { handleSubmit, control, reset, setValue, formState } =
    useForm<TAddCategoriesFormValues>({
      defaultValues: {
        name: "",
        photo: "",
      },
    });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const imageUploadRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: SubmitHandler<TAddCategoriesFormValues> = (data) => {
    onSubmitCb({
      ...data,
      photo: data.photo || "",
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
      if (onImageChangeCb && e.target.files) {
        onImageChangeCb(e.target.files).then((response) =>
          setValue("photo", response.url)
        );
      }
    },
    [setValue]
  );

  const handleDeleteImage = useCallback(() => {
    setValue("photo", "");
    setPreviewImages([]);

    if (imageUploadRef.current) {
      imageUploadRef.current.files = null;
      imageUploadRef.current.value = "";
    }
  }, [setValue]);

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
        <Controller
          name="photo"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <FormTextField
              errors={formState.errors.photo?.message || ""}
              title="Ссылка на изображение"
              {...field}
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
          Добавить категорию
        </Button>
      </form>
    </Box>
  );
};
