import { ModalComponentProps } from '@utils/useModal';
import React from 'react';

export const ModalContext = React.createContext<{
  openModal: <T>(
    modal: React.FC<T>,
    modalProps?: Omit<T, keyof ModalComponentProps>,
  ) => void;
  closeModal: () => void;
}>({
  openModal: () => {},
  closeModal: () => {},
});
