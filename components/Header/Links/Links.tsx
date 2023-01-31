import Link from 'next/link';
import React, { FC, memo, useMemo } from 'react';
import styles from './Links.module.css';

export type LinksProps = {};

export const Links: FC<LinksProps> = memo(() => (
  <div className={styles.root}>
    <Link href={'/'}>Главная</Link>
    <Link href={'/users'}>Пользователи</Link>
  </div>
));
