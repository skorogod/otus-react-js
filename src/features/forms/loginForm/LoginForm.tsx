import React, { FC } from "react";
import cn from "clsx";
import s from "./loginForm.module.scss";
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import type { TRegisterFormValues, TRegisterFormProps } from "./types";
import { EmailField } from "../../../features/fields/emailField/EmailField";
import { PasswordField } from "../../../features/fields/passwordField/PasswordField";
import { Button } from "@mui/material";

export const LoginForm: FC<TRegisterFormProps> = ({ className }) => {
  const { handleSubmit, formState, control } = useForm<TRegisterFormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TRegisterFormValues> = (data) => {
    console.log(data);
  };

  const onInvalid: SubmitErrorHandler<TRegisterFormValues> = (error) => {
    console.log(error);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className={cn(s.root, className)}
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Введите адрес почты",
          pattern: {
            value: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]/i,
            message: "Неверный формат почты",
          },
        }}
        render={({ field }) => (
          <EmailField
            submitCount={formState.submitCount}
            errors={formState.errors.email?.message || ""}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Введите пароль",
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
      <Button type="submit" variant="contained">
        Войти
      </Button>
    </form>
  );
};
