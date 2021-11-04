import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Payment from '../Payment/Payment';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';

function Payments({ payments, paymentOption, setPayments, openModal }) {
    const classes = useStyles(styles);
    const { palette } = useTheme();
    const deletePaymentOption = (index, id) => {
        // deleteFromDatabase(id) API CALL;
        console.log({ index, id });
        setPayments((prevPayments) => {
            prevPayments.splice(index, 1);
            return [...prevPayments];
        });
    };
    return (
        <View style={classes.container}>
            {payments.map((paymentOption, index) => (
                <Payment
                    key={index}
                    index={index}
                    paymentOption={paymentOption}
                    deletePaymentOption={deletePaymentOption}
                />
            ))}
            <View style={classes.addBanking}>
                <TouchableOpacity onPress={openModal}>
                    <TextRegular
                        color={palette.button.primary}
                        size={16}
                        style={classes.addBankingText}
                    >
                        + Add {paymentOption ? 'Payment' : 'Banking'}{' '}
                        Information
                    </TextRegular>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Payments;
