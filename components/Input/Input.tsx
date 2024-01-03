import withReduxForm from '@utils/withReduxForm';
import classNames from 'classnames';
import React, { FC, LegacyRef, forwardRef, memo } from 'react';
import styles from './Input.module.css';
import { title } from 'process';

export type InputProps = {
  /**
   * className для кастомизации
   */
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  defaultValue?: string | number;
  /**
   * подцепляется к форме
   */
  name?: string;
  placeholder?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ className, name, label, error, ...props }, ref) => {
      return (
        <label
          className={classNames(styles.root, className, {
            [styles.errorBackgroundColorRed]: error,
          })}
        >
          {label && <p className={styles.label}>{label}</p>}

          <input className={styles.input} ref={ref} {...props} />
          {error && <p className={styles.error}>{error}</p>}
        </label>
      );
    },
  ),
);

export const InputRedux = withReduxForm(Input);
