import React, { FC, ChangeEvent, FocusEvent, useState } from "react";
import { FormItem } from "src/shared/ui/formItem/FormItem";
import s from "./passwordField.module.scss";
import cn from "clsx";
import {
  InputProps,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export type TPasswordFieldProps = InputProps & {
  errors: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
};

export const PasswordField: FC<TPasswordFieldProps> = ({
  errors,
  title,
  onChange,
  onBlur,
  className,
  value,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormItem
      title={title}
      required
      help={errors}
      className={cn(s.root, className)}
      validateStatus={Boolean(errors)}
    >
      <OutlinedInput
        {...restProps}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </FormItem>
  );
};
