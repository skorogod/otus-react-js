import { ReactNode } from "react";

export type TBasicCardProps = {
    backgroundColor?: string;
    color?: string;
    image: string;
    header: ReactNode,
    main: ReactNode,
    footer: ReactNode
}