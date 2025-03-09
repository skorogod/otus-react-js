import React, { FC } from "react";
import cn from "clsx";
import { FormItem } from "src/shared/ui/formItem/FormItem";
import { TextareaAutosize } from "@mui/material";
import { ProfileFormProps } from "../types";
import s from "./aboutField.module.scss";

import type { ChangeEvent, FocusEvent } from "react";

export type AboutFieldProps = Pick<
  ProfileFormProps,
  "className" | "disabled"
> & {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
};

export const AboutField: FC<AboutFieldProps> = ({
  className,
  onChange,
  onBlur,
  disabled,
}) => {
  const { validateStatus, help } = { validateStatus: true, help: "" };

  return (
    <FormItem
      className={cn(s.root, className)}
      title="О себе"
      validateStatus={validateStatus}
      help={help}
    >
      <TextareaAutosize
        minRows={3}
        disabled={disabled}
        name="about"
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Напишите  что-то о себе"
      />
    </FormItem>
  );
};

AboutField.displayName = "AboutField";
