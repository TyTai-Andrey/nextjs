import withReduxForm from '@utils/withReduxForm';
import classNames from 'classnames';
import React, { FC, LegacyRef, forwardRef, memo } from 'react';
import styles from './Search.module.css';

export interface SearchProps {
  /**
   * className для кастомизации
   */
  className?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  defaultValue?: string | number;
  /**
   * подцепляется к форме
   */
  name: string;
  placeholder: string;
}

export const Search = memo(
  forwardRef<HTMLInputElement, SearchProps>(
    ({ className, name, ...props }, ref) => {
      return (
        <input
          ref={ref}
          className={classNames(styles.root, className)}
          {...props}
        />
      );
    },
  ),
);
