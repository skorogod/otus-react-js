import React, { FC } from "react";
import s from "./signInBlock.module.scss";
import { Title } from "../../../shared/ui/title/Title";
import cn from "clsx";
import { LoginForm } from "../../../features/forms/loginForm/LoginForm";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { login } from "src/app/store/slices/auth/auth";
import { AuthCredentials } from "src/api/services/auth/interface";

export type TAuthScreen = {
  className?: string;
};

export const SignInBlock: FC<TAuthScreen> = ({ className }) => {
  const dispatch = useAppDispatch();

  const onSubmitCb = ({ username, password }: AuthCredentials) => {
    dispatch(login({ username, password }));
  };

  return (
    <div className={cn(s.root, className)}>
      <div className={s.frame}>
        <div className={s.top}>
          <Title className={s.title}>Войти</Title>
        </div>
        <LoginForm onSubmitCb={onSubmitCb} />
        <div className={cn(s.signUpLinkContainer)}>
          <Link to={"/signup"}>Регистрация</Link>
        </div>
      </div>
    </div>
  );
};
