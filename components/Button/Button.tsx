import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './Button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'short' | 'long';
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = 'long',
  ...props
}) => {
  return (
    <button
      className={classNames(styles.root, className, {
        [styles.short]: variant === 'short',
      })}
      {...props}
    >
      {children}
    </button>
  );
};
