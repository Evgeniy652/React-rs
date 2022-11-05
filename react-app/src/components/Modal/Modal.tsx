/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = (props: any) => {
  const modalRoot = document.getElementById("modal-root");
  const divElement = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(divElement);

    return () => {
      modalRoot.removeChild(divElement);
    };
  }, [modalRoot, divElement]);

  return ReactDOM.createPortal(props.children, divElement);
};

export default Modal;
