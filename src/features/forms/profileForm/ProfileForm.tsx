import React, { FC } from "react";
import cn from "clsx";
import { ProfileFormProps } from "./types";
import { NameField } from "./nameField/NameField";
import s from "./profileForm.module.scss";
import { AboutField } from "./aboutField/AboutField";
import { Title } from "../../../shared/ui/title/Title";
import { Button } from "@mui/material";
import { useForm, SubmitErrorHandler, Controller } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  about: string;
};

export const ProfileForm: FC<ProfileFormProps> = ({
  className,
  autoFocusElement,
  disabled,
  name,
  onSubmitCb,
  about,
}) => {
  const { handleSubmit, control, formState } = useForm<Inputs>({
    defaultValues: {
      name,
      about,
    },
    mode: "onChange",
  });

  const onInvalid: SubmitErrorHandler<Inputs> = (errors) => {
    console.log(errors);
  };

  const handleSubmitForm: SubmitHandler<any> = (data) => {
    onSubmitCb({ name: data.name });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm, onInvalid)}
      className={cn(s.root, className)}
    >
      <Title className={s.title}>Изменить профиль</Title>
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^[A-Za-z0-9]/i,
            message: "Invalid name",
          },
        }}
        render={({ field }) => (
          <NameField
            autoFocusElement={autoFocusElement}
            submitCount={formState.submitCount}
            errors={formState.errors.name?.message || ""}
            {...field}
            disabled={disabled}
          />
        )}
      />
      <Controller
        name="about"
        control={control}
        render={({ field }) => <AboutField {...field} disabled={disabled} />}
      />
      <Button className={s.submitBtn} variant="contained" type="submit">
        Сохранить
      </Button>
    </form>
  );
};

ProfileForm.displayName = "ProfileForm";
