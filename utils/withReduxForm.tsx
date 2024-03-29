// Core
import * as React from 'react';
import { Field } from 'redux-form';
import { v4 as uuid } from 'uuid';

const ReduxFieldAdapter = ({ children, input, meta, ...props }: any) =>
  children({
    ...input,
    ...props,
    error: meta.touched && (meta.error || props.error),
  });

function withReduxForm<T>(FieldComponent: React.FC<T>, extraProps?: any) {
  return (props: T & { name: string }) => {
    const { children, id: idProp } = props as {
      children?: React.ReactNode;
      id?: number;
    };
    const id = idProp || uuid();

    return (
      <Field {...extraProps} {...props} component={ReduxFieldAdapter}>
        {(props: any) => (
          <FieldComponent {...props} id={id}>
            {children}
          </FieldComponent>
        )}
      </Field>
    );
  };
}

// Exports
export default withReduxForm;
