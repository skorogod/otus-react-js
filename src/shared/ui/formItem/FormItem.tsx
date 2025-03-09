import React, { FC } from "react";
import cn from "clsx";
import { Title } from "../title/Title";
import s from "./formItem.module.scss";
import { FormControl, FormHelperText } from "@mui/material";

export type Help = null | React.ReactNode;

export type FormItemProps = {
  className?: string;
  title: React.ReactNode | React.ReactNode[];
  validateStatus: boolean;
  help: Help;
  required?: boolean;
  children: React.ReactNode;
};

export const FormItem: FC<FormItemProps> = ({
  validateStatus,
  required,
  help,
  className,
  title,
  children,
}) => (
  <div className={cn(s.root, className)}>
    <Title required={required}>{title}</Title>
    <FormControl fullWidth error={validateStatus}>
      {children}
      <FormHelperText>{help}</FormHelperText>
    </FormControl>
  </div>
);

FormItem.displayName = "FormItem";
