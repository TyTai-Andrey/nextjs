import React, { FC } from 'react';
import styles from './MysticModal.module.css';
import { Modal, ModalComponentProps } from '@components/Modal';
import { FORM_NAME, MysticForm, MysticFormProps, schema } from './MysticForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  SubmissionError,
  destroy,
  getFormValues,
  initialize,
} from 'redux-form';
import { asyncValidator } from '@utils/asyncValidator';
import { showMessage } from '@utils/notifications';

export type MysticModalProps = {} & ModalComponentProps;

export const MysticModal: FC<MysticModalProps> = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const mysticFormValues: MysticFormProps = useSelector(
    (state) => getFormValues(FORM_NAME)(state),
    () => false,
  );

  const onClose = () => {
    if (mysticFormValues.radio === 'clear') {
      dispatch(destroy(FORM_NAME));
    }
    handleClose();
  };

  const validate = asyncValidator(schema);

  const onSubmit = async () => {
    try {
      await validate(mysticFormValues);

      for (let index = 0; index < Number(mysticFormValues.quantity); index++) {
        showMessage(`${mysticFormValues.name} ${mysticFormValues.action}`);
      }

      if (mysticFormValues.radio === 'setValues') {
        dispatch(
          initialize(FORM_NAME, {
            name: mysticFormValues?.inital_name,
            action: mysticFormValues?.inital_action,
            quantity: mysticFormValues?.inital_quantity,
            radio: 'save',
          }),
        );
      }

      onClose();
    } catch (error: any) {
      throw new SubmissionError(error);
    }
  };

  return (
    <Modal className={styles.root} isOpen={isOpen} onClose={onClose}>
      <MysticForm onSubmit={onSubmit} />
    </Modal>
  );
};
