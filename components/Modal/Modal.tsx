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

  const $content = React.useRef<HTMLDivElement>(null);
  const $backdrop = React.useRef<HTMLDivElement>(null);

  const handleEnterAnimation = () => {
    gsap.set($content.current, { autoAlpha: 0, yPercent: -20 });
    gsap.set($backdrop.current, { autoAlpha: 0 });

    gsap.to($content.current, timeout / 1000, { autoAlpha: 1, yPercent: 0 });
    gsap.to($backdrop.current, timeout / 1000, { autoAlpha: 1 });
  };

  const handleExitAnimation = () => {
    gsap.set($content.current, { autoAlpha: 1, yPercent: 0 });
    gsap.set($backdrop.current, { autoAlpha: 1 });

    gsap.to($content.current, timeout / 1000, {
      autoAlpha: 0,
      yPercent: -20,
    });
    gsap.to($backdrop.current, timeout / 1000, { autoAlpha: 0 });
  };

  const timeout = 200;

  return (
    <Transition
      in={isOpen}
      timeout={timeout}
      mountOnEnter
      unmountOnExit
      onEnter={handleEnterAnimation}
      onExit={handleExitAnimation}
    >
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
    </Transition>
  );
};
