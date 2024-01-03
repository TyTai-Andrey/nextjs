import FilmsApi from '@api/FilmsApi';
import { DataList } from '@components/DataList';
import { FilmItemModel } from '@styles/interfaces';
import { Replace } from '@typings/base';
import { serverError } from '@utils/notifications';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect } from 'react';

type IndexProps = {
  film: FilmItemModel;
  isServerError: string;
};

const Index: NextPage<IndexProps> = ({ film, isServerError }) => {
  useEffect(() => {
    if (isServerError) {
      serverError(isServerError);
    }
  }, []);

  if (!film) return <div>Не найдено</div>;

  return (
    <>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Название</div>
        <div>{film?.title}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Директор</div>
        <div>{film?.director}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Продюсер</div>
        <div>{film?.producer}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Люди</div>
        <DataList
          noDriver
          data={film?.characters?.map((i) => ({ url: i, title: i }))}
          style={{
            maxHeight: '5rem',
          }}
        />
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Звездолеты</div>
        <DataList
          noDriver
          data={film?.starships?.map((i) => ({ url: i, title: i }))}
          style={{
            maxHeight: '5rem',
          }}
        />
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps = async (
  ctx: Replace<GetServerSidePropsContext, 'params', { id: string }>,
) => {
  const {
    params: { id },
  } = ctx;
  const film = await FilmsApi.getOneFilm(id);

  if (!film.isError)
    return {
      props: { film },
    };

  return {
    props: { isServerError: film.message },
  };
};
