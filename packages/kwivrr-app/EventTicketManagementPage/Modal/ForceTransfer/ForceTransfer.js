import React from 'react';
import {} from 'react-native';
import PropTypes from 'prop-types';
import TextRegular from 'kwivrr-ui/TextRegular/TextRegular';
import InputComponent from 'kwivrr-ui/InputComponent';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import AuthButton from 'kwivrr-ui/AuthButton';
import { useFormik } from 'formik';
import { ForceTransferSchema } from './schema';

function ForceTransfer({ closeModal, ticket }) {
    const classes = useStyles(styles);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            validationSchema: ForceTransferSchema,
            onSubmit: (values) => {
                closeModal();
            },
        });

    return (
        <>
            <InputComponent
                label="First Name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={errors.firstName}
                touched={touched.firstName}
                labelSize={16}
                style={{ width: '90%', marginBottom: 16 }}
                inputStyle={classes.inputStyle}
            />
            <InputComponent
                label="Last Name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={errors.lastName}
                touched={touched.lastName}
                labelSize={16}
                style={{ width: '90%', marginBottom: 16 }}
                inputStyle={classes.inputStyle}
            />
            <InputComponent
                label="Email Address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                labelSize={16}
                style={{ width: '90%', marginBottom: 16 }}
                inputStyle={classes.inputStyle}
            />
            <InputComponent
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                labelSize={16}
                style={{ width: '90%', marginBottom: 16 }}
                inputStyle={classes.inputStyle}
                secureTextEntry
            />
            <InputComponent
                label="Confirm Password"
                value={values.passwordConfirmation}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                error={errors.passwordConfirmation}
                touched={touched.passwordConfirmation}
                labelSize={16}
                style={{ width: '90%', marginBottom: 16 }}
                inputStyle={classes.inputStyle}
                secureTextEntry
            />
            <AuthButton
                backgroundColor="#F1201C"
                activeOpacity={0.5}
                buttonStyle={classes.buttonStyle}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                onPress={handleSubmit}
            >
                {`Create Account & Force Transfer`}
            </AuthButton>
            <TextRegular style={classes.cancel} onPress={closeModal}>
                Cancel
            </TextRegular>
        </>
    );
}

ForceTransfer.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default ForceTransfer;
