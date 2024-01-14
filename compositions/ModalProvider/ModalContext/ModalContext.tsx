import { ModalComponentProps } from '@components/Modal';
import React from 'react';

export type OpenModal = <T>(
  modal: React.FC<T>,
  modalProps?: Omit<T, keyof ModalComponentProps>,
) => void;

export const ModalContext = React.createContext<{
  openModal: OpenModal;
  closeModal: () => void;
}>({
  openModal: () => {},
  closeModal: () => {},
});
