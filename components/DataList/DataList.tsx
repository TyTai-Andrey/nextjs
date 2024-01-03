import React, { memo } from 'react';
import styles from './DataList.module.css';
import { usePushRouter } from '@utils/usePushRouter';
import classNames from 'classnames';

type DataItem = { url: string; title?: string; name?: string };

interface DataListProps<RecordType> {
  data: RecordType[];
  className?: string;
  noDriver?: boolean;
  style?: React.CSSProperties;
}
[];

declare const MemoDataList: <RecordType extends DataItem>(
  props: DataListProps<RecordType>,
) => React.ReactElement;

type DataListType = typeof MemoDataList;

export const DataList: DataListType = memo(
  ({ data, className, style, noDriver }) => {
    const { pushRouter } = usePushRouter();

    const onClickHandler = (url: string) => {
      const path = url.replace(/https:\/\/swapi.dev\/api/, '');

      pushRouter(path, {});
    };

    return (
      <ul
        className={classNames(styles.root, className, {
          [styles.noDriver]: noDriver,
        })}
        style={style}
      >
        {data?.map((i) => (
          <li key={i.url} onClick={onClickHandler.bind(null, i.url)}>
            {i.name ?? i.title}
          </li>
        ))}
      </ul>
    );
  },
);
