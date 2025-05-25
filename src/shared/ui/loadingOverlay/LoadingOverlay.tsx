import React, { FC } from "react";

import { Spinner } from "../spinner/Spinner";
import s from "./loadingOverlay.module.scss";
import cn from "clsx";

type Props = {
  className?: string;
};

export const LoadingOverlay: FC<Props> = ({ className }) => (
  <div className={cn(s.overlay, className)}>
    <Spinner />
  </div>
);
