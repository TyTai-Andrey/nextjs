import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import styles from './LoadingProvider.module.css';

export type LoadingProps = {
  children: React.ReactNode;
};

export const LoadingProvider = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return loading ? (
    <>
      {children}
      <div className={styles.root}>
        <div />
      </div>
    </>
  ) : (
    children
  );
};
