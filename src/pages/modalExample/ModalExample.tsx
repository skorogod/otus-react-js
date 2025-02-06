import modalExampleScss from "./modalExample.module.scss";
import React, { FC, useState } from "react";

import { Modal } from "../../shared/modal/Modal";

export const ModalExample = () => {
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div className={modalExampleScss.modalExampleContainer}>
        <input
          placeholder="enter some text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => setModalVisible(!modalVisible)}>
          show Modal
        </button>
      </div>
      <Modal
        visible={modalVisible}
        onCloseClick={(e) => setModalVisible(!modalVisible)}
      >
        {text}
      </Modal>
    </>
  );
};
