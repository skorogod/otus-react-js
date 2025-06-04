import React, { FC, useLayoutEffect } from "react";
import s from "./signInBlock.module.scss";
import { Title } from "../../../shared/ui/title/Title";
import cn from "clsx";
import { LoginForm } from "../../../features/forms/loginForm/LoginForm";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { login, selectAuthError } from "src/app/store/slices/auth/auth";
import { AuthCredentials } from "src/api/services/auth/interface";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { Link } from "react-router-dom";
import { setAuthError } from "src/app/store/slices/auth/auth";

export type TAuthScreen = {
  className?: string;
};

export const SignInBlock: FC<TAuthScreen> = ({ className }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);

  const onSubmitCb = ({ email, password }: AuthCredentials) => {
    dispatch(login({ email, password }));
  };

  useLayoutEffect(() => {
    dispatch(setAuthError(""));
  }, []);

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
        {error && <div className={cn("error-text")}>{error}</div>}
      </div>
    </div>
  );
};
