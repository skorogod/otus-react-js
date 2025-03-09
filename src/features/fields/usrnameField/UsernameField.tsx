import React, { ChangeEvent, FC, FocusEvent, Ref } from "react";
import cn from "clsx";
import { OutlinedInput } from "@mui/material";
import { FormItem } from "src/shared/ui/formItem/FormItem";
import s from "./usernameField.module.scss";
import { TFieldProps } from "../types";

export type TNameField = TFieldProps & {
  submitCount: number;
  errors: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
};

export const UsernameField: FC<TNameField> = ({
  className,
  onChange,
  onBlur,
  value,
  errors,
  disabled,
}) => (
  <FormItem
    className={cn(s.root, className)}
    title="Имя пользователя"
    required
    validateStatus={Boolean(errors)}
    help={errors}
  >
    <OutlinedInput
      value={value}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      placeholder="Имя пользователя"
    />
  </FormItem>
);
