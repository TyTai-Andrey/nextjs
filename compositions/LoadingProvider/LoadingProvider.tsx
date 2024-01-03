import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './LoadingProvider.module.css';
import { frontendError } from '@utils/notifications';

export type LoadingProps = {
  children: React.ReactNode;
};

export const LoadingProvider = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);

    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    const handleError = (err: { cancelled: boolean }) => {
      if (!err.cancelled) {
        frontendError();
      }
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  });

  return (
    <>
      {children}
      {loading ? (
        <div className={styles.root}>
          <div />
        </div>
      ) : null}
    </>
  );
};
