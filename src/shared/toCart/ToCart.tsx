import React, { ChangeEvent, FC } from "react";

import toCartCss from "./toCart.module.scss";

type toCartProps = {
  counter: number;
  onCountChange: (count: number) => void;
};

export const ToCart: FC<toCartProps> = ({ counter = 0, onCountChange }) => {
  console.log("COUNT, counter", counter);
  return (
    <div className={toCartCss.toCart}>
      {counter === 0 ? (
        <button
          onClick={() => onCountChange(1)}
          className={[toCartCss.cartButton, toCartCss.button].join(" ")}
        >
          <i className={toCartCss.cartIcon}></i>
        </button>
      ) : (
        <div className={toCartCss.cartInput}>
          <button
            onClick={() => onCountChange(counter - 1)}
            className={[toCartCss.button, toCartCss.plusButton].join(" ")}
          >
            <i className={toCartCss.minusIcon}></i>
          </button>
          <input
            value={counter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onCountChange(Number(e.target.value))
            }
            defaultValue={counter}
            className={toCartCss.counterInput}
            type="text"
          />
          <button
            onClick={() => onCountChange(counter + 1)}
            className={[toCartCss.button, toCartCss.plusButton].join(" ")}
          >
            <i className={toCartCss.plusIcon}></i>
          </button>
        </div>
      )}
    </div>
  );
};
