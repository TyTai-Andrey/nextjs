import PeopleApi from '@api/PeopleApi';
import { PeopleItemModel } from '@styles/interfaces';
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

type IndexProps = TypeReturnServerRenderDataList<PeopleItemModel>;

const Index: NextPage<IndexProps> = (props) => (
  <ListPage {...props} headTitle='Peoples' />
);

export default Index;

export const getServerSideProps = async (
  ctx: Replace<GetServerSidePropsContext, 'query', BaseParams>,
): Promise<
  GetServerSidePropsResult<TypeReturnServerRenderDataList<PeopleItemModel>>
> => {
  const { query } = ctx;

  const data = await PeopleApi.getPeoplesList(query);

  return {
    props: returnServerRenderDataList(data),
  };
};
