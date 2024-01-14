import { useContext } from 'react';
import { ModalContext } from '../compositions/ModalProvider/ModalContext';

export function useModal() {
  const { openModal, closeModal } = useContext(ModalContext);

  return { openModal, closeModal };
}
