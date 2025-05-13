import React, { FC, useState } from "react";
import cn from "clsx";
import s from "./signUpBlock.module.scss";
import { RegisterForm } from "../../../features/forms/registerForm/RegisterForm";
import { Title } from "../../../shared/ui/title/Title";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { AuthCredentials } from "src/api/services/auth/interface";
import { authService } from "src/api/services/auth/auth";

export type TAuthScreen = {
  className?: string;
};

export const SignUpBlockTest: FC<TAuthScreen> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const onSubmitCb = async ({ email, password }: AuthCredentials) => {
    try {
      const data = await authService.signup({ email, password });
      dispatch({
        type: "auth/signup/fulfilled",
        payload: data,
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={cn(s.root, className)}>
      <div className={s.frame}>
        <div className={s.top}>
          <Title className={s.title}>Регистрация Request in Component</Title>
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
