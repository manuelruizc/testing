import React, { useMemo, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import SettingsLayout from 'kwivrr-ui/SettingsLayout';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import InputComponent from 'kwivrr-ui/InputComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Avatar, { AvatarSelectMedia } from 'kwivrr-ui/Avatar';
import AuthButton from 'kwivrr-ui/AuthButton';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import usePlatform from '../../../kwivrr-hooks/usePlatftorm';
import Touchable from 'kwivrr-ui/Touchable';
import UpdatePassword from './UpdatePassword';

function AboutSettings({ navigation }) {
    const { userInfo } = useAuthCredentials();
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [updatedUserInfo, setUpdatedUserInfo] = useState({ ...userInfo });
    const { email, firstName, lastName, fullName, tagline, avatar } =
        updatedUserInfo;
    const { isAndroid } = usePlatform();
    const [changePassword, setChangePassword] = useState(false);
    const [compareUserInfo, setCompareUserInfo] = useState({ ...userInfo });
    const onPress = () => {
        // setCompareUserInfo({ ...updatedUserInfo });
        setIsEditingInfo(false);
        alert('Saved changes');
    };
    const infoChanged = useMemo(() => {
        console.log('aqui');
        for (const item of Object.entries(compareUserInfo)) {
            const [key, value] = item;
            console.log(value, updatedUserInfo[key]);
            if (value !== updatedUserInfo[key]) {
                return true;
            }
        }
        return false;
    }, [updatedUserInfo, compareUserInfo]);
    const updateProperty = (value, property) => {
        setUpdatedUserInfo((prev) => {
            prev[property] = value;
            return { ...prev };
        });
    };
    const classes = useStyles(styles);
    return (
        <>
            <SettingsLayout onPress={() => navigation.goBack()}>
                <KeyboardAwareScrollView
                    style={classes.scrollViewContainer}
                    contentContainerStyle={classes.scrollViewContentContainer}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={classes.userNameInfo}>
                        <UserFullName
                            isEditing={isEditingInfo}
                            name={fullName}
                            updateProperty={updateProperty}
                        />
                        <Touchable
                            style={classes.editIcon}
                            onPress={() => setIsEditingInfo((prev) => !prev)}
                        >
                            <KwivrrIcon name="edit" color="#5F75B6" />
                        </Touchable>
                    </View>
                    <UserEmail
                        email={email}
                        isEditing={isEditingInfo}
                        updateProperty={updateProperty}
                    />
                    <View style={classes.profileImageContainer}>
                        <TextRegular size={18}>Profile Image</TextRegular>
                        <AvatarSelectMedia
                            uri={avatar}
                            avatarSize={isAndroid ? 100 : 120}
                            onChange={({ uri }) => {
                                if (uri !== '') {
                                    updateProperty(uri, 'avatar');
                                }
                            }}
                            style={classes.avatarSelection}
                        />
                        <UserTagline
                            tagline={updatedUserInfo.tagline}
                            isEditing={isEditingInfo}
                            updateProperty={updateProperty}
                        />
                    </View>
                    <AuthButton
                        uppercase={false}
                        textFontSize={22}
                        gradientBackground={infoChanged}
                        disabled={!infoChanged}
                        backgroundColor={
                            infoChanged
                                ? 'transparent'
                                : 'rgba(66, 66, 66, 0.2)'
                        }
                        style={classes.authButton}
                        textColor={
                            infoChanged ? 'white' : 'rgba(66, 66, 66, 0.4)'
                        }
                        onPress={onPress}
                    >
                        Save
                    </AuthButton>
                    <View style={classes.divider} />
                    <Touchable onPress={() => setChangePassword(true)}>
                        <TextRegular
                            size={18}
                            color="#5F75B6"
                            style={classes.textBody}
                        >
                            Change Password
                        </TextRegular>
                    </Touchable>
                </KeyboardAwareScrollView>
            </SettingsLayout>
            {changePassword && (
                <KwivrrModal
                    modalStyle={{ ...classes.modalStyle }}
                    title={'Change Your Password'}
                    close={() => setChangePassword(false)}
                >
                    <UpdatePassword />
                </KwivrrModal>
            )}
        </>
    );
}

function UserFullName({ name, isEditing, updateProperty }) {
    const classes = useStyles(styles);
    if (isEditing) {
        return (
            <InputComponent
                onChangeText={(text) => updateProperty(text, 'fullName')}
                value={name}
                style={classes.emailInputStyle}
                placeholder="Name"
                label="Name"
                inputStyle={classes.inputStyle}
                labelSize={16}
                labelColor="black"
            />
        );
    }
    return (
        <TextHeader size={18} style={classes.title}>
            {name}
        </TextHeader>
    );
}

function UserEmail({ email, isEditing, updateProperty }) {
    const classes = useStyles(styles);
    if (isEditing) {
        return (
            <InputComponent
                onChangeText={(text) => updateProperty(text, 'email')}
                value={email}
                style={classes.emailInputStyle}
                keyboardType="email"
                placeholder="E-mail"
                label="E-mail"
                inputStyle={classes.inputStyle}
                labelSize={16}
                labelColor="black"
            />
        );
    }
    return (
        <TextRegular size={18} style={classes.nonEditingEmail}>
            {email}
        </TextRegular>
    );
}

function UserTagline({ tagline, isEditing, updateProperty }) {
    const classes = useStyles(styles);
    if (isEditing) {
        return (
            <InputComponent
                onChangeText={(text) => updateProperty(text, 'tagline')}
                value={tagline}
                style={classes.inputContainer}
                placeholder="What your're thinking about?"
                label="Tagline"
                inputStyle={classes.inputStyle}
                labelSize={16}
                labelColor="black"
            />
        );
    }
    return (
        <View style={classes.nonEditingTagline}>
            <TextRegular size={16} style={classes.nonEditingTaglineLabel}>
                Tagline
            </TextRegular>
            <TextRegular>{tagline}</TextRegular>
        </View>
    );
}

AboutSettings.propTypes = {
    navigation: PropTypes.object,
};

export default AboutSettings;
