import React, { FC } from 'react';
import styles from './MysticForm.module.css';
import { Form } from '@components/Form';
import { InjectedFormProps, getFormValues, reduxForm } from 'redux-form';
import { InputRedux } from '@components/Input';
import { Button } from '@components/Button';
import { FORM_NAME, FormProps, MysticFormProps } from './utils';
import { useSelector } from 'react-redux';

const FormComponent: FC<
  FormProps & InjectedFormProps<MysticFormProps, FormProps>
> = ({ handleSubmit, onSubmit }) => {
  const { radio } = useSelector(
    (state) => getFormValues(FORM_NAME)(state),
    () => false,
  ) as MysticFormProps;

  return (
    <Form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <InputRedux
        className={styles.input}
        name='name'
        label='Name'
        placeholder='Jonn'
      />
      <InputRedux
        className={styles.input}
        name='action'
        label='Action'
        placeholder='says "hi"'
      />
      <InputRedux
        className={styles.input}
        name='quantity'
        label='Quantity'
        placeholder='2'
      />
      <InputRedux
        className={styles.checkbox}
        type='radio'
        value='clear'
        name='radio'
        label='Clear the form after closing'
      />
      <InputRedux
        className={styles.checkbox}
        type='radio'
        value='save'
        name='radio'
        label='Save this values (don`t destroy form on close)'
      />
      <InputRedux
        className={styles.checkbox}
        type='radio'
        value='setValues'
        name='radio'
        label='Start with this initial values (when submit)'
      />

      {radio === 'setValues' && (
        <>
          <InputRedux
            className={styles.input}
            name='inital_name'
            label='Set inital name'
            placeholder='Jonn'
          />
          <InputRedux
            className={styles.input}
            name='inital_action'
            label='Set inital action'
            placeholder='says "hi"'
          />
          <InputRedux
            className={styles.input}
            name='inital_quantity'
            label='Set inital quantity'
            placeholder='2'
          />
        </>
      )}

      <Button className={styles.submit_button} type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export const MysticForm = reduxForm<MysticFormProps, FormProps>({
  form: FORM_NAME,
  initialValues: {
    radio: 'clear',
  },
  destroyOnUnmount: false,
})(FormComponent);
