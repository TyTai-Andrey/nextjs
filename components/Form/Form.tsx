import classNames from 'classnames';
import React from 'react';
import styles from './Form.module.css';

export interface FormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: React.FC<FormProps> = ({
  children,
  className,
  onSubmit,
}) => (
  <form className={classNames(styles.root, className)} onSubmit={onSubmit}>
    {children}
  </form>
);
