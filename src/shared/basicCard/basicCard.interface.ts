import { ReactNode } from "react";

export type TBasicCardProps = {
  backgroundColor?: string;
  color?: string;
  photo: string;
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
};
