import React, { FC, useLayoutEffect } from "react";
import cn from "clsx";
import s from "./signUpBlock.module.scss";
import { RegisterForm } from "../../../features/forms/registerForm/RegisterForm";
import { Title } from "../../../shared/ui/title/Title";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/hooks/useAppDispatch";
import { SignUpCredentials } from "../../../api/services/auth/interface";
import { selectAuthError, signup } from "../../../app/store/slices/auth/auth";
import { useAppSelector } from "../../../app/hooks/useAppSelector";
import { setAuthError } from "../../../app/store/slices/auth/auth";

export type TAuthScreen = {
  className?: string;
};

export const SignUpBlock: FC<TAuthScreen> = ({ className }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);

  const onSubmitCb = ({ email, name, password }: SignUpCredentials) => {
    dispatch(signup({ email, name, password }));
  };

  useLayoutEffect(() => {
    dispatch(setAuthError(""));
  }, []);

  return (
    <div className={cn(s.root, className)}>
      <div className={s.frame}>
        <div className={s.top}>
          <Title className={s.title}>Регистрация Async Thunk</Title>
        </div>
        <RegisterForm onSubmitCb={onSubmitCb} />
        {error && <div className={cn(s.errors)}>{error}</div>}
        <div className={cn(s.signInLinkContainer)}>
          <Link to={"/signin"}>Войти</Link>
        </div>
      </div>
    </div>
  );
};
