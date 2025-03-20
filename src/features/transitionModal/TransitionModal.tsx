import React, { type FC, type ReactNode } from "react";
import { useTransition, animated } from "react-spring";
import { Portal } from "../../shared/portal/Portal";
import s from "./transitionModal.module.scss";

type TTransitionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const TransitionModal: FC<TTransitionModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    config: { tension: 300, friction: 20 },
  });
  return (
    <Portal>
      <>
        {transitions(
          (styles, item) =>
            item && (
              <animated.div
                style={styles}
                onClick={onClose}
                className={s.modalOverlay}
              >
                <animated.div
                  style={styles}
                  onClick={(e) => e.stopPropagation()}
                  className={s.modal}
                >
                  <header className={s.modalHeader}>
                    <button onClick={onClose} className={s.closeButton}>
                      <i className={s.closeIcon}></i>
                    </button>
                  </header>
                  {children}
                </animated.div>
              </animated.div>
            )
        )}
      </>
    </Portal>
  );
};
