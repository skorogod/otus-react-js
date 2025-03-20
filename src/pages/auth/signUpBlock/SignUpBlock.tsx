import React, { FC } from "react";
import cn from "clsx";
import s from "./signUpBlock.module.scss";
import { RegisterForm } from "../../../features/forms/registerForm/RegisterForm";
import { Title } from "../../../shared/ui/title/Title";

export type TAuthScreen = {
  className?: string;
};

export const SignUpBlock: FC<TAuthScreen> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <div className={s.frame}>
      <div className={s.top}>
        <Title className={s.title}>Регистрация</Title>
      </div>
      <RegisterForm />
    </div>
  </div>
);
