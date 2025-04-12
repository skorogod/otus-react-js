import React, { FC } from "react";
import productCardCss from "./productCard.module.scss";
import { ToCart } from "../../toCart/ToCart";
import type { TProductCardProps } from "../../../interfaces/product.interface";
import productScss from "../product.module.scss";
import { BasicCard } from "../../../shared/basicCard/BasicCard";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { selectProductQuantity } from "src/app/store/slices/cart/cart.slice";

export const ProductCard: FC<TProductCardProps> = ({
  id,
  title,
  description,
  costFull,
  costDiscount,
  count,
  image,
  onCountChange,
  ...restProps
}) => {
  const cartCount = useSelector((state: RootState) =>
    selectProductQuantity(state, id)
  );
  return (
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
              <p
                id={`cost-discount-${id}`}
                className={productScss.costDiscount}
              >
                {costDiscount}
              </p>
            )}
          </div>
        </>
      }
      footer={<ToCart counter={cartCount || 0} onCountChange={onCountChange} />}
      {...restProps}
    />
  );
};
