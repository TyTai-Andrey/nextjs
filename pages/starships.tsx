import StarshipsApi from '@api/StarshipsApi';
import { Paggination } from '@components/Paggination';
import { DataList } from '@components/DataList';
import { StarshipItemModel } from '@styles/interfaces';
import { BaseParams, FilterResult, Replace } from '@typings/base';
import { serverError } from '@utils/notifications';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect } from 'react';

type StarshipsProps = {
  starships?: FilterResult<StarshipItemModel>;
  isServerError: string;
};

const Starships: NextPage<StarshipsProps> = ({ starships, isServerError }) => {
  useEffect(() => {
    if (isServerError) {
      serverError(isServerError);
    }
  }, []);

  return (
    <>
      <DataList data={starships?.results} />
      <Paggination count={starships?.count} />
    </>
  );
};

export default Starships;

export const getServerSideProps = async (
  ctx: Replace<GetServerSidePropsContext, 'query', BaseParams>,
) => {
  const { query } = ctx;

  const starships = await StarshipsApi.getStarshipsList(query);
  if (!starships.isError)
    return {
      props: { starships },
    };

  return {
    props: { isServerError: starships.message },
  };
};
