import React, { FC } from 'react';
import styles from './SearchForm.module.css';
import { reduxForm } from 'redux-form';
import { searchShape } from './shapes';
import { Form } from '@components/Form';
import Search from '@components/Search';

export type SearchFormProps = {};

export const FORM_HEADER_SEARCH = 'HeaderSearch';

const SearchForm: FC<SearchFormProps> = () => {
  return (
    <Form>
      <Search.Redux name={'search'} placeholder={'Поиск'} />
    </Form>
  );
};

export default reduxForm({
  form: FORM_HEADER_SEARCH,
  initialValues: searchShape.form.shape,
})(SearchForm);
