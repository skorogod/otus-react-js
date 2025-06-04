import React, { FC } from "react";
import { BasicCard } from "../../../../shared/basicCard/BasicCard";
import { TBasicCardProps } from "../../../../shared/basicCard/basicCard.interface";
import { Title } from "../../../../shared/ui/title/Title";
import s from "./categoryCard.module.scss";
import cn from "clsx";

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
