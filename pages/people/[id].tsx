import PeopleApi from '@api/PeopleApi';
import { DataList } from '@components/DataList';
import { PeopleItemModel } from '@styles/interfaces';
import { FilterResult, Replace } from '@typings/base';
import { serverError } from '@utils/notifications';
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { useEffect } from 'react';

type IndexProps = {
  people: PeopleItemModel;
  isServerError: string;
};

const Index: NextPage<IndexProps> = ({ people, isServerError }) => {
  useEffect(() => {
    if (isServerError) {
      serverError(isServerError);
    }
  }, []);

  if (isServerError) return <div>Error</div>;
  if (!people) return <div>Не найдено</div>;

  return (
    <div className='flex flex-col justify-between w-100%'>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Имя</div>
        <div>{people?.name}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Рост</div>
        <div>{people?.height}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Вес</div>
        <div>{people?.mass}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Пол</div>
        <div>{people?.gender}</div>
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Звездолеты</div>
        <DataList
          noDriver
          data={people?.starships?.map((i) => ({ url: i, title: i }))}
          style={{ maxHeight: '5rem' }}
        />
      </div>
      <div className='flex justify-between border-b-2 border-sky-500 p-2'>
        <div className='mr-1'>Фильмы</div>
        <DataList
          noDriver
          data={people?.films?.map((i) => ({ url: i, title: i }))}
          style={{ maxHeight: '5rem' }}
        />
      </div>
    </div>
  );
};

export default Index;

export const getStaticPaths = async () => {
  const peoples = await PeopleApi.getPeoplesList();

  const paths = new Array((peoples as FilterResult<PeopleItemModel>).count)
    .fill('')
    .map((_, id) => ({
      params: { id: String(id + 1) },
    }));
  return { paths, fallback: true };
};

export const getStaticProps = async (
  ctx: Replace<GetStaticPropsContext, 'params', { id: string }>,
) => {
  const {
    params: { id },
  } = ctx;
  const people = await PeopleApi.getOnePeople(id);

  if (!people.isError)
    return {
      props: { people },
    };

  return {
    props: { isServerError: people.message },
  };
};
