import React, { useState } from "react";
import { TransitionModal } from "../../features/transitionModal/TransitionModal";

export const TransitionModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <TransitionModal isOpen={isOpen} onClose={handleClose}>
        Test
      </TransitionModal>
      <button onClick={() => setIsOpen(true)}>open</button>
    </>
  );
};
