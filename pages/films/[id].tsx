import FilmsApi from '@api/FilmsApi';
import { DataList } from '@components/DataList';
import { FilmItemModel } from '@styles/interfaces';
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

type IndexProps = TypeReturnServerRenderDataItem<FilmItemModel>;

const Index: NextPage<IndexProps> = (props) => {
  return (
    <CheckErrorAndNotFound {...props}>
      {({ data }) => (
        <>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Название</div>
            <div>{data?.title}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Директор</div>
            <div>{data?.director}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Продюсер</div>
            <div>{data?.producer}</div>
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Люди</div>
            <DataList
              noDriver
              data={data?.characters?.map((i) => ({ url: i, title: i }))}
              style={{
                maxHeight: '5rem',
              }}
            />
          </div>
          <div className='flex justify-between border-b-2 border-sky-500 p-2'>
            <div className='mr-1'>Звездолеты</div>
            <DataList
              noDriver
              data={data?.starships?.map((i) => ({ url: i, title: i }))}
              style={{
                maxHeight: '5rem',
              }}
            />
          </div>
        </>
      )}
    </CheckErrorAndNotFound>
  );
};

export default Index;

export const getStaticPaths = async () => {
  const films = await FilmsApi.getFilmsList();

  const paths = new Array((films as FilterResult<FilmItemModel>).count)
    .fill('')
    .map((_, id) => ({
      params: { id: String(id + 1) },
    }));
  return { paths, fallback: true };
};

export const getStaticProps = async (
  ctx: Replace<GetStaticPropsContext, 'params', { id: string }>,
): Promise<
  GetServerSidePropsResult<TypeReturnServerRenderDataItem<FilmItemModel>>
> => {
  const {
    params: { id },
  } = ctx;
  const data = await FilmsApi.getOneFilm(id);

  return {
    props: returnServerRenderDataItem(data),
  };
};
