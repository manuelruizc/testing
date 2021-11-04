import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Payment from './Payment/Payment';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';
import useActions from 'kwivrr-hooks/useActions';

function Payments({
    payments,
    apiPayments,
    setPayments,
    paymentOption,
    openModal,
    addBankingButton = false,
    ...rest
}) {
    const { onDeleteCreditCard, onDeleteECheck, onDeletePayoutMethod } =
        useActions();
    const classes = useStyles(styles);
    const { palette } = useTheme();
    const deletePaymentOption = async (index, id, type) => {
        try {
            const fn =
                type === 'card'
                    ? onDeleteCreditCard
                    : type === 'payment'
                    ? onDeletePayoutMethod
                    : onDeleteECheck;

            const res = await fn({ id, userId: 'me' });

            setPayments((prevPayments) => {
                prevPayments.splice(index, 1);
                return [...prevPayments];
            });
        } catch (e) {
            alert(JSON.stringify(e));
        }
    };

    useEffect(() => {
        setPayments(apiPayments);
    }, []);

    return (
        <View style={classes.container}>
            {payments.map((paymentOption, index) => (
                <Payment
                    key={index}
                    index={index}
                    paymentOption={paymentOption}
                    deletePaymentOption={deletePaymentOption}
                    {...rest}
                />
            ))}
            {addBankingButton && (
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
            )}
        </View>
    );
}

Payments.propTypes = {
    payments: PropTypes.array.isRequired,
    paymentOption: PropTypes.bool.isRequired,
    setPayments: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    addBankingButton: PropTypes.bool.isRequired,
};

export default Payments;
