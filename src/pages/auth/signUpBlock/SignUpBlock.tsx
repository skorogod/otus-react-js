import React, { FC } from "react";
import s from "./signUpBlock.module.scss";
import { RegisterForm } from "src/features/forms/registerForm/RegisterForm";
import { Title } from "src/shared/ui/title/Title";

export type TAuthScreen = {
  className?: string;
};

export const SignUpBlock: FC<TAuthScreen> = ({ className }) => (
  <div className={s.root}>
    <div className={s.frame}>
      <div className={s.top}>
        <Title className={s.title}>Регистрация</Title>
      </div>
      <RegisterForm />
    </div>
  </div>
);
