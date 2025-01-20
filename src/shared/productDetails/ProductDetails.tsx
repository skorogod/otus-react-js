import React, { FC, useEffect, useRef, useState } from 'react';
import type { Product } from '../../interfaces/product.interface';
import productDetailsCss from './productDetails.module.scss';
import { ToCart } from '../toCart/ToCart';

type Props = Product & {
  inStock: number;
};

export const ProductDetails: FC<Props> = ({
  inStock,
  title,
  costFull,
  costDiscount,
  images,
  description,
  category,
}) => {
  const ref = useRef<null | HTMLParagraphElement>(null);
  const [descriptionOverflow, setDescriptionOverflow] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const onToggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    if (ref.current) {
      setDescriptionOverflow(ref.current.scrollHeight > ref.current.clientHeight);
    }
  });

  return (
    <div className={productDetailsCss.productDetails}>
      <div className={productDetailsCss.productCard}>
        <div className={productDetailsCss.images}>
          <picture className={productDetailsCss.mainImageContainer}>
            <img className={productDetailsCss.mainImage} src={images[0]} alt="" />
          </picture>
        </div>
        <div className={productDetailsCss.info}>
          <h1 className={productDetailsCss.title}>{title}</h1>
          <div className={productDetailsCss.categoryContainer}>
            <label className={productDetailsCss.categoryLabel} htmlFor="category"></label>
            <p id="category">{category ? category.name : 'нет данных'}</p>
          </div>
          <div className={productDetailsCss.inStock}>
            <span>{inStock} шт.</span>
          </div>
        </div>

        <div className={productDetailsCss.purchaise}>
          <div className={productDetailsCss.cost}>
            <p className={productDetailsCss.costFull} id="cost">
              {costFull}
            </p>
            {costDiscount && <p className={productDetailsCss.costDiscount}>{costDiscount}</p>}
          </div>
          <div className={productDetailsCss.purchaiseButtons}>
            <div className={productDetailsCss.buy}>
              <ToCart counter={1}></ToCart>
              <button className={productDetailsCss.buyButton}>Купить</button>
            </div>
            <a role="button" className={productDetailsCss.contact} href="">
              Написать продавцу
            </a>
          </div>
        </div>
      </div>

      <div className={productDetailsCss.productInfo}>
        <p className="title">Информация о товаре</p>
        <div>
          <p
            id="description"
            ref={ref}
            className={`${productDetailsCss.description} ${showFullDescription ? productDetailsCss.full : ''}`}
          >
            {description}
          </p>
          {descriptionOverflow || showFullDescription ? (
            <div className={productDetailsCss.moreToggle}>
              <a href="#" onClick={onToggleFullDescription} role="button">
                {!showFullDescription ? 'ещё' : 'свернуть'}
              </a>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
