import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '@components/Button';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePushRouter } from '@utils/usePushRouter';
import styles from './Header.module.css';
import { Links } from './Links';
import useQuery from '@utils/useQuery';
import { Search } from '@components/Search';
import { useRouter } from 'next/router';

export type HeaderProps = {};

export const Header: FC<HeaderProps> = memo(() => {
  const query = useQuery();
  const { pathname } = useRouter();
  const search = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);
  const [disabledInput, setDisabledInput] = useState(true);

  const { pushRouterQueryList } = usePushRouter();

  const onClickHandler = useCallback(() => {
    setDisabled(true);
    pushRouterQueryList({
      search: search.current.value,
      page: 1,
    });
  }, [pushRouterQueryList]);

  const onChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      search.current.value = value ?? '';
      setDisabled((query?.get('search') ?? '') === value);
    },
    [query?.get('search')],
  );

  useEffect(() => {
    setDisabledInput(!['/ ', '/starships', '/films'].includes(pathname));
  }, [pathname]);

  return (
    <nav className={styles.root}>
      <Links />
      <Search
        ref={search}
        onChange={onChange}
        defaultValue={query?.get('search') || ''}
        key={query?.get('search') || ''}
        name={'search'}
        placeholder={'Поиск...'}
        disabled={disabledInput}
      />
      <Button
        variant='short'
        className={styles.searchButton}
        onClick={onClickHandler}
        disabled={disabled}
        icon={<FontAwesomeIcon icon={faCheck} />}
      />
    </nav>
  );
});
