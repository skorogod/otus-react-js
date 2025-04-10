import React, {
  type ReactNode,
  type FC,
  useRef,
  useState,
  useEffect,
} from "react";

export type TInfiniteScrollProps = {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  once?: boolean;
  next?: () => void;
  observerOptions?: IntersectionObserverInit;
  className?: string;
};

export const InfiniteScroll: FC<TInfiniteScrollProps> = ({
  children,
  next,
  className,
  once,
  observerOptions,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (isIntersecting && next) {
      next();
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (ref.current) {
      const child = ref.current.lastElementChild;
      if (child) {
        const observer = new IntersectionObserver(([entry]) => {
          setIsIntersecting(entry.isIntersecting);
          if (once && entry.isIntersecting) {
            observer.unobserve(child);
          }
        }, observerOptions);
        observer.observe(child);
        return () => observer.unobserve(child);
      }
    }
  }, [children, observerOptions, once]);

  return (
    <div ref={ref} className={`infiniteScroll ${className}`}>
      {children}
    </div>
  );
};
