import React, { FC, ReactElement } from "react";
import { Header } from "../../features/header/Header";
import cn from "clsx";
import s from "./layout.module.scss";

type LayoutProps = {
  children: ReactElement;
};

export const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Header
      onCreateAccount={() => {
        console.log("create account");
      }}
      onLogin={() => console.log("login")}
      onLogout={() => console.log("logout")}
    />
    <main className={cn(s.main)}>{children}</main>
  </>
);
