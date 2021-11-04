import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Payments from '../../Payments/Payments';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from '../../TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';

function AccountSuccess({
    data,
    setBankingAccount,
    addBankingInformation,
    onSelect,
    payments,
    setPayments,
    ...rest
}) {
    const classes = useStyles(styles);
    const { palette } = useTheme();

    useEffect(() => {
        setPayments([...data]);
    }, []);

    return (
        <React.Fragment>
            <View style={{ width: '100%', height: 120 }}>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    <Payments
                        payments={payments}
                        setPayments={setPayments}
                        onSelect={onSelect}
                        {...rest}
                        // openModal={setBankingAccount}
                    />
                </ScrollView>
            </View>
            <View style={classes.addBanking}>
                <TouchableOpacity
                    onPress={() => setBankingAccount(!addBankingInformation)}
                >
                    <TextRegular
                        color={palette.button.primary}
                        size={16}
                        style={classes.addBankingText}
                    >
                        {!addBankingInformation
                            ? '+ Add Payment Information'
                            : 'Close Payment Information'}
                    </TextRegular>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    );
}

AccountSuccess.propTypes = {
    data: PropTypes.array.isRequired,
    setBankingAccount: PropTypes.func.isRequired,
    addBankingInformation: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default AccountSuccess;
