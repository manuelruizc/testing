import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Image, SafeAreaView, Linking, Text, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useDimensions from 'kwivrr-hooks/useDimensions';
import InputComponent from 'kwivrr-ui/InputComponent';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular/TextRegular';
import AuthButton from 'kwivrr-ui/AuthButton';
import TextHeader from 'kwivrr-ui/TextHeader';
import { DOCUMENTS } from './utils';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import TermsOfUse from 'kwivrr-ui/TermsOfUse/TermsOfUse';
import PrivacyPolicy from 'kwivrr-ui/PrivacyPolicy/PrivacyPolicy';
import { useFormik } from 'formik';
import { CreateAccountSchema } from './schemas';
import KwivrrGradient from 'kwivrr-ui/KwivrrGradient';
import usePlatform from '../../../kwivrr-hooks/usePlatftorm';
import useActions from 'kwivrr-hooks/useActions';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

function CreateAccount({ navigation, setIsLogged }) {
    const { onCreateAccount } = useActions();
    const { handleLogin } = useAuthCredentials();
    const lastName = useRef();
    const emailAddress = useRef();
    const password = useRef();
    const passwordConfirmation = useRef();
    const {
        handleSubmit,
        setFieldTouched,
        errors,
        touched,
        values,
        setFieldValue,
    } = useFormik({
        validationSchema: CreateAccountSchema,
        initialValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            passwordConfirmation: '',
        },
        onSubmit: async () => {
            try {
                setIsLoading(true);
                const payload = {
                    firstname: values.firstName,
                    lastname: values.lastName,
                    email: values.emailAddress,
                    password: values.password,
                    client_id: '',
                };
                await onCreateAccount(payload);
                await handleLogin(values.emailAddress, values.password);
                setIsLoading(false);
            } catch (e) {
                Alert.alert('Error while creating account', e.data.error[0]);
                setIsLoading(false);
            }
        },
    });
    const classes = useStyles(styles);
    const [isLoading, setIsLoading] = useState(false);

    const [modal, setModal] = useState({
        open: false,
        document: DOCUMENTS.PRIVACY,
    });
    const activeModal = (document) => {
        setModal({
            open: true,
            document,
        });
    };

    const openZoom = () => {
        Linking.openURL(
            'https://us05web.zoom.us/j/88680320488?pwd=NEMxQzMrWDEycGV5TnRmZFFqUFJZdz09'
        );
        // Linking.openURL('zoomus://').catch(() => {

        // });
    };

    // const sendData = (data) => console.log(data);

    const createAccount = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsLogged(true);
        }, 1800);
    };
    const { isAndroid } = usePlatform();
    const modalHeight = useMemo(() => {
        if (isAndroid) {
            return '94%';
        }
        return '100%';
    }, [isAndroid]);

    return (
        <SafeAreaView style={classes.mainContainer}>
            <KwivrrGradient style={classes.kwivrrGradient} />
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            >
                <View style={classes.container}>
                    <Image
                        source={require('kwivrr-assets/logo/KwivrrBetaLogoVertical.png')}
                        resizeMode="contain"
                        style={classes.logo}
                    />
                    <InputComponent
                        value={values.firstName}
                        onChangeText={(text) =>
                            setFieldValue('firstName', text)
                        }
                        onBlur={() => setFieldTouched('firstName')}
                        error={errors.firstName}
                        touched={touched.firstName}
                        errorColor="white"
                        style={classes.inputContainer}
                        inputStyle={classes.inputStyle}
                        label="First Name"
                        labelSize={16}
                        labelColor="white"
                        onSubmitEditing={() => lastName.current?.focus()}
                    />
                    <InputComponent
                        value={values.lastName}
                        onChangeText={(text) => setFieldValue('lastName', text)}
                        onBlur={() => setFieldTouched('lastName')}
                        error={errors.lastName}
                        touched={touched.lastName}
                        errorColor="white"
                        ref={lastName}
                        style={classes.inputContainer}
                        inputStyle={classes.inputStyle}
                        label="Last Name"
                        labelSize={16}
                        labelColor="white"
                        onSubmitEditing={() => emailAddress.current?.focus()}
                    />
                    <InputComponent
                        autoCapitalize="none"
                        value={values.emailAddress}
                        onChangeText={(text) =>
                            setFieldValue('emailAddress', text)
                        }
                        onBlur={() => setFieldTouched('emailAddress')}
                        error={errors.emailAddress}
                        touched={touched.emailAddress}
                        errorColor="white"
                        ref={emailAddress}
                        style={classes.inputContainer}
                        inputStyle={classes.inputStyle}
                        label="Email Address"
                        labelSize={16}
                        labelColor="white"
                        onSubmitEditing={() => password.current?.focus()}
                    />
                    <InputComponent
                        value={values.password}
                        onChangeText={(text) => setFieldValue('password', text)}
                        onBlur={() => setFieldTouched('password')}
                        error={errors.password}
                        touched={touched.password}
                        errorColor="white"
                        ref={password}
                        style={classes.inputContainer}
                        inputStyle={classes.inputStyle}
                        label="Password"
                        labelSize={16}
                        labelColor="white"
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                            passwordConfirmation.current?.focus()
                        }
                    />
                    <InputComponent
                        value={values.passwordConfirmation}
                        onChangeText={(text) =>
                            setFieldValue('passwordConfirmation', text)
                        }
                        onBlur={() => setFieldTouched('passwordConfirmation')}
                        error={errors.passwordConfirmation}
                        touched={touched.passwordConfirmation}
                        errorColor="white"
                        ref={passwordConfirmation}
                        style={classes.inputContainer}
                        inputStyle={classes.inputStyle}
                        label="Confirm Password"
                        labelSize={16}
                        labelColor="white"
                        secureTextEntry={true}
                    />
                    <TextRegular
                        color="white"
                        size={14}
                        style={classes.userAgreement}
                    >
                        By creating an account you are agreeing to Kwivrr's{' '}
                        <Text
                            style={classes.textUnderline}
                            onPress={() => activeModal(DOCUMENTS.PRIVACY)}
                        >
                            Privacy Policy,
                        </Text>{' '}
                        and{' '}
                        <Text
                            style={classes.textUnderline}
                            onPress={() => activeModal(DOCUMENTS.TERMS)}
                        >
                            Terms of Use
                        </Text>
                    </TextRegular>
                    <AuthButton
                        textGradient
                        onPress={handleSubmit}
                        isLoading={isLoading}
                        buttonStyle={{ height: 60 }}
                    >
                        CREATE ACCOUNT
                    </AuthButton>
                    <TextRegular
                        size={16}
                        color="white"
                        style={{ marginTop: 0 }}
                    >
                        - or -
                    </TextRegular>
                    <TextHeader
                        color="white"
                        size={18}
                        onPress={() => navigation.goBack()}
                    >
                        Login
                    </TextHeader>
                </View>
            </KeyboardAwareScrollView>
            {modal.open && (
                <KwivrrModal
                    modalStyle={{ height: modalHeight }}
                    modalInnerStyle={{ height: '94%' }}
                    title={modal.document}
                    close={() => setModal((prev) => ({ ...prev, open: false }))}
                >
                    {modal.document === DOCUMENTS.TERMS ? (
                        <TermsOfUse />
                    ) : (
                        <PrivacyPolicy />
                    )}
                </KwivrrModal>
            )}
        </SafeAreaView>
    );
}

CreateAccount.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    setIsLogged: PropTypes.func.isRequired,
};

export default CreateAccount;
