import React, { useState } from 'react';
import { View } from 'react-native';
import InputComponent from '../../InputComponent';
import Select from '../../Select/Select';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { useField } from 'formik';

const BANKS_OPTIONS = [
    { label: 'Bank of America', value: 'Bank of America' },
    { label: 'Chase Bank', value: 'Chase Bank' },
    { label: 'Us Bank', value: 'Us Bank' },
    { label: 'Wells Fargo', value: 'Wells Fargo' },
];

function BankAccount() {
    const classes = useStyles(styles);
    const [{ value: bankName }, , { setValue }] = useField(
        'bankAccount.bankName'
    );

    const selectBank = (newBankName) => {
        setValue(newBankName);
    };

    return (
        <View style={classes.container}>
            <Select
                listMode="SCROLLVIEW"
                scrollViewProps={{
                    nestedScrollEnabled: true,
                }}
                value={bankName}
                style={{
                    ...classes.inputStyle,
                    borderWidth: 0,
                    marginBottom: 12,
                    zIndex: 12,
                }}
                options={BANKS_OPTIONS}
                dropDownDirection="BOTTOM"
                mode="SIMPLE"
                label="Bank Name"
                placeholder="Select one"
                placeholderStyle={{
                    color: 'rgba(0, 0, 0, 0.2)',
                    fontSize: 15,
                    fontFamily: 'Rubik-Light',
                }}
                customItemContainerStyle={{
                    backgroundColor: 'red',
                }}
                onChange={(value) => selectBank(value)}
            />
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: -1,
                }}
            >
                <InputComponent
                    inputStyle={{
                        ...classes.inputStyle,
                    }}
                    style={{ width: '36%' }}
                    placeholder={'9 digits'}
                    label={'Routing Number'}
                    keyboardType="numeric"
                    usingFormikField
                    maxLength={9}
                    name="bankAccount.routingNumber"
                />
                <InputComponent
                    inputStyle={{
                        ...classes.inputStyle,
                    }}
                    style={{ width: '55%' }}
                    maxLength={17}
                    placeholder={'13 to 17 digits'}
                    label={'Account Number'}
                    keyboardType="numeric"
                    usingFormikField
                    name="bankAccount.accountNumber"
                />
            </View>
            <InputComponent
                inputStyle={{
                    ...classes.inputStyle,
                }}
                autoComplete={false}
                style={{ zIndex: -1 }}
                placeholder={'First Last'}
                label={'Name on Account'}
                usingFormikField
                name="bankAccount.nameOnAccount"
            />
        </View>
    );
}

export default BankAccount;
