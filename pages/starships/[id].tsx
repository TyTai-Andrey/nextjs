import StarshipsApi from '@api/StarshipsApi';
import { DataList } from '@components/DataList';
import { StarshipItemModel } from '@styles/interfaces';
import { FilterResult, Replace } from '@typings/base';
import {
  TypeReturnServerRenderDataItem,
  returnServerRenderDataItem,
} from '@utils/returnServerRenderData';
import {
  GetServerSidePropsResult,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { CheckErrorAndNotFound } from '../../compositions/CheckErrorAndNotFound';

type IndexProps = TypeReturnServerRenderDataItem<StarshipItemModel>;

const Index: NextPage<IndexProps> = (props) => {
  return (
    <CheckErrorAndNotFound {...props}>
      {({ data }) => (
        <div className='flex flex-col justify-between w-100%'>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Название</div>
            <div>{data.name}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Модель</div>
            <div>{data.model}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Длина</div>
            <div>{data.length}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Стоимость</div>
            <div>{data.cost_in_credits}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Фильмы</div>
            <DataList
              noDriver
              data={data.films?.map((i) => ({ url: i, title: i }))}
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
  const starships = await StarshipsApi.getStarshipsList();

  const paths = new Array((starships as FilterResult<StarshipItemModel>).count)
    .fill('')
    .map((_, id) => ({
      params: { id: String(id + 1) },
    }));
  return { paths, fallback: true };
};

export const getStaticProps = async (
  ctx: Replace<GetStaticPropsContext, 'params', { id: string }>,
): Promise<
  GetServerSidePropsResult<TypeReturnServerRenderDataItem<StarshipItemModel>>
> => {
  const {
    params: { id },
  } = ctx;
  const data = await StarshipsApi.getOneStarship(id);

  return {
    props: returnServerRenderDataItem(data),
  };
};
