import React, { FC, memo } from 'react';
import styles from './Paggination.module.css';
import { usePushRouter } from '@utils/usePushRouter';
import useQuery from '@utils/useQuery';

export type PagginationProps = {
  count?: number;
};

export const Paggination: FC<PagginationProps> = memo(({ count = 0 }) => {
  const query = useQuery();
  const _page = Number(query.get('page') || '1');
  const { pushRouterQuery } = usePushRouter();

  const onClickHandler = (page: number) => {
    pushRouterQuery('page', String(page));
  };

  return (
    <ul className={styles.root}>
      <li>
        <button
          disabled={_page === 1}
          onClick={onClickHandler.bind(null, _page - 1)}
        >
          {'<'}
        </button>
      </li>

      {!!count &&
        new Array(Math.ceil(count / 10)).fill('').map((_, idx) => {
          return (
            <li key={`${idx} li`}>
              <button
                disabled={_page === idx + 1}
                onClick={onClickHandler.bind(null, idx + 1)}
              >
                {idx + 1}
              </button>
            </li>
          );
        })}
      <li>
        <button
          disabled={_page === Math.ceil(count / 10)}
          onClick={onClickHandler.bind(null, _page + 1)}
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
});
