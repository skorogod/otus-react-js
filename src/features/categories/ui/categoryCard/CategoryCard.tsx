import React, { FC } from "react";
import s from "./categoryCard.module.scss";
import cn from "clsx";
import { BasicCard } from "src/shared/basicCard/BasicCard";
import { TBasicCardProps } from "src/shared/basicCard/basicCard.interface";
import { Title } from "src/shared/ui/title/Title";

type Props = Omit<TBasicCardProps, "header"> & {
  name: string;
  className?: string;
};

export const CategoryCard: FC<Props> = ({ className, photo, name, footer }) => (
  <BasicCard
    className={cn(s.root, className)}
    photo={photo}
    header={<Title>{name}</Title>}
    footer={footer}
  />
);
