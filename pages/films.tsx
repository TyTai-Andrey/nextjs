import { Paggination } from '@components/Paggination';
import { DataList } from '@components/DataList';
import { FilmItemModel } from '@styles/interfaces';
import { BaseParams, FilterResult, Replace } from '@typings/base';
import { serverError } from '@utils/notifications';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useEffect } from 'react';
import FilmsApi from '@api/FilmsApi';
import Head from 'next/head';
import {
  TypeReturnServerRenderDataList,
  returnServerRenderDataList,
} from '@utils/returnServerRenderData';
import { ListPage } from '../compositions/ListPage';

type FilmsProps = TypeReturnServerRenderDataList<FilmItemModel>;

const Films: NextPage<FilmsProps> = (props) => (
  <ListPage {...props} headTitle='Films' />
);

export default Films;

export const getServerSideProps = async (
  ctx: Replace<GetServerSidePropsContext, 'query', BaseParams>,
): Promise<
  GetServerSidePropsResult<TypeReturnServerRenderDataList<FilmItemModel>>
> => {
  const { query } = ctx;

  const data = await FilmsApi.getFilmsList(query);

  return {
    props: returnServerRenderDataList(data),
  };
};
