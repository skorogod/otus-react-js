import React, { type FC } from "react";
import basicCardScss from "./basicCard.module.scss";
import { TBasicCardProps } from "./basicCard.interface";

export const BasicCard: FC<TBasicCardProps> = ({
  backgroundColor,
  color,
  photo,
  header,
  main,
  footer,
}) => (
  <article
    className={basicCardScss.card}
    style={{ backgroundColor: backgroundColor, color: color }}
  >
    <header className={basicCardScss.header}>{header}</header>
    <main className={basicCardScss.main}>
      <div className={basicCardScss.imageContainer}>
        <img className={basicCardScss.image} src={photo} alt="product-image" />
      </div>
      {main}
    </main>
    <footer className={basicCardScss.footer}>{footer}</footer>
  </article>
);
