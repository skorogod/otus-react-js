import React, { FC } from "react";
import s from "./signInBlock.module.scss";
import { Title } from "../../../shared/ui/title/Title";
import cn from "clsx";
import { LoginForm } from "../../../features/forms/loginForm/LoginForm";

export type TAuthScreen = {
  className?: string;
};

export const SignInBlock: FC<TAuthScreen> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <div className={s.frame}>
      <div className={s.top}>
        <Title className={s.title}>Войти</Title>
      </div>
      <LoginForm />
    </div>
  </div>
);
