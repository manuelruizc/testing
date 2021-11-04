import React, { useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { useFormik } from 'formik';
import { UpdatePasswordSchema } from './schema';
import AuthButton from 'kwivrr-ui/AuthButton';
import useTheme from 'kwivrr-hooks/useTheme';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import useActions from 'kwivrr-hooks/useActions';

function UpdatePassword({ closeModal }) {
    const { userInfo } = useAuthCredentials();
    const { onUpdatePassword } = useActions();
    const classes = useStyles(styles);
    const [secureTypeEntries, setSecureTypeEntries] = useState([
        true,
        true,
        true,
    ]);
    const toggleSecureTypeEntry = (index) => {
        setSecureTypeEntries((prev) => {
            let arr = prev;
            arr[index] = !arr[index];
            return [...arr];
        });
    };
    const inputNew = useRef(null);
    const inputNewConfirmation = useRef(null);
    const {
        handleSubmit,
        setFieldTouched,
        errors,
        touched,
        values,
        setFieldValue,
        handleChange,
    } = useFormik({
        validationSchema: UpdatePasswordSchema,
        initialValues: {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
        },
        initialTouched: {
            currentPassword: true,
            newPassword: true,
            newPasswordConfirmation: true,
        },
        initialErrors: {
            currentPassword: true,
            newPassword: true,
            newPasswordConfirmation: true,
        },
        onSubmit: async (values) => {
            try {
                const res = await onUpdatePassword({
                    id: 'me',
                    new_password: values.newPassword,
                    current_password: values.currentPassword,
                });
                Alert.alert(
                    'Password Updated',
                    'Your password has been updated.',
                    [
                        {
                            text: 'Ok',
                            onPress: closeModal,
                        },
                    ]
                );
                closeModal();
            } catch (e) {
                Alert.alert(
                    'Credentials Error',
                    'There was an error with the password you provided.'
                );
            }
        },
    });
    const { palette } = useTheme();

    return (
        <View style={classes.containerPasswordChange}>
            <InputComponent
                error={errors.currentPassword}
                touched={touched.currentPassword}
                onChangeText={handleChange('currentPassword')}
                value={values.currentPassword}
                secureTextEntry={secureTypeEntries[0]}
                style={{ ...classes.inputContainer, marginBottom: 12 }}
                placeholder="Your Old Password"
                label="Your Old Password"
                returnKeyType="next"
                onSubmitEditing={() => {
                    inputNew.current?.focus();
                }}
                inputStyle={classes.inputStyle}
                labelColor="black"
                iconRight={secureTypeEntries[0] ? 'eye' : 'eye-off'}
                iconRightOnPress={() => toggleSecureTypeEntry(0)}
            />
            <InputComponent
                error={errors.newPassword}
                touched={touched.newPassword}
                secureTextEntry={secureTypeEntries[1]}
                ref={inputNew}
                onChangeText={handleChange('newPassword')}
                value={values.newPassword}
                style={{ ...classes.inputContainer, marginBottom: 12 }}
                placeholder="New Password"
                label="New Password"
                inputStyle={classes.inputStyle}
                labelColor="black"
                returnKeyType="next"
                onSubmitEditing={() => {
                    inputNewConfirmation.current?.focus();
                }}
                iconRight={secureTypeEntries[1] ? 'eye' : 'eye-off'}
                iconRightOnPress={() => toggleSecureTypeEntry(1)}
            />
            <InputComponent
                error={errors.newPasswordConfirmation}
                touched={touched.newPasswordConfirmation}
                ref={inputNewConfirmation}
                secureTextEntry={secureTypeEntries[2]}
                onChangeText={handleChange('newPasswordConfirmation')}
                value={values.newPasswordConfirmation}
                style={classes.inputContainer}
                placeholder="Confirm New Password"
                label="Confirm Password"
                inputStyle={classes.inputStyle}
                labelColor="black"
                iconRight={secureTypeEntries[2] ? 'eye' : 'eye-off'}
                iconRightOnPress={() => toggleSecureTypeEntry(2)}
            />
            <AuthButton
                uppercase={false}
                textFontSize={20}
                backgroundColor={palette.button.primary}
                style={classes.authButton}
                textColor={palette.common.white}
                onPress={handleSubmit}
                disabled={Object.keys(errors).length > 0}
            >
                Change Password
            </AuthButton>
        </View>
    );
}

export default UpdatePassword;
