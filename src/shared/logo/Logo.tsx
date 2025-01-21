import React, { FC } from "react";

import logo from "../../assets/logo.svg";
import logoCss from "./logo.module.scss";

type LogoProps = {
  size?: "small" | "medium" | "large";
};

export const Logo: FC<LogoProps> = ({ size = "medium" }) => {
  return (
    <div className={[logoCss.logoContainer, logoCss[size]].join(" ")}>
      <img className={logoCss.logo} src={logo} alt="logo" />
    </div>
  );
};
