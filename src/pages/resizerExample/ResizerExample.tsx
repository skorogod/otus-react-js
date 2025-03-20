import React, { FC } from "react";
import { Resizer } from "../../features/resizer/Resizer";

type TPropsResizerExample = {
  initialHeight: number;
  initialWidth: number;
};

export const ResizerExample: FC<TPropsResizerExample> = ({
  initialHeight,
  initialWidth,
}) => (
  <Resizer initialHeight={initialHeight} initialWidth={initialWidth}>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit quod
      placeat quaerat, ab inventore quo ex assumenda doloribus molestiae
      quisquam qui vitae recusandae sit, iure obcaecati! Iusto ut cupiditate
      nesciunt commodi minima, cumque earum voluptatem corrupti reiciendis illum
      sapiente ipsum, facilis iste sequi fugit hic consequuntur quaerat. Iure
      aliquid minima, iste fuga iusto magnam repellendus! Quos, atque at iure
      hic repellat natus possimus voluptates blanditiis odit laboriosam quis
      molestias eos cumque doloribus cupiditate necessitatibus sint labore,
      repellendus nemo laudantium ea, sapiente fugit. Obcaecati laborum natus
      quidem repudiandae repellat sapiente eveniet libero molestias! Voluptate
      facilis repellendus praesentium animi nemo cum. Ipsam.
    </p>
  </Resizer>
);
