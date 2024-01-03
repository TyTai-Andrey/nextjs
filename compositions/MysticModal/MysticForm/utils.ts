export type FormProps = {
  onSubmit: () => void;
  initialValues?: MysticFormProps;
};

export interface MysticFormProps {
  name?: string;
  action?: string;
  quantity?: string;
  radio?: 'clear' | 'save' | 'setValues';

  inital_name?: string;
  inital_action?: string;
  inital_quantity?: string;
}

export const FORM_NAME = 'MYSTIC_FORM';
