import React from 'react';
import { Box, Portal } from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      <Box
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <Box className="absolute inset-0 bg-black opacity-50" />
        <Box
          className="relative z-10 bg-white rounded-lg shadow-lg p-6"
          onClick={handleContentClick}
        >
          {children}
        </Box>
      </Box>
    </Portal>
  );
};

export default Modal;
