import withReduxForm from '@utils/withReduxForm';
import classNames from 'classnames';
import React, { FC } from 'react';
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

export interface SearchInterface extends FC<SearchProps> {
  Redux: typeof SearchRedux;
}

const Search: SearchInterface = ({ className, name, ...props }) => {
  return <input className={classNames(styles.root, className)} {...props} />;
};

const SearchRedux = withReduxForm(Search);

Search.Redux = SearchRedux;

export default Search;
