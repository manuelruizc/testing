import * as Yup from 'yup';

const yupUrl = Yup.string()
    .required('Required')
    .matches(
        /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter a valid url'
    );

export const ShopItemSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    price: Yup.number('Number').required('Required'),
    shoppingCartURL: yupUrl,
    image: Yup.string().required('Required'),
});
