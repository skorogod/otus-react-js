import React, { ChangeEvent, FC, FocusEvent, Ref } from "react";
import cn from "clsx";
import { OutlinedInput } from "@mui/material";
import { FormItem } from "src/shared/ui/formItem/FormItem";
import s from "./emailField.module.scss";
import { TFieldProps } from "../types";

export type TNameField = TFieldProps & {
  submitCount: number;
  errors: string;
  ref: Ref<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
};

export const EmailField: FC<TNameField> = ({
  className,
  onChange,
  onBlur,
  ref,
  errors,
  disabled,
}) => (
  <FormItem
    className={cn(s.root, className)}
    title="Почта"
    required
    validateStatus={Boolean(errors)}
    help={errors}
  >
    <OutlinedInput
      ref={ref}
      type="mail"
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      placeholder="Введите почтовый адрес"
    />
  </FormItem>
);
