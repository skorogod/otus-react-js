import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { FormItem } from "../../../shared/ui/formItem/FormItem";
import cn from "clsx";
import s from "./textField.module.scss";

export type TTextFieldProps = TextFieldProps & {
  errors: string;
  title: string;
  className?: string;
};

export const FormTextField: React.FC<TTextFieldProps> = ({
  errors,
  className,
  title,
  ...restProps
}) => (
  <FormItem
    title={title}
    help={errors}
    className={cn(s.root, className)}
    required
    validateStatus={Boolean(errors)}
  >
    <TextField {...restProps} />
  </FormItem>
);
