import React, { FC, InputHTMLAttributes } from "react";
import textRangeScss from "./textRangeInput.module.scss";

type TTextRangeInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput: FC<TTextRangeInputProps> = ({ ...props }) => (
  <input type="number" {...props} className={textRangeScss.textRangeInput} />
);
