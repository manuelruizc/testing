import React, { useMemo, useRef, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrImage from '../KwivrrImage';
import useTheme from 'kwivrr-hooks/useTheme';
import Select from '../Select/Select';
import InputComponent from '../InputComponent';
import AuthButton from '../AuthButton';
import TextRegular from '../TextRegular';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Accounts from './Accounts';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useActions from 'kwivrr-hooks/useActions';

const paymentLogos = [
    {
        option: 'venmo',
        unselected: 'https://i.imgur.com/923RB2K.png',
        selected: 'https://i.imgur.com/T4JtoSt.png',
    },
    {
        option: 'square',
        unselected: 'https://i.imgur.com/DxZlZbB.png',
        selected: 'https://i.imgur.com/38qmcXw.png',
    },
];

const ACCOUNT_OPTIONS = [
    { label: 'Username', value: 'Username' },
    { label: 'Email', value: 'Email' },
    { label: 'Phone', value: 'Phone' },
];

const digitsOnly = (value) => /^\d+$/.test(value);

const FormValidation = Yup.object().shape({
    accountOption: Yup.string(),
    handler: Yup.string()
        .required('Required')
        .when('accountOption', {
            is: (accountOption) => accountOption === 'Email',
            then: Yup.string().email('Invalid email').required('Required'),
        })
        .when('accountOption', {
            is: (accountOption) => accountOption === 'Phone',
            then: Yup.string()
                .test('Digits only', 'Digits only', digitsOnly)
                .required('Required'),
        }),
    confirmHandler: Yup.string()
        .required('Required')
        .when('accountOption', {
            is: (accountOption) => accountOption === 'Email',
            then: Yup.string().email('Invalid email').required('Required'),
        })
        .when('accountOption', {
            is: (accountOption) => accountOption === 'Phone',
            then: Yup.string()
                .test('Digits only', 'Digits only', digitsOnly)
                .required('Required'),
        }),
});

function BankingInformation({
    closeModal,
    onSave,
    getAccounts = false,
    onSelect,
    addAccountLocally = false,
    isLoading,
    setLoading,
    ...rest
}) {
    const classes = useStyles(styles);
    const { onCreatePayoutMethod } = useActions();
    const [paymentSelected, setPaymentSelected] = useState('');
    const [addBankingInformation, setAddBankingInformation] = useState(false);
    const confirmRef = useRef();
    const { values, setFieldValue, handleBlur, errors, touched } = useFormik({
        initialValues: {
            accountOption: 'Username',
            handler: '',
            confirmHandler: '',
        },
        validationSchema: FormValidation,
    });
    const [payments, setPayments] = useState([]);
    const [formHeight, setFormHeight] = useState({
        height: 0,
        onLayout: false,
    });
    const formActive = useSharedValue(false);
    const { palette } = useTheme();
    const select = (payment) => {
        setPaymentSelected((prevPayment) => {
            if (payment === prevPayment) {
                formActive.value = false;
                return '';
            }
            formActive.value = true;
            return payment;
        });
    };

    const selectAccount = (option) => {
        onSelect(option);
        closeModal();
    };

    const formStyle = useAnimatedStyle(() => {
        return {
            width: '90%',
            paddingVertical: withTiming(formActive.value ? 18 : 0),
            zIndex: 10000,
            overflow: formActive.value ? 'visible' : 'hidden',
            opacity: withTiming(formActive.value ? 1 : 0),
            height: !formHeight.onLayout
                ? undefined
                : withTiming(formActive.value ? formHeight.height : 0),
        };
    });

    const onLayout = (event) => {
        if (formHeight.onLayout) return;
        const { height } = event.nativeEvent.layout;
        setFormHeight({
            height,
            onLayout: true,
        });
    };

    const saveAccount = async () => {
        try {
            setLoading(true);
            const res = await onCreatePayoutMethod({
                payout_method: {
                    provider: paymentSelected,
                    external_id: values.handler,
                    title: values.handler,
                    default: false,
                },
                userId: 'me',
                id: 'me',
            });
            const account = {
                id: res.data.data.id,
                // type: accountOption.toLowerCase(),
                // handler: values.handler,
                // brand: paymentSelected,
                // paymentType: 'online',
                // defaultCard: false,
                //
                last4: values.handler,
                brand: paymentSelected,
                defaultOption: false,
                paymentType: 'payment',
            };
            const setNewAccounts = addAccountLocally ? setPayments : onSave;
            setNewAccounts((prevOnlineAccounts) => {
                prevOnlineAccounts.push(account);
                return [...prevOnlineAccounts];
            });
            if (!addAccountLocally) {
                closeModal();
            } else {
                setAddBankingInformation(false);
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            Alert.alert('Error', 'There was an error adding the payout method');
        }
    };

    const buttonDisabled = useMemo(() => {
        const { handler, confirmHandler } = values;
        if (
            handler !== confirmHandler ||
            handler.length === 0 ||
            confirmHandler.length === 0
        )
            return true;
    }, [values]);

    const keyboardType = useMemo(() => {
        if (values.accountOption === 'Phone') return 'numeric';
        if (values.accountOption === 'Email') return 'email-address';
        return undefined;
    }, [values]);

    return (
        <View style={classes.container}>
            {getAccounts && (
                <Accounts
                    payments={payments}
                    setPayments={setPayments}
                    onSelect={selectAccount}
                    setBankingAccount={setAddBankingInformation}
                    addBankingInformation={addBankingInformation}
                    {...rest}
                />
            )}
            {((addBankingInformation && getAccounts) ||
                (!addBankingInformation && !getAccounts)) && (
                <React.Fragment>
                    <View style={classes.options}>
                        {paymentLogos.map(({ option }, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => select(option)}
                                activeOpacity={0.8}
                                style={{
                                    ...classes.option,
                                    backgroundColor:
                                        paymentSelected === option
                                            ? option === 'venmo'
                                                ? '#3D95CE'
                                                : palette.common.black
                                            : 'transparent',
                                }}
                            >
                                <KwivrrImage
                                    source={{
                                        uri: paymentLogos[index][
                                            paymentSelected === option
                                                ? 'selected'
                                                : 'unselected'
                                        ],
                                    }}
                                    resizeMode="contain"
                                    style={classes.logo}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Animated.View onLayout={onLayout} style={formStyle}>
                        <Select
                            listMode="SCROLLVIEW"
                            scrollViewProps={{
                                nestedScrollEnabled: true,
                            }}
                            value={values.accountOption}
                            style={{
                                ...classes.inputStyle,
                                borderWidth: 0,
                                marginBottom: 12,
                            }}
                            options={ACCOUNT_OPTIONS}
                            dropDownDirection="TOP"
                            mode="SIMPLE"
                            label="Account"
                            placeholder="Select one"
                            placeholderStyle={{
                                color: 'rgba(0, 0, 0, 0.2)',
                                fontSize: 15,
                                fontFamily: 'Rubik-Light',
                            }}
                            onChange={(value) => {
                                if (value === values.accountOption) return;
                                setFieldValue('accountOption', value);
                                setFieldValue('handler', '');
                                setFieldValue('confirmHandler', '');
                            }}
                        />
                        <InputComponent
                            inputStyle={{
                                ...classes.inputStyle,
                            }}
                            placeholder={values.accountOption}
                            label={values.accountOption}
                            value={values.handler}
                            onChangeText={(text) =>
                                setFieldValue('handler', text)
                            }
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={handleBlur('handler')}
                            error={errors.handler}
                            touched={touched.handler}
                            keyboardType={keyboardType}
                            returnKeyType="next"
                            onSubmitEditing={() => confirmRef.current?.focus()}
                        />
                        <InputComponent
                            ref={confirmRef}
                            inputStyle={{
                                ...classes.inputStyle,
                            }}
                            placeholder={`Confirm ${values.accountOption}`}
                            label={`Confirm ${values.accountOption}`}
                            value={values.confirmHandler}
                            onChangeText={(text) =>
                                setFieldValue('confirmHandler', text)
                            }
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={handleBlur('confirmHandler')}
                            error={errors.confirmHandler}
                            touched={touched.confirmHandler}
                            keyboardType={keyboardType}
                        />
                    </Animated.View>
                    <AuthButton
                        isLoading={isLoading}
                        activityIndicatorColor={palette.common.white}
                        backgroundColor={palette.button.primary}
                        buttonStyle={{
                            ...classes.buttonStyle,
                            width: 130,
                            height: 40,
                            marginVertical: 0,
                        }}
                        style={classes.buttonContainerStyle}
                        textColor="white"
                        textFontSize={18}
                        uppercase={false}
                        onPress={saveAccount}
                        disabled={buttonDisabled}
                    >
                        Save
                    </AuthButton>
                </React.Fragment>
            )}
            <View style={classes.cancelContainer}>
                <TouchableOpacity onPress={closeModal}>
                    <TextRegular>Cancel</TextRegular>
                </TouchableOpacity>
            </View>
        </View>
    );
}

BankingInformation.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    getAccounts: PropTypes.bool,
    onSelect: PropTypes.func,
};

export default BankingInformation;
