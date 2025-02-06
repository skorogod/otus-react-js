import React, { FC, ReactNode } from "react";

type Props = {
    children: ReactNode
}


export const Portal:FC<Props> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}