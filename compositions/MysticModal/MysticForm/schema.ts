import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('Необходимо ввести имя'),
  action: Yup.string().required('Необходимо ввести имя действия'),
  quantity: Yup.number()
    .max(3, 'Не более 3')
    .required('Необходимо ввести количество')
    .typeError('Необходимо ввести число не более 3'),
});
