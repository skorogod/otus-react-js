import React, { FC } from "react";
import { ChangePasswordFormProps } from "./types";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import s from "./changePasswordForm.module.scss";
import cn from "clsx";
import { PasswordField } from "../../fields/passwordField/PasswordField";
import type { ChangePasswordFormValues } from "./types";
import { Button } from "@mui/material";
import { Title } from "../../../shared/ui/title/Title";

export const ChangePaswordForm: FC<ChangePasswordFormProps> = ({
  className,
}) => {
  const { handleSubmit, control, formState } =
    useForm<ChangePasswordFormValues>({
      mode: "onChange",
    });

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = (data) => {
    console.log(data);
  };

  const onInvalid: SubmitErrorHandler<ChangePasswordFormValues> = (error) => {
    console.log(error);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className={cn(s.root, className)}
    >
      <Title>Изменить пароль</Title>
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Введите текущий пароль",
        }}
        render={({ field }) => (
          <PasswordField
            {...field}
            fullWidth
            title="Пароль"
            placeholder="Введите пароль"
            errors={formState.errors.password?.message || ""}
          />
        )}
      />
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <PasswordField
            {...field}
            fullWidth
            title="Новый пароль"
            placeholder="Введите новый пароль"
            errors={formState.errors.newPassword?.message || ""}
          />
        )}
      />
      <Controller
        name="repeatPassword"
        control={control}
        rules={{
          validate: {
            checkRepeatPassword: (repeatPassword, { newPassword }) => {
              if (repeatPassword !== newPassword) {
                return "Пароли не совпадают";
              }
            },
          },
          required: "Подтвердите правильность пароля",
        }}
        render={({ field }) => (
          <PasswordField
            {...field}
            fullWidth
            title="Повторите пароль"
            placeholder="Повторите новый пароль"
            errors={formState.errors.repeatPassword?.message || ""}
          />
        )}
      />
      <Button
        className={s.submitBtn}
        variant="contained"
        type="submit"
        disabled={!formState.dirtyFields.password || !formState.isValid}
      >
        Изменить
      </Button>
    </form>
  );
};
