import * as Yup from 'yup'

export const peopleShapes = {
    //example:
    form: {
        //initial data for the form
        shape: {
            id: 0,
            companyId: 0,
            name: '',
            position: '',
            records: [],
        },

        //scheme for checking the form for errors
        schema: Yup.object().shape({
            name: Yup.mixed().required('Не выбран пользователь').typeError('Не выбран пользователь'),
            position: Yup.string().required('Незаполненое поле').typeError('Незаполненое поле'),
            records: Yup.array().required('Не добавлены записи').typeError('Не добавлены записи'),
        }),
    },
}