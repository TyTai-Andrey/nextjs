import { Paggination } from '@components/Paggination';
import { DataList } from '@components/DataList';
import { FilmItemModel } from '@styles/interfaces';
import { BaseParams, FilterResult, Replace } from '@typings/base';
import { serverError } from '@utils/notifications';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect } from 'react';
import FilmsApi from '@api/FilmsApi';
import Head from 'next/head';

type FilmsProps = {
  films?: FilterResult<FilmItemModel>;
  isServerError: string;
};

const Films: NextPage<FilmsProps> = ({ films, isServerError }) => {
  useEffect(() => {
    if (isServerError) {
      serverError(isServerError);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Films</title>
      </Head>
      <DataList data={films?.results} />
      <Paggination count={films?.count} />
    </>
  );
};

export default Films;

export const getServerSideProps = async (
  ctx: Replace<GetServerSidePropsContext, 'query', BaseParams>,
) => {
  const { query } = ctx;

  const films = await FilmsApi.getFilmsList(query);
  if (!films.isError)
    return {
      props: { films },
    };

  return {
    props: { isServerError: films.message },
  };
};
