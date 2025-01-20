import React, { FC } from 'react';
import productCardCss from './productCard.module.scss';
import { ToCart } from '../toCart/ToCart';
import type { ProductCardProps } from '../../interfaces/product.interface';

export const ProductCard: FC<ProductCardProps> = ({
  color,
  backgroundColor,
  title,
  image,
  description,
  costFull,
  count,
}) => {
  return (
    <article className={productCardCss.productCard} style={{ backgroundColor: backgroundColor, color: color }}>
      <header className={productCardCss.header}>
        <p className={`title ${productCardCss.title}`}>{title}</p>
      </header>
      <main className={productCardCss.main}>
        <div className={productCardCss.imageContainer}>
          <img className={productCardCss.image} src={image} alt="product-image" />
        </div>
        <p className={productCardCss.description}>{description}</p>
        <div className={productCardCss.info}>
          <label className={productCardCss.costLabel} htmlFor="cost"></label>
          <p id="cost">{costFull}</p>
        </div>
      </main>
      <footer className={productCardCss.footer}>
        <ToCart counter={count}></ToCart>
      </footer>
    </article>
  );
};
