import StarshipsApi from '@api/StarshipsApi';
import { DataList } from '@components/DataList';
import { StarshipItemModel } from '@styles/interfaces';
import { Replace } from '@typings/base';
import { serverError } from '@utils/notifications';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect } from 'react';

type IndexProps = {
  starship: StarshipItemModel;
  isServerError: string;
};

const Index: NextPage<IndexProps> = ({ starship, isServerError }) => {
  useEffect(() => {
    if (isServerError) {
      serverError(isServerError);
    }
  }, []);

  if (!starship) return <div>Не найдено</div>;

  return (
    <div className='flex flex-col justify-between w-100%'>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Название</div>
        <div>{starship?.name}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Модель</div>
        <div>{starship?.model}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Длина</div>
        <div>{starship?.length}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Стоимость</div>
        <div>{starship?.cost_in_credits}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Фильмы</div>
        <DataList
          noDriver
          data={starship?.films?.map((i) => ({ url: i, title: i }))}
          style={{ maxHeight: '5rem' }}
        />
      </div>
    </div>
  );
};

export default Index;

export const getServerSideProps = async (
  ctx: Replace<GetServerSidePropsContext, 'params', { id: string }>,
) => {
  const {
    params: { id },
  } = ctx;
  const starship = await StarshipsApi.getOneStarship(id);

  if (!starship.isError)
    return {
      props: { starship },
    };

  return {
    props: { isServerError: starship.message },
  };
};
