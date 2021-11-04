import * as Yup from 'yup';
import valid from 'card-validator';

const CreditCardSchema = Yup.object().shape({
    addressLineOne: Yup.string().required('Required'),
    addressLineTwo: Yup.string(),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zipCode: Yup.string().min(5).max(7).required('Required'),
    aptNumber: Yup.string().min(1).max(5),
    nameOnCard: Yup.string().required('Required'),
    cardNumber: Yup.string()
        .test(
            'test-number',
            'Credit Card number is invalid',
            (value) => valid.number(value).isValid
        )
        .required('Required'),
    expiration: Yup.string()
        .test(
            'test-expiration',
            'expiration date is invalid',
            (value) => valid.expirationDate(value).isValid
        )
        .required('Required'),
    ccv: Yup.string()
        .min(3)
        .max(4)
        .test('test-ccv', 'CCV is invalid', (value) => valid.cvv(value).isValid)
        .required('Required'),
});

export default CreditCardSchema;
