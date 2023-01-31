import * as Yup from 'yup';

export type SearchShapeType = {
  form: {
    shape: {
      search?: string;
    };
  };
};

export const searchShape = {
  //example:
  form: {
    //initial data for the form
    shape: {
      search: '',
    },
  },
};
