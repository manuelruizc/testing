import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import AuthButton from 'kwivrr-ui/AuthButton';
import InputComponent from 'kwivrr-ui/InputComponent';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import parentStyles from '../styles';
import styles from './styles';
import Avatar, { AvatarSelectMedia } from 'kwivrr-ui/Avatar';
import { useFormik } from 'formik';
import { NewSpeakerSchema } from './schema';
import useActions from 'kwivrr-hooks/useActions';

function CreateSpeakerModal({
    closeModal,
    editSpeakerField,
    currentSpeakerIndex,
}) {
    const parentClasses = useStyles(parentStyles);
    const classes = useStyles(styles);
    const { onCreateSpeakerProfile } = useActions();
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        touched,
        errors,
        values,
    } = useFormik({
        initialValues: { name: '', email: '', about: '', avatarBase64: '' },
        validationSchema: NewSpeakerSchema,
        onSubmit: async (submittedValues) => {
            try {
                const payload = {
                    userId: 'me',
                    name: submittedValues.name,
                    email: submittedValues.email,
                    about: submittedValues.about,
                    avatarBase64: submittedValues.avatarBase64,
                };
                const response = await onCreateSpeakerProfile(payload);
                const splittedName = response.name.split(' ');
                const speaker = {
                    id: response.id,
                    firstName: splittedName[0],
                    lastName:
                        splittedName.length > 1
                            ? splittedName.slice(1).join(' ')
                            : '',
                    isKwivrrUser: false,
                    avatarUrl: response.avatarUrl,
                };
                editSpeakerField('speaker', currentSpeakerIndex, speaker);
                closeModal();
            } catch (error) {
                console.log(error);
            }
        },
    });
    // const { id, firstName, lastName, isKwivrrUser, avatarUrl } = speaker;
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert(
                        'Sorry, we need camera roll permissions to make this work!'
                    );
                }
            }
        })();
    }, []);

    return (
        <>
            <InputComponent
                value={values.name}
                error={errors.name}
                touched={touched.name}
                onChangeText={handleChange('name')}
                onFocus={handleBlur('name')}
                style={classes.inputContainer}
                placeholder="First Last"
                label="Name"
                inputStyle={{ ...parentClasses.inputStyle, ...classes.name }}
                labelSize={16}
                labelColor="black"
            />
            <InputComponent
                value={values.email}
                error={errors.email}
                touched={touched.email}
                onChangeText={handleChange('email')}
                onFocus={handleBlur('email')}
                style={classes.inputContainer}
                placeholder="Speaker Description"
                label="Email"
                inputStyle={{ ...parentClasses.inputStyle, ...classes.name }}
                labelSize={16}
                labelColor="black"
            />
            <InputComponent
                value={values.about}
                error={errors.about}
                touched={touched.about}
                onChangeText={handleChange('about')}
                onFocus={handleBlur('about')}
                style={classes.inputContainer}
                placeholder="Speaker Description"
                label="About"
                inputStyle={{
                    ...parentClasses.inputStyle,
                    ...classes.about,
                }}
                labelSize={16}
                labelColor="black"
                multiline
            />
            <AvatarSelectMedia
                avatarSize={120}
                onChange={({ uri }) => {
                    if (uri.base64) {
                        setFieldValue('avatarBase64', uri.base64);
                    }
                }}
            />
            <AuthButton
                uppercase={false}
                textColor="white"
                backgroundColor="#3551A1"
                textFontSize={18}
                buttonStyle={classes.button}
                onPress={handleSubmit}
            >
                Create Speaker
            </AuthButton>
            <TextRegular onPress={closeModal} size={16}>
                Cancel
            </TextRegular>
        </>
    );
}

CreateSpeakerModal.propTypes = {
    closeModal: PropTypes.func,
};

export default CreateSpeakerModal;
