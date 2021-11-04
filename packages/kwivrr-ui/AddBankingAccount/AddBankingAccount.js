import React, { useMemo, memo, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import CreditCardData from './CreditCardData';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import useDimensions from 'kwivrr-hooks/useDimensions';
import AuthButton from '../AuthButton';
import TextRegular from '../TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BankAccount from './BankAccount/BankAccount';
import Options from './Options/Options';
import { useField } from 'formik';

function AddBankingAccount({
    closeModal,
    formikProps,
    saveCard,
    isLoading,
    setLoading,
    setOption,
}) {
    const classes = useStyles(styles);
    const { screenHeight } = useDimensions();
    const { palette } = useTheme();
    const active = useSharedValue(true);
    const [{ value: option }, {}, { setValue }] = useField('option');
    const heights = useMemo(
        () => ({
            creditCard: screenHeight * 0.58,
            bankAccount: 40 * 6,
        }),
        []
    );
    const containerStyle = useAnimatedStyle(() => {
        const height = active.value
            ? option === 'card'
                ? heights.creditCard
                : heights.bankAccount
            : 0;
        return {
            width: '100%',
            height: withTiming(height),
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            overflow: active.value ? 'visible' : 'hidden',
        };
    });

    useEffect(() => {
        setOption(option);
    }, [option, setOption]);

    const select = (opt) => {
        active.value = opt !== option;
        if (option === opt) return setValue('');
        setValue(opt);
        // setOption((prevOption) => {
        //     active.value = opt !== prevOption;
        //     if (prevOption === opt) return '';
        //     return opt;
        // });
    };
    const cardIsValidated = useMemo(() => {
        const { errors } = formikProps;
        // need to validate this
        return Object.keys(errors).length === 0;
    }, [formikProps]);

    return (
        <View style={classes.container}>
            {/* <Options select={select} option={option} /> */}
            <Animated.View style={containerStyle}>
                <KeyboardAwareScrollView
                    resetScrollToCoords={false}
                    style={{ flex: 1, width: '100%' }}
                >
                    <CreditCardData />
                </KeyboardAwareScrollView>
            </Animated.View>
            <AuthButton
                isLoading={isLoading}
                disabled={!cardIsValidated || option === '' || isLoading}
                onPress={() => {
                    setLoading(true);
                    saveCard(formikProps.values, option === 'card', closeModal);
                }}
                uppercase={false}
                textColor="white"
                textFontSize={20}
                buttonStyle={classes.button}
                activityIndicator="white"
                backgroundColor={palette.button.primary}
            >
                Save
            </AuthButton>
            <TouchableOpacity onPress={closeModal}>
                <TextRegular>Cancel</TextRegular>
            </TouchableOpacity>
        </View>
    );
}

export default memo(AddBankingAccount);
