import React, { ChangeEvent, FC } from "react";

import toCartCss from "./toCart.module.scss";

type toCartProps = {
  counter: number;
  onCountIncrease: (count: number) => void;
  onCountDecrease: (count: number) => void;
  onCountSet: (count: number) => void;
};

export const ToCart: FC<toCartProps> = ({
  counter = 0,
  onCountIncrease,
  onCountDecrease,
  onCountSet,
}) => (
  <div className={toCartCss.toCart}>
    {counter === 0 ? (
      <button
        onClick={() => onCountIncrease(1)}
        className={[toCartCss.cartButton, toCartCss.button].join(" ")}
      >
        <i className={toCartCss.cartIcon}></i>
      </button>
    ) : (
      <div className={toCartCss.cartInput}>
        <button
          onClick={() => onCountDecrease(counter - 1)}
          className={[toCartCss.button, toCartCss.plusButton].join(" ")}
        >
          <i className={toCartCss.minusIcon}></i>
        </button>
        <input
          value={counter}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onCountSet(Number(e.target.value))
          }
          defaultValue={counter}
          className={toCartCss.counterInput}
          type="text"
        />
        <button
          onClick={() => onCountIncrease(counter + 1)}
          className={[toCartCss.button, toCartCss.plusButton].join(" ")}
        >
          <i className={toCartCss.plusIcon}></i>
        </button>
      </div>
    )}
  </div>
);
