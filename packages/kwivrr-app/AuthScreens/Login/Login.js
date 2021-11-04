import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Image,
    Linking,
    SafeAreaView,
    TouchableOpacity,
    View,
} from 'react-native';
import TextHeader from 'kwivrr-ui/TextHeader/TextHeader';
import InputComponent from 'kwivrr-ui/InputComponent';
import TextRegular from 'kwivrr-ui/TextRegular';
import AuthButton from 'kwivrr-ui/AuthButton';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { LoginSchema } from './schemas';
import { useFormik } from 'formik';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import KwivrrGradient from 'kwivrr-ui/KwivrrGradient';
import { getUserLoginInfo } from 'kwivrr-common/data/fetch/user';
import { AUTH } from 'kwivrr-common/data/types/navigation';
import useActions from 'kwivrr-hooks/useActions';

function Login({ navigation }) {
    const password = useRef();
    const { setUserLoggedOut: goBackToHomePage, handleLogin } =
        useAuthCredentials();
    const {
        handleSubmit,
        setFieldTouched,
        errors,
        touched,
        values,
        setFieldValue,
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues: { email: '', password: '' },
        onSubmit: async (submittedValues) => {
            try {
                setIsLogin(true);
                await handleLogin(
                    submittedValues.email,
                    submittedValues.password
                );
                setIsLogin(false);
            } catch (e) {
                setIsLogin(false);
                console.log(e);
            }
        },
    });
    const onForgotPasswordPress = () => {
        Linking.openURL(
            'https://onyx.kwivrr.com/#view=forgot-password&email='
        ).catch((e) => alert('There was an error'));
    };
    const [isLogin, setIsLogin] = useState(false);
    const classes = useStyles(styles);

    return (
        <SafeAreaView style={classes.container}>
            <KwivrrGradient style={classes.kwivrrGradient} />
            <View style={classes.innerContainer}>
                <TouchableOpacity onPress={goBackToHomePage}>
                    <Image
                        source={require('kwivrr-assets/logo/KwivrrBetaLogoVertical.png')}
                        resizeMode="contain"
                        style={classes.logo}
                    />
                </TouchableOpacity>
                <TextHeader color="white" size={18}>
                    Welcome! Login to continue
                </TextHeader>
                <View style={classes.middleComponents}>
                    <InputComponent
                        value={values.email}
                        autoCapitalize="none"
                        onChangeText={(text) => setFieldValue('email', text)}
                        onBlur={() => setFieldTouched('email')}
                        error={errors.email}
                        touched={touched.email}
                        style={classes.inputContainer}
                        inputStyle={classes.inputStyle}
                        label="Email Address"
                        labelSize={16}
                        labelColor="white"
                        keyboardType="email-address"
                        onSubmitEditing={() => password.current?.focus()}
                        errorColor="white"
                    />
                    <InputComponent
                        value={values.password}
                        autoCapitalize="none"
                        onChangeText={(text) => setFieldValue('password', text)}
                        onBlur={() => setFieldTouched('password')}
                        error={errors.password}
                        touched={touched.password}
                        ref={password}
                        style={classes.inputContainer}
                        inputStyle={classes.inputStyle}
                        label="Password"
                        labelSize={16}
                        labelColor="white"
                        secureTextEntry={true}
                        errorColor="white"
                    />
                    <TextRegular size={16} color="white" style={classes.label}>
                        - or -
                    </TextRegular>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(AUTH.CREATEACCOUNT)}
                    >
                        <TextHeader size={18} color="white">
                            Create an Account
                        </TextHeader>
                    </TouchableOpacity>
                </View>
                <View style={classes.bottomComponents}>
                    <AuthButton
                        textGradient
                        isLoading={isLogin}
                        onPress={() => handleSubmit()}
                        buttonStyle={{ height: 60 }}
                    >
                        LOGIN
                    </AuthButton>
                    <TouchableOpacity onPress={onForgotPasswordPress}>
                        <TextRegular
                            style={classes.forgotPassword}
                            color="white"
                        >
                            Forgot Password?
                        </TextRegular>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

Login.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default Login;
