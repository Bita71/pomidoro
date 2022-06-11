import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/modules/modals/modal.module.scss";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  className: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setNode(document.getElementById("modals"));

    function handleClick(event: MouseEvent) {
      if (ref.current === event.target) {
        onClose();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  if (!node) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={styles.bg} ref={ref}>
      <div className={styles.modal}>
        <button type="button" onClick={onClose} className={classNames('reset-button',styles.buttonClose)} />
        <div className={className}>{children}</div>
      </div>
    </div>,
    node
  );
};

export default Modal;
