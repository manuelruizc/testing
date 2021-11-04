import React, { memo, useRef, useState } from 'react';
import { View, Switch } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Divider from 'kwivrr-ui/Divider';
import TextRegular from 'kwivrr-ui/TextRegular/TextRegular';
import { useField } from 'formik';

function CreditCardData() {
    const classes = useStyles(styles);
    const number = useRef();
    const CCV = useRef();
    const addressLineOne = useRef();
    const addressLineTwo = useRef();
    const city = useRef();
    const state = useRef();
    const zipcode = useRef();
    const [saveCard, setSaveCard] = useState(false);
    const [{ value: cardNumber }, , { setValue: setCardNumber }] =
        useField('cardNumber');
    const [{ value: cardExpiration }, , { setValue: setCardExpiration }] =
        useField('expiration');

    function _handlingCardNumber(number) {
        setCardNumber(
            number
                .replace(/\s?/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim()
        );
    }

    function _handlingCardExpiry(text) {
        let result = text;
        if (text.length === 2 && cardExpiration.length < 2) {
            result = text + '/';
        }
        setCardExpiration(result);
    }

    return (
        <>
            <View style={classes.inputs}>
                <InputComponent
                    usingFormikField
                    name="nameOnCard"
                    style={classes.inputContainer}
                    inputStyle={classes.inputStyle}
                    label="Name on Card"
                    placeholder="First Last"
                    labelSize={16}
                    labelColor="black"
                    onSubmitEditing={() => number.current?.focus()}
                />
                <InputComponent
                    onChangeText={(text) => _handlingCardNumber(text)}
                    value={cardNumber}
                    style={classes.inputContainer}
                    inputStyle={classes.inputStyle}
                    label="Card Number"
                    placeholder="0000 0000 0000 0000"
                    labelSize={16}
                    labelColor="black"
                    keyboardType="numeric"
                    maxLength={19}
                    ref={number}
                />
                <View style={classes.doubleRow}>
                    <InputComponent
                        value={cardExpiration}
                        onChange={(text) => _handlingCardExpiry(text)}
                        style={classes.tripleRow}
                        inputStyle={classes.inputStyle}
                        label="Expiration"
                        placeholder="MM/YY"
                        labelSize={16}
                        keyboardType="numeric"
                        labelColor="black"
                        maxLength={5}
                        onSubmitEditing={() => CCV.current?.focus()}
                    />
                    <InputComponent
                        usingFormikField
                        name="ccv"
                        style={classes.tripleRow}
                        inputStyle={classes.inputStyle}
                        label="CCV"
                        placeholder="000"
                        labelSize={16}
                        keyboardType="numeric"
                        labelColor="black"
                        maxLength={4}
                        secureTextEntry
                        ref={CCV}
                        onSubmitEditing={() => addressLineOne.current?.focus()}
                    />
                </View>
                <InputComponent
                    usingFormikField
                    name="addressLineOne"
                    style={classes.inputContainer}
                    inputStyle={classes.inputStyle}
                    label="Address Line 1"
                    labelSize={16}
                    labelColor="black"
                    ref={addressLineOne}
                    onSubmitEditing={() => addressLineTwo.current?.focus()}
                />
                <InputComponent
                    usingFormikField
                    name="addressLineTwo"
                    style={classes.inputContainer}
                    inputStyle={classes.inputStyle}
                    label="Address Line 2"
                    labelSize={16}
                    labelColor="black"
                    ref={addressLineTwo}
                    onSubmitEditing={() => city.current?.focus()}
                />
                <View style={classes.doubleRow}>
                    <InputComponent
                        usingFormikField
                        name="city"
                        style={classes.doubleRowColumn}
                        inputStyle={classes.inputStyle}
                        label="City"
                        labelSize={16}
                        labelColor="black"
                        ref={city}
                        onSubmitEditing={() => state.current?.focus()}
                    />
                    <InputComponent
                        usingFormikField
                        name="state"
                        style={classes.doubleRowColumn}
                        inputStyle={classes.inputStyle}
                        label="State"
                        labelSize={16}
                        labelColor="black"
                        ref={state}
                        onSubmitEditing={() => zipcode.current?.focus()}
                    />
                </View>
                <View style={classes.doubleRow}>
                    <InputComponent
                        usingFormikField
                        name="zipCode"
                        style={classes.doubleRowColumn}
                        inputStyle={classes.inputStyle}
                        label="Zip Code"
                        labelSize={16}
                        labelColor="black"
                        keyboardType="numeric"
                        ref={zipcode}
                    />
                    <InputComponent
                        usingFormikField
                        name="aptNumber"
                        style={classes.doubleRowColumn}
                        inputStyle={classes.inputStyle}
                        label="Apt #"
                        labelSize={16}
                        labelColor="black"
                        keyboardType="numeric"
                    />
                </View>
                <Divider style={classes.divider} />
            </View>
        </>
    );
}

export default memo(CreditCardData);
