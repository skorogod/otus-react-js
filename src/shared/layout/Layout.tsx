import React, { FC, ReactElement } from "react";
import { Header } from "../../features/header/Header";
import cn from "clsx";
import s from "./layout.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import { authSlice } from "@/app/store/slices/auth/auth";
import { authService } from "@/api/services/auth/authFactory";

type LayoutProps = {
  children: ReactElement;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(authSlice.actions.logout());
    authService.logout();
  };

  return (
    <>
      <Header
        user={user}
        onCreateAccount={() => {
          console.log("create account");
        }}
        onLogin={() => console.log("login")}
        onLogout={() => onLogout()}
      />
      <main className={cn(s.main)}>{children}</main>
    </>
  );
};
