import { useContext } from 'react';
import { ModalContext } from '../compositions/ModalProvider/ModalContext';

export interface ModalComponentProps {
  handleClose: () => void;
  isOpen: boolean;
}

export function useModal() {
  const { openModal, closeModal } = useContext(ModalContext);

  return { openModal, closeModal };
}
