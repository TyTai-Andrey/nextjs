import React, { FC } from 'react';
import { Portal } from 'react-portal';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.css';

export interface ModalProps {
  children?: React.ReactNode | ((data: any) => React.ReactNode);
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export interface ModalComponentProps {
  handleClose: () => void;
  isOpen: boolean;
}

export const Modal: FC<ModalProps> = ({
  children,
  className,
  style,
  isOpen,
  onClose,
  ...props
}) => {
  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Portal>
      <div className={styles.root}>
        <div className={styles.backdrop} />

        <div className={classNames(styles.content, className)} style={style}>
          <button className={styles.close} onClick={handleClose}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>

          {typeof children === 'function'
            ? (children as Function)({ ...props })
            : React.isValidElement(children)
            ? React.cloneElement(children, {
                ...(children.props ?? {}),
                ...props,
              })
            : children}
        </div>
      </div>
    </Portal>
  );
};
