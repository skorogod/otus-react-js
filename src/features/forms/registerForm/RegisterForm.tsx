import React, { FC } from "react";
import cn from "clsx";
import s from "./registerForm.module.scss";
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
import { UsernameField } from "../../../features/fields/usrnameField/UsernameField";

export const RegisterForm: FC<TRegisterFormProps> = ({
  className,
  onSubmitCb,
}) => {
  const { handleSubmit, formState, control, reset } =
    useForm<TRegisterFormValues>({
      mode: "onChange",
    });

  const onSubmit: SubmitHandler<TRegisterFormValues> = (data) => {
    onSubmitCb({ email: data.email, password: data.password });
    reset({
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    });
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
          // pattern: {
          //   value: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]/i,
          //   message: "Неверный формат почты",
          // },
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
        name="username"
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
          <UsernameField
            submitCount={formState.submitCount}
            errors={formState.errors.username?.message || ""}
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
      <Controller
        name="repeatPassword"
        control={control}
        rules={{
          required: "Введите пароль",
          validate: {
            checkRepeatPassword: (repeatPassword, { password }) => {
              if (repeatPassword !== password) {
                return "Пароли не совпадают";
              }
            },
          },
        }}
        render={({ field }) => (
          <PasswordField
            {...field}
            fullWidth
            title="Повторите пароль"
            placeholder="Повторите пароль"
            errors={formState.errors.repeatPassword?.message || ""}
          />
        )}
      />
      <Button type="submit" variant="contained">
        Зарегистрироваться
      </Button>
    </form>
  );
};
