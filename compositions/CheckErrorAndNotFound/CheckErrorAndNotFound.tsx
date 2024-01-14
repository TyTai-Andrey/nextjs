import React, { useEffect } from 'react';
import styles from './CheckErrorAndNotFound.module.css';
import {
  Data,
  FilterResultData,
  TypeReturnServerRenderDataItem,
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
import { FilterResult } from '@typings/base';
// FilterResult<T> | T

// interface IdLabel {
//   id: number /* some fields */;
// }
// interface NameLabel {
//   name: string /* other fields */;
// }

// type NameOrId<T extends number | number[]> = T extends number
//   ? IdLabel
//   : NameLabel;

// function createLabel<T extends number | number[]>(idOrName: T): NameOrId<T> {
//   throw "unimplemented";
// }

type NameOrId<T, R extends FilterResult<T> | T> = R extends T
  ? T
  : FilterResult<T>;

export type CheckErrorAndNotFoundProps<T> = {
  children: (data: {
    dataResult?: FilterResult<T>;
    data?: T;
  }) => React.ReactNode;
} & (TypeReturnServerRenderDataList<T> | TypeReturnServerRenderDataItem<T>);

export const CheckErrorAndNotFound = <
  T extends { url: string; title?: string; name?: string },
>({
  children,
  ...props
}: CheckErrorAndNotFoundProps<T>) => {
  useEffect(() => {
    if (isServerErrorCheck(props) || isNotFoundCheck(props)) {
      serverError(props?.isServerError);
    }
  }, [props]);
  if (isNotFoundCheck(props)) return <NotFoundBack />;
  if (isFilterResultDataCheck(props)) {
    if (isFilterResultCheck(props.data))
      return <>{children({ dataResult: props.data })}</>;
    return <>{children({ data: props.data })}</>;
  }

  return null;
};

function isFilterResultCheck<T>(
  props: FilterResult<T> | T,
): props is FilterResult<T> {
  return (props as FilterResult<T>).results !== undefined;
}
