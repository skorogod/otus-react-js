import React, { type ChangeEvent, type FC, useEffect, useRef, useState } from "react";
import rangeSliderScss from './rangeSlider.module.scss'
import classNames from 'classnames'
import { getPercent } from "./helpers";

type TRangeSliderProps = {
  min: number;
  max: number;
	step: number;
  //onChange: ({min, max}: {min: number, max: number}) => void;
};

export const RangeSlider: FC<TRangeSliderProps> = ({ 
	min, max, step
}) => {
  const [minValue, setMinValue] = useState(min);
	const [maxValue , setMaxValue] = useState(max);
	const minValueRef = useRef<HTMLInputElement | null>(null)
	const maxValueRef = useRef<HTMLInputElement | null>(null)
	const rangeRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
			const minPercent = getPercent(minValue, min, max)
			const maxPercent = getPercent(maxValue, min, max)
			
			if (rangeRef.current) {
				rangeRef.current.style.left = `${minPercent}%`
				rangeRef.current.style.right = `${100 - maxPercent}%`
			}
		
	}, [minValue, maxValue, min, max])

  return (
    <div className={rangeSliderScss.rangeSlider}>
			
				<div className={rangeSliderScss.slider}>
					<div className={rangeSliderScss.track}  ref={rangeRef}></div>
					<div className={rangeSliderScss.sliderRange}></div>
					<div className={rangeSliderScss.leftValue}>{minValue}</div>
					<div className={rangeSliderScss.rightValue}>{maxValue}</div>
				</div>

				<div className={rangeSliderScss.rangeInput}>
				<input
					min={min}
					max={max}
					type="range"
					step={step}
					ref={minValueRef}
					value={minValue}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						const value = Math.min(+e.target.value, maxValue-step)
						setMinValue(value)
					}}
					className={classNames('thumb thumb--z-index-3', {
						'thumb--z-index-5': minValue > max - 100
					})}
				/>
				<input
					min={min}
					max={max}
					type="range" 
					step={step}
					ref={maxValueRef}
					value={maxValue}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						const value = Math.max(+e.target.value, minValue + step)
						setMaxValue(value)
					}}
					className="thumb--z-index-4"
				/>
				
			</div>
			{/* <div className={rangeSliderScss.values}>
				<input 
					type="number" 
					value={minValue}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						const value = Math.min(+e.target.value, maxValue - step)
						setMinValue(Math.max(value, min))
					}}
				/>
				<input 
					type="number" 
					value={maxValue}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						const value = Math.max(+e.target.value, minValue + step)
						setMaxValue(Math.min(value, max))
					}}
				/>
			</div> */}
    </div>
  );
};
