import React, { ReactElement, FC } from "react";
import modalCss from "./modal.module.scss";
import { Portal } from "../portal/Portal";

type ModalProps = {
  visible: boolean;
  children: ReactElement | string;
  onCloseClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Modal: FC<ModalProps> = ({ visible, children, onCloseClick }) => (
  <Portal>
    <div className={`${modalCss.modalOverlay} ${visible && modalCss.visible}`}>
      <div className={modalCss.modal}>
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
