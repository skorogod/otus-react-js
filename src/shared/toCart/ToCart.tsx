import React, { FC } from "react";

import toCartCss from "./toCart.module.scss";

type toCartProps = {
  counter: number;
};

export const ToCart: FC<toCartProps> = ({ counter = 0 }) => {
  return (
    <div className={toCartCss.toCart}>
      {counter === 0 ? (
        <button className={[toCartCss.cartButton, toCartCss.button].join(" ")}>
          <i className={toCartCss.cartIcon}></i>
        </button>
      ) : (
        <div className={toCartCss.cartInput}>
          <button className={[toCartCss.button, toCartCss.plusButton].join(" ")}>
            <i className={toCartCss.minusIcon}></i>
          </button>
          <input defaultValue={counter} className={toCartCss.counterInput} type="text" />
          <button className={[toCartCss.button, toCartCss.plusButton].join(" ")}>
            <i className={toCartCss.plusIcon}></i>
          </button>
        </div>
      )}
    </div>
  );
};
