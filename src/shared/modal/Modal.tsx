import React, { ReactElement, FC } from "react";
import modalCss from "./modal.module.scss";
import { Portal } from "../portal/Portal";
import cn from "clsx";

type ModalProps = {
  className?: string;
  visible: boolean;
  children: ReactElement | string;
  onCloseClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Modal: FC<ModalProps> = ({
  className,
  visible,
  children,
  onCloseClick,
}) => (
  <Portal>
    <div className={`${modalCss.modalOverlay} ${visible && modalCss.visible}`}>
      <div className={cn(modalCss.modal, className)}>
        <header className={modalCss.modalHeader}>
          <button onClick={onCloseClick} className={modalCss.closeButton}>
            <i className={modalCss.closeIcon}></i>
          </button>
        </header>
        {children}
      </div>
    </div>
  </Portal>
);
