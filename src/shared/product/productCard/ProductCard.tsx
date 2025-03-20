import React, { FC } from "react";
import productCardCss from "./productCard.module.scss";
import { ToCart } from "../../toCart/ToCart";
import type { TProductCardProps } from "../../../interfaces/product.interface";
import productScss from "../product.module.scss";
import { BasicCard } from "../../../shared/basicCard/BasicCard";

export const ProductCard: FC<TProductCardProps> = ({
  id,
  title,
  description,
  costFull,
  costDiscount,
  count,
  image,
  ...restProps
}) => (
  <BasicCard
    image={image}
    header={<p className="title">{title}</p>}
    main={
      <>
        <p className={productCardCss.description}>{description}</p>
        <div className={productCardCss.info}>
          <label
            className={productCardCss.costLabel}
            htmlFor={`cost-${id}`}
          ></label>
          <p id={`cost-${id}`}>{costFull}</p>
          {costDiscount && (
            <p id={`cost-discount-${id}`} className={productScss.costDiscount}>
              {costDiscount}
            </p>
          )}
        </div>
      </>
    }
    footer={<ToCart counter={count}></ToCart>}
    {...restProps}
  />
);
