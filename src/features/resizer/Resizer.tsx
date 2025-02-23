import React, { type ReactNode, type FC, useEffect, useRef, useState } from "react";
import s from "./Resizer.module.scss";

type TResizerProps = {
  children: ReactNode;
  initialWidth: number;
  initialHeight: number;
};

export const Resizer: FC<TResizerProps> = ({ children, initialHeight, initialWidth }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: initialWidth, height: initialHeight });

  useEffect(() => {
    if (rootRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const contentBoxSize = entry.contentBoxSize[0];
          if (wrapperRef.current) {
            wrapperRef.current.style.fontSize = `${Math.max(contentBoxSize.inlineSize / 200, 1.5)}rem`;
          }
        }
      });
      observer.observe(rootRef.current);
    }
  }, [rootRef.current]);

  const MIN_SIZE = 32;

  const onMouseDownResizer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (rootRef.current) {
      const start = { x: 0, y: 0, width: MIN_SIZE, height: MIN_SIZE };
      const move = (e: MouseEvent) => {
        e.preventDefault();
        if (rootRef.current) {
          const rect = rootRef.current.getBoundingClientRect();
          const x = start.x - (e.clientX - rect.x);
          const y = start.y - (e.clientY - rect.y);
          setSize({ width: start.width - x, height: start.height - y });
        }
      };

      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }
  };

  return (
    <div id="resizer-root" ref={rootRef} className={s.root} style={{ height: size.height, width: size.width }}>
      <div ref={wrapperRef} className={s.wrapper}>
        {children}
      </div>
      <button type="button" className={s.resizer} onMouseDown={onMouseDownResizer} />
    </div>
  );
};
