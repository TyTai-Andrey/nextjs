import React from 'react';

export const ModalContext = React.createContext<{
  openModal: (modal: React.FC<any>, modalProps?: any) => void;
  closeModal: () => void;
}>({
  openModal: () => {},
  closeModal: () => {},
});
