import * as Yup from 'yup';

const phone = Yup.string().matches(new RegExp('[0-9]{7}'));

const email = Yup.string().email('Invalid email format');

const shopLink = Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter a valid url'
);

export const personalInfoSchema = Yup.object().shape({
    email,
    phone,
    shopLink,
});
