import React, { FC } from "react";
import cn from "clsx";
import s from "./loginForm.module.scss";
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import type { TLoginFormValues, TLoginFormProps } from "./types";
import { PasswordField } from "../../../features/fields/passwordField/PasswordField";
import { Button } from "@mui/material";
import { EmailField } from "src/features/fields/emailField/EmailField";

export const LoginForm: FC<TLoginFormProps> = ({ className, onSubmitCb }) => {
  const { handleSubmit, formState, control, reset } = useForm<TLoginFormValues>(
    {
      mode: "onChange",
    }
  );

  const onSubmit: SubmitHandler<TLoginFormValues> = (data) => {
    console.log(data);
    onSubmitCb({ email: data.email, password: data.password });
    reset({
      email: "",
      password: "",
    });
  };

  const onInvalid: SubmitErrorHandler<TLoginFormValues> = (error) => {
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
          required: "Введите имя пользователя",
          pattern: {
            value: /^[a-zA-Z0-9]+$/i,
            message:
              "Имя пользователя должно содержить только цифры и латинские буквы",
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
