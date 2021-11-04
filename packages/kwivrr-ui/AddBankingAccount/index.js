import React from 'react';
import {
    BankAccountSchema,
    CreditCardSchema,
} from 'kwivrr-app/SettingsScreens/AccountSettings/schemas';
import { Formik } from 'formik';
import AddBankingAccount from './AddBankingAccount';
import * as Yup from 'yup';

export default function (props) {
    return (
        <Formik
            validateOnMount
            initialValues={{
                option: 'card',
                creditCard: {
                    addressName: '',
                    addressLineOne: '',
                    addressLineTwo: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    aptNumber: '',
                    nameOnCard: '',
                    cardNumber: '',
                    expiration: '',
                    ccv: '',
                },
                bankAccount: {
                    bankName: '',
                    routingNumber: '',
                    accountNumber: '',
                    nameOnAccount: '',
                },
            }}
            validationSchema={() =>
                Yup.lazy((values) => {
                    if (values.option === 'card') return CreditCardSchema;
                    return BankAccountSchema;
                })
            }
            initialTouched={{
                creditCard: {
                    addressName: true,
                    addressLineOne: true,
                    addressLineTwo: true,
                    city: true,
                    state: true,
                    zipCode: true,
                    aptNumber: true,
                    nameOnCard: true,
                    cardNumber: true,
                    expiration: true,
                    ccv: true,
                },
                bankAccount: {
                    bankName: true,
                    routingNumber: true,
                    accountNumber: true,
                    nameOnAccount: true,
                },
            }}
        >
            {(fProps) => <AddBankingAccount formikProps={fProps} {...props} />}
        </Formik>
    );
}
