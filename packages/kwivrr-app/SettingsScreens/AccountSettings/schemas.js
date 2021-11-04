import * as Yup from 'yup';
import valid from 'card-validator';

export const ___CreditCardSchema = Yup.object().shape({
    creditCard: Yup.object().shape({
        addressName: Yup.string().required('Required'),
        addressLineOne: Yup.string().required('Required'),
        addressLineTwo: Yup.string(),
        city: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        zipCode: Yup.string().min(5).max(7).required('Required'),
        aptNumber: Yup.string().min(1).max(5).required('Required'),
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
            .test(
                'test-ccv',
                'CCV is invalid',
                (value) => valid.cvv(value).isValid
            )
            .required('Required'),
    }),
    bankAccount: Yup.object().shape({
        bankName: Yup.string().required('Required'),
        routingNumber: Yup.string().length(9).required('Required'),
        accountNumber: Yup.string().min(13).max(17).required('Required'),
        nameOnAccount: Yup.string().required('Required'),
    }),
});

export const CreditCardSchema = Yup.object().shape({
    creditCard: Yup.object().shape({
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
            .test(
                'test-ccv',
                'CCV is invalid',
                (value) => valid.cvv(value).isValid
            )
            .required('Required'),
    }),
});

export const BankAccountSchema = Yup.object().shape({
    bankAccount: Yup.object().shape({
        bankName: Yup.string().required('Required'),
        routingNumber: Yup.string().length(9).required('Required'),
        accountNumber: Yup.string().min(13).max(17).required('Required'),
        nameOnAccount: Yup.string().required('Required'),
    }),
});

export const _____BankAccountSchema = Yup.object().shape({
    bankName: Yup.string().required('Required'),
    routingNumber: Yup.string().length(9).required('Required'),
    accountNumber: Yup.string().min(13).max(17).required('Required'),
    nameOnAccount: Yup.string().required('Required'),
});
