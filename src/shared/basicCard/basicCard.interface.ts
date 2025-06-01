import { ReactNode } from "react";

export type TBasicCardProps = {
  className?: string;
  backgroundColor?: string;
  color?: string;
  photo: string;
  header: ReactNode;
  main?: ReactNode;
  footer?: ReactNode;
};
