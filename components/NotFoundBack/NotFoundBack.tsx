import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@components/Button';

export type NotFoundBackProps = {};

export const NotFoundBack: FC<NotFoundBackProps> = () => {
  const router = useRouter();

  const backHandler = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>NotFound 404</title>
      </Head>
      NotFound 404
      <Button onClick={backHandler}>Back</Button>
    </>
  );
};
