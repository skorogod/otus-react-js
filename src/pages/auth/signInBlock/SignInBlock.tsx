import React, { FC } from "react";
import s from "./signInBlock.module.scss";
import { RegisterForm } from "src/features/forms/registerForm/RegisterForm";
import { Title } from "src/shared/ui/title/Title";
import cn from "clsx";

export type TAuthScreen = {
  className?: string;
};

export const SignInBlock: FC<TAuthScreen> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <div className={s.frame}>
      <div className={s.top}>
        <Title className={s.title}>Войти</Title>
      </div>
      <RegisterForm />
    </div>
  </div>
);
