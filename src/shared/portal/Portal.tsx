import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

export const Portal: FC<Props> = ({ children }) =>
  createPortal(children, document.body);
