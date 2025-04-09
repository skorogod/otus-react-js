import React, { FC } from "react";
import { Logo } from "../../shared/logo/Logo";
import { Button } from "../../shared/button/Button";

import s from "./header.module.scss";
import { ThemeToggler } from "../../shared/themeToggler/ThemeToggler";
import { useTheme } from "../../hooks/useTheme";
import { useLang } from "../../hooks/useLang";
import { LanguageSwitcher } from "../../shared/languageSwitcher/laguageSwitcher";
import { Navigation } from "../../shared/ui/navigation/Navigation";
import { routes } from "../../routes/routes";

import cn from "clsx";
import { Link } from "react-router-dom";
import { TUser } from "src/app/store/slices/auth/interface";

type HeaderProps = {
  user?: TUser | null;
  backgroundColor?: string;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
};

export const Header: FC<HeaderProps> = ({
  user,
  backgroundColor,
  onLogin,
  onLogout,
  onCreateAccount,
}) => {
  const themeContext = useTheme();
  const languageContext = useLang();

  return (
    <header
      style={{ backgroundColor: backgroundColor }}
      className={`${s.header} ${themeContext.theme === "dark" ? s.dark : ""}`}
    >
      <div className={s.content}>
        <div className={s.logo}>
          <Logo />
        </div>
        <Navigation routes={routes} />
        <div className={cn(s.tools)}>
          <LanguageSwitcher></LanguageSwitcher>
          <ThemeToggler></ThemeToggler>
          <div className={s.userInfo}>
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
                <Link to={"/signin"}>
                  <Button
                    primary={themeContext.theme !== "light"}
                    size="small"
                    onClick={onLogin}
                    label={languageContext.t("loginLabel")}
                  />
                </Link>
                <Link to={"/signup"}>
                  <Button
                    primary={themeContext.theme !== "light"}
                    size="small"
                    onClick={onCreateAccount}
                    label={languageContext.t(`signUpLabel`)}
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
