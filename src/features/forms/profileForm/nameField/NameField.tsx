import React, { ChangeEvent, FC, FocusEvent, Ref } from "react";
import cn from "clsx";
import { OutlinedInput } from "@mui/material";
import { FormItem } from "../../../../shared/ui/formItem/FormItem";
import s from "./nameField.module.scss";
import { type ProfileFormProps } from "../types";

export type TNameField = Pick<
  ProfileFormProps,
  "className" | "disabled" | "autoFocusElement"
> & {
  value?: string;
  submitCount: number;
  errors: string;
  ref: Ref<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
};

export const NameField: FC<TNameField> = ({
  className,
  onChange,
  onBlur,
  ref,
  value,
  errors,
  disabled,
}) => (
  <FormItem
    className={cn(s.root, className)}
    title="Имя"
    required
    validateStatus={Boolean(errors)}
    help={errors}
  >
    <OutlinedInput
      ref={ref}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      placeholder="Введите имя"
    />
  </FormItem>
);
