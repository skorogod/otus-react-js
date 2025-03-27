import React, { FC } from "react";
import cn from "clsx";
import s from "./navigation.module.scss";
import { TNavigationRoute } from "./interfaces";
import { NavLink } from "react-router-dom";
import { useTheme } from "src/hooks/useTheme";

export type TNavigationProps = {
  className?: string;
  routes: TNavigationRoute[];
};

export const Navigation: FC<TNavigationProps> = ({ className, routes }) => {
  const theme = useTheme();
  return (
    <div className={cn(s.root, className)}>
      <nav className={cn(s.nav)}>
        <ul className={cn(s.navList)}>
          {routes.map((route) => (
            <li className={cn(s.navListItem)} key={route.href}>
              <NavLink
                className={cn(s.link, { [s.dark]: theme.theme === "dark" })}
                to={route.href}
              >
                {route.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
