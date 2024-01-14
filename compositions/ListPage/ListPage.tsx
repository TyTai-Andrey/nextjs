import React, { useEffect } from 'react';
import styles from './ListPage.module.css';
import {
  TypeReturnServerRenderDataList,
  isFilterResultDataCheck,
  isNotFoundCheck,
  isServerErrorCheck,
} from '@utils/returnServerRenderData';
import { serverError } from '@utils/notifications';
import Head from 'next/head';
import { DataList } from '@components/DataList';
import { Paggination } from '@components/Paggination';
import { NotFoundBack } from '@components/NotFoundBack';
import { CheckErrorAndNotFound } from '../CheckErrorAndNotFound';
import { FilterResult } from '@typings/base';

export type ListPageProps<T> = {
  headTitle: string;
} & TypeReturnServerRenderDataList<T>;

export const ListPage = <
  T extends { url: string; title?: string; name?: string },
>({
  headTitle,
  ...props
}: ListPageProps<T>) => {
  useEffect(() => {
    if (isServerErrorCheck(props) || isNotFoundCheck(props)) {
      serverError(props?.isServerError);
    }
  }, [props]);

  if (isNotFoundCheck(props)) return <NotFoundBack />;

  return (
    <CheckErrorAndNotFound {...props}>
      {({ dataResult: data }) => (
        <>
          <Head>
            <title>{headTitle}</title>
          </Head>
          <DataList data={data?.results} />
          <Paggination count={data?.count} />
        </>
      )}
    </CheckErrorAndNotFound>
  );
};
