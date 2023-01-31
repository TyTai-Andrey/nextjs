import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ReactNotifications } from 'react-notifications-component';
import { store } from '@store/index';
import { ModalProvider } from '@components/ModalProvider';
import { LoadingProvider } from '@components/LoadingProvider';
import { Header } from '@components/Header';

export type ProvidersWrapperProps = {
  children: React.ReactNode;
};

export const ProvidersWrapper: FC<ProvidersWrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ModalProvider>
        <LoadingProvider>
          <Header />
          {children}
        </LoadingProvider>
      </ModalProvider>
    </Provider>
  );
};
