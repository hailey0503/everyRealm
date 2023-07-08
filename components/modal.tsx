import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 p-20 ">
      <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose} />
      <div className="bg-white rounded-lg p-10 z-10 h-3/5 w-1/2">{children}</div>
    </div>
  );
};

export default Modal;
