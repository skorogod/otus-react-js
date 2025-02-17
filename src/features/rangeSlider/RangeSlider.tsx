import React, { type ChangeEvent, type FC, useEffect, useRef, useState } from "react";
import rangeSliderScss from "./rangeSlider.module.scss";
import { getPercent } from "./helpers";
import { RangeInput } from "./RangeInput";
import { TextInput } from "./TextRangeInput";

type TRangeSliderProps = {
  min: number;
  max: number;
  step: number;
};

export const RangeSlider: FC<TRangeSliderProps> = ({ min, max, step }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minValueRef = useRef<HTMLInputElement | null>(null);
  const maxValueRef = useRef<HTMLInputElement | null>(null);
  const rangeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const minPercent = getPercent(minValue, min, max);
    const maxPercent = getPercent(maxValue, min, max);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.right = `${100 - maxPercent}%`;
    }
  }, [minValue, maxValue, min, max]);

  return (
    <div className={rangeSliderScss.rangeSlider}>
      <div className={rangeSliderScss.slider}>
        <div className={rangeSliderScss.track} ref={rangeRef}></div>
        <div className={rangeSliderScss.sliderRange}></div>
        <div className={rangeSliderScss.leftValue}>{minValue}</div>
        <div className={rangeSliderScss.rightValue}>{maxValue}</div>
      </div>

      <div className={rangeSliderScss.rangeInputContainer}>
        <RangeInput
          min={min}
          max={max}
          step={step}
          ref={minValueRef}
          value={minValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+e.target.value, maxValue - step);
            setMinValue(value);
          }}
        />
        <RangeInput
          min={min}
          max={max}
          step={step}
          ref={maxValueRef}
          value={maxValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+e.target.value, minValue + step);
            setMaxValue(value);
          }}
        />
      </div>
      <div className={rangeSliderScss.values}>
        <TextInput
          type="number"
          value={minValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+e.target.value, maxValue - step);
            setMinValue(Math.max(value, min));
          }}
        />
        <TextInput
          type="number"
          value={maxValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+e.target.value, minValue + step);
            setMaxValue(Math.min(value, max));
          }}
        />
      </div>
    </div>
  );
};
