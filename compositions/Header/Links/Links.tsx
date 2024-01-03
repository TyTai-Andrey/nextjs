import Link from 'next/link';
import React, { FC, memo } from 'react';
import styles from './Links.module.css';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export type LinksProps = {};

const links = [
  {
    href: '/',
    title: 'Главная',
  },
  {
    href: '/starships',
    title: 'Звездолеты',
  },
  {
    href: '/films',
    title: 'Фильмы',
  },
  {
    href: '/draft',
    title: 'Черновик',
  },
];

export const Links: FC<LinksProps> = memo(() => {
  const router = useRouter();

  // 880

  return (
    <div className={styles.root}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classNames('select-none', {
            'pointer-events-none cursor-pointer': link.href === router.pathname,
          })}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
});
