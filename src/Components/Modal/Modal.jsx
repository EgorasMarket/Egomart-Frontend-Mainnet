import React from "react";
import "./index.css";
import { ArrowDown01Icon, ViewIcon, CancelCircleIcon } from "hugeicons-react";
const Modal = ({ title, isOpen, children, closeModal }) => {
  return (
    <div className={isOpen ? "modalDiv_open" : "modalDiv_hidden"}>
      <div className="modalDiv_closeDiv" onClick={closeModal}></div>
      <div className="modalDiv_body">
        <div className="modalDiv_body_head">
          <div className="modalDiv_body_cont1"> {title}</div>
          <div className="modalDiv_body_cont2" onClick={closeModal}>
            <CancelCircleIcon size={24} className="modalDiv_body_cont2" />
          </div>
        </div>
        <div className="modalDiv_body_area">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
