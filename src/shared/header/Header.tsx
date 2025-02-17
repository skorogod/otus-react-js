import React, { FC } from "react";
import type { User } from "src/interfaces/user.interface";
import { Logo } from "../logo/Logo";
import { Button } from "../button/Button";

import headerCss from "./header.module.scss";
import { ThemeToggler } from "../themeToggler/ThemeToggler";
import { useTheme } from "../../hooks/useTheme";
import { useLang } from "../../hooks/useLang";
import { LanguageSwitcher } from "../languageSwitcher/laguageSwitcher";

type HeaderProps = {
  user?: User;
  backgroundColor?: string;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
};

export const Header: FC<HeaderProps> = ({ user, backgroundColor, onLogin, onLogout, onCreateAccount }) => {
  const themeContext = useTheme();
  const languageContext = useLang();

  return (
    <header
      style={{ backgroundColor: backgroundColor }}
      className={`${headerCss.header} ${themeContext.theme === "dark" ? headerCss.dark : ""}`}
    >
      <div className={headerCss.content}>
        <div className={headerCss.logo}>
          <Logo />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <LanguageSwitcher></LanguageSwitcher>
          <ThemeToggler></ThemeToggler>
          <div className={headerCss.userInfo}>
            {user ? (
              <>
                <Button
                  primary={themeContext.theme !== "light"}
                  size="small"
                  onClick={onLogout}
                  label={languageContext.t("logoutLabel")}
                />
              </>
            ) : (
              <>
                <Button
                  primary={themeContext.theme !== "light"}
                  size="small"
                  onClick={onLogin}
                  label={languageContext.t("loginLabel")}
                />
                <Button
                  primary={themeContext.theme !== "light"}
                  size="small"
                  onClick={onCreateAccount}
                  label={languageContext.t(`signUpLabel`)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
