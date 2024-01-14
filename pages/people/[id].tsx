import PeopleApi from '@api/PeopleApi';
import { DataList } from '@components/DataList';
import { PeopleItemModel } from '@styles/interfaces';
import { FilterResult, Replace } from '@typings/base';
import {
  GetServerSidePropsResult,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { CheckErrorAndNotFound } from '../../compositions/CheckErrorAndNotFound';
import {
  TypeReturnServerRenderDataItem,
  returnServerRenderDataItem,
} from '@utils/returnServerRenderData';

type IndexProps = TypeReturnServerRenderDataItem<PeopleItemModel>;

const Index: NextPage<IndexProps> = (props) => {
  return (
    <CheckErrorAndNotFound {...props}>
      {({ data }) => (
        <div className='flex flex-col justify-between w-100%'>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Имя</div>
            <div>{data.name}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Рост</div>
            <div>{data.height}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Вес</div>
            <div>{data.mass}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Пол</div>
            <div>{data.gender}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Звездолеты</div>
            <DataList
              noDriver
              data={data?.starships?.map((i) => ({ url: i, title: i }))}
              style={{ maxHeight: '5rem' }}
            />
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Фильмы</div>
            <DataList
              noDriver
              data={data?.films?.map((i) => ({ url: i, title: i }))}
              style={{ maxHeight: '5rem' }}
            />
          </div>
        </div>
      )}
    </CheckErrorAndNotFound>
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
): Promise<
  GetServerSidePropsResult<TypeReturnServerRenderDataItem<PeopleItemModel>>
> => {
  const {
    params: { id },
  } = ctx;
  const data = await PeopleApi.getOnePeople(id);

  return {
    props: returnServerRenderDataItem(data),
  };
};
