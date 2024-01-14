import React, { useCallback, useState } from 'react';
import { ModalContext } from './ModalContext';
import { OpenModal } from './ModalContext/ModalContext';

type ModalProviderState = {
  modal: React.FC | null;
  isOpen: boolean;
  modalProps: any;
};

const initialState = {
  modal: null,
  isOpen: false,
  modalProps: null,
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ModalProviderState>(initialState);
  const Component = state.modal ? state.modal : null;
  const openModal: OpenModal = useCallback(
    (modal, modalProps) => {
      document.body.style.overflow = 'hidden';

      setState({
        modal,
        isOpen: true,
        modalProps,
      });
    },
    [setState],
  );

  const closeModal = useCallback(() => {
    document.body.style.overflow = '';

    setState(initialState);
  }, [setState]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {state.isOpen && Component && (
        <Component
          isOpen={state.isOpen}
          handleClose={closeModal}
          {...state.modalProps}
        />
      )}
    </ModalContext.Provider>
  );
};
