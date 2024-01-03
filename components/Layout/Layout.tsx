import React, { FC, memo } from 'react';
import styles from './Layout.module.css';

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = memo(({ children }) => (
  <div className={styles.root}>{children}</div>
));
