import { Button } from '@components/Button';
import Search from '@components/Search';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePushRouter } from '@utils/usePushRouter';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  createRef,
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Header.module.css';
import { Links } from './Links';

export type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const { pushRouter } = usePushRouter();
  const search = useRef(null);

  const onClickHandler = useCallback(() => {
    pushRouter('search', search.current);
  }, []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    search.current = v ?? '';
  };

  return (
    <nav className={styles.root}>
      <Links />
      <Search
        value={search.current}
        onChange={onChangeSearch}
        name={'search'}
        placeholder={'Поиск...'}
      />
      <Button
        variant='short'
        className={styles.searchButton}
        onClick={onClickHandler}
      >
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </nav>
  );
};
