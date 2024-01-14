import StarshipsApi from '@api/StarshipsApi';
import { StarshipItemModel } from '@styles/interfaces';
import { BaseParams, Replace } from '@typings/base';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import {
  TypeReturnServerRenderDataList,
  returnServerRenderDataList,
} from '@utils/returnServerRenderData';
import { ListPage } from '../compositions/ListPage';

type StarshipsProps = TypeReturnServerRenderDataList<StarshipItemModel>;

const Starships: NextPage<StarshipsProps> = (props) => (
  <ListPage {...props} headTitle='Starships' />
);

export default Starships;

export const getServerSideProps = async (
  ctx: Replace<GetServerSidePropsContext, 'query', BaseParams>,
): Promise<
  GetServerSidePropsResult<TypeReturnServerRenderDataList<StarshipItemModel>>
> => {
  const { query } = ctx;

  const data = await StarshipsApi.getStarshipsList(query);

  return {
    props: returnServerRenderDataList(data),
  };
};
