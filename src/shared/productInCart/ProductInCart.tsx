import React, { FC } from "react";
import { TProduct } from "../../interfaces/product.interface";
import producInCartCss from "./productInCart.module.scss";

import delteIcon from "../../assets/icons/delete.svg";

type ProductInCartProps = {
  product: TProduct;
  counter: number;
  onDelete: () => void;
};

export const ProductInCart: FC<ProductInCartProps> = ({
  product,
  counter,
  onDelete,
}) => (
  <article className={producInCartCss.productInCart}>
    <div className={producInCartCss.main}>
      <div className={producInCartCss.imageContainer}>
        <img
          className={producInCartCss.image}
          src={product.images[0]}
          alt="product-image"
        />
      </div>
      <div className={producInCartCss.info}>
        <p className={`title ${producInCartCss.title}`}>{product.title}</p>
        <div className={producInCartCss.infoGrid}>
          <label className={producInCartCss.costLabel} htmlFor="cost"></label>
          <p id="cost" className={producInCartCss.cost}>
            {product.costFull}
          </p>
        </div>
      </div>
    </div>
    {counter > 0 && <p className={producInCartCss.counter}>({counter})</p>}
    <div className={producInCartCss.deleteContainer}>
      <button onClick={onDelete} className={producInCartCss.deleteButton}>
        <img
          className={producInCartCss.deleteIcon}
          src={delteIcon}
          alt="delete-icon"
        />
      </button>
    </div>
  </article>
);
