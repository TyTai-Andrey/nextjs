import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ReactNotifications } from 'react-notifications-component';
import { store } from '@store/index';
import { ModalProvider } from '../ModalProvider';
import { LoadingProvider } from '../LoadingProvider';
import { Header } from '../Header';
import { Layout } from '@components/Layout';

export type ProvidersWrapperProps = {
  children: React.ReactNode;
};

export const ProvidersWrapper: FC<ProvidersWrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ReactNotifications />
      <ModalProvider>
        <LoadingProvider>
          <Header />
          <Layout>{children}</Layout>
        </LoadingProvider>
      </ModalProvider>
    </Provider>
  );
};
