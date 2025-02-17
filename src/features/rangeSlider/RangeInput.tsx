import React, { type FC, type InputHTMLAttributes, type Ref } from "react";
import rangeInputScss from "./rangeInput.module.scss";

type TRangeInputProps = InputHTMLAttributes<HTMLInputElement> & {
  min: number;
  max: number;
  step: number;
  ref: Ref<HTMLInputElement>;
};

export const RangeInput: FC<TRangeInputProps> = ({ min, max, step, ref, value, onChange, ...restProps }) => {
  return (
    <input
      min={min}
      max={max}
      type="range"
      step={step}
      ref={ref}
      value={value}
      onChange={onChange}
      {...restProps}
      className={rangeInputScss.rangeInput}
    />
  );
};
