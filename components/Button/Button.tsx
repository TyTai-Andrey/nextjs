import classNames from 'classnames';
import React, { FC, memo } from 'react';
import styles from './Button.module.css';

export type ButtonProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'short' | 'long';
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<ButtonProps> = memo(
  ({ children, className, variant = 'long', icon, ...props }) => {
    return (
      <button
        className={classNames(styles.root, className, {
          [styles.short]: variant === 'short',
        })}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  },
);
