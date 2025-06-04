import React, { FC } from "react";
import productCardCss from "./productCard.module.scss";
import { TProductCardProps } from "src/interfaces/product.interface";
import productScss from "../product.module.scss";
import { BasicCard } from "src/shared/basicCard/BasicCard";

export const ProductCard: FC<TProductCardProps> = ({
  id,
  name,
  desc,
  price,
  oldPrice,
  photo,
  footer,
  ...restProps
}) => (
  <BasicCard
    photo={photo}
    header={<p className="title">{name}</p>}
    main={
      <>
        <p className={productCardCss.description}>{desc}</p>
        <div className={productCardCss.info}>
          <label
            className={productCardCss.costLabel}
            htmlFor={`cost-${id}`}
          ></label>
          <p id={`cost-${id}`}>{price}</p>
          {oldPrice && (
            <p id={`cost-discount-${id}`} className={productScss.costDiscount}>
              {oldPrice}
            </p>
          )}
        </div>
      </>
    }
    footer={footer}
    {...restProps}
  />
);
