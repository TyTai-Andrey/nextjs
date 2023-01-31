import PeopleApi from '@api/PeopleApi';
import { PeopleItemModel } from '@redux/people/interfaces';
import { FilterResult } from '@typings/base';
import { GetServerSidePropsContext, NextPage } from 'next';

type IndexProps = {
  _peoples?: FilterResult<PeopleItemModel>;
};

const Index: NextPage<IndexProps> = ({ _peoples }) => {
  return (
    <>
      <ul>
        {_peoples?.results?.map((i) => (
          <li>{i.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Index;

export async function getServerSideProps(
  ctx: GetServerSidePropsContext & { query: { search?: string } },
) {
  const { query } = ctx;
  const { search } = query || {};

  const _peoples = await PeopleApi.getPeoplesList({ search });
  // const _d = await get();
  if (_peoples)
    return {
      props: { _peoples: _peoples },
    };

  return {
    props: { _peoples: null },
  };
}

// const get = async () => {
//   return new Promise((r) => setTimeout(() => r('2'), 10000));
// };
