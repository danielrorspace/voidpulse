import React from "react";
import Modal from "react-modal";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

export type Kids<T> = React.FC<React.PropsWithChildren<T>>;

interface FullScreenModalOverlayProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const FullScreenModalOverlay: Kids<FullScreenModalOverlayProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <Modal
      style={{
        overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.7)" },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={"flex items-center justify-center w-full h-full"}
    >
      {children}
    </Modal>
  );
};
