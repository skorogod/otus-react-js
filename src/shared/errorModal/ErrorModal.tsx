import React, { FC } from "react";
import s from "./errorModal.module.scss";
import cn from "clsx";
import { Modal } from "../modal/Modal";
import { Button } from "@mui/material";

type Props = {
  className?: string;
  error: string;
  onClose: () => void;
};

export const ErrorModal: FC<Props> = ({ className, error, onClose }) => (
  <Modal visible onCloseClick={onClose}>
    <div className={cn(className, s.errorModalInner)}>
      <h2>{error}</h2>
      <Button onClick={onClose} variant="contained" color="error">
        Ок
      </Button>
    </div>
  </Modal>
);
