import PeopleApi from '@api/PeopleApi';
import { Paggination } from '@components/Paggination';
import { DataList } from '@components/DataList';
import { PeopleItemModel } from '@styles/interfaces';
import { BaseParams, FilterResult, Replace } from '@typings/base';
import { serverError } from '@utils/notifications';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';

type IndexProps = {
  peoples?: FilterResult<PeopleItemModel>;
  isServerError: string;
};

const Index: NextPage<IndexProps> = ({ peoples, isServerError }) => {
  useEffect(() => {
    if (isServerError) {
      serverError(isServerError);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Peoples</title>
      </Head>
      <DataList data={peoples?.results} />
      <Paggination count={peoples?.count} />
    </>
  );
};

export default Index;

export const getServerSideProps = async (
  ctx: Replace<GetServerSidePropsContext, 'query', BaseParams>,
) => {
  const { query } = ctx;

  const peoples = await PeopleApi.getPeoplesList(query);
  if (!peoples.isError)
    return {
      props: { peoples },
    };

  return {
    props: { isServerError: peoples.message },
  };
};
