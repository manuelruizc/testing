import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import Touchable from 'kwivrr-ui/Touchable';
import useStyles from 'kwivrr-hooks/useStyles';
import useTheme from 'kwivrr-hooks/useTheme';
import useActions from 'kwivrr-hooks/useActions';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import styles from './styles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';

function Main({ userInfo: _userInfo }) {
    const { userInfo, setUserInfo } = useAuthCredentials();
    useEffect(() => {
        setUserInfo((prev) => ({ ...prev, ..._userInfo }));
    }, []);
    const { onUpdateUserAccount } = useActions();
    const [editingFullName, setEditingFullName] = useState(false);
    const [editingTagline, setEditingTagline] = useState(false);
    const [fullName, setFullName] = useState(userInfo.fullName);
    const [compareFullName, setCompareFullName] = useState(userInfo.fullName);
    const [tagline, setTagline] = useState(userInfo.tagline);
    const [compareTagline, setCompareTagline] = useState(userInfo.tagline);

    useEffect(() => {
        setFullName(userInfo.firstName + ' ' + userInfo.lastName);
        setCompareFullName(userInfo.firstName + ' ' + userInfo.lastName);
        setTagline(userInfo.tagline);
        setCompareTagline(userInfo.tagline);
    }, [userInfo]);

    const saveName = () => {
        if (fullName !== compareFullName) {
            setCompareFullName(fullName);
            const fullNameSplitted = fullName.split(' ');
            const firstname = fullNameSplitted[0];
            fullNameSplitted.splice(0, 1);
            const lastname = fullNameSplitted.join(' ');
            setUserInfo((prev) => ({
                ...prev,
                fullName,
                firstName: firstname,
                lastName: lastname,
            }));
            onUpdateUserAccount({ firstname, lastname });
        }
        setEditingFullName(false);
    };
    const closeName = () => {
        setFullName(compareFullName);
        setEditingFullName(false);
    };
    const saveTagline = () => {
        if (tagline !== compareTagline) {
            setUserInfo((prev) => ({
                ...prev,
                tagline,
            }));
            onUpdateUserAccount({ tagline });
            setCompareTagline(tagline);
        }
        setEditingTagline(false);
    };
    const closeTagline = () => {
        setTagline(compareTagline);
        setEditingTagline(false);
    };
    const clearInput = (key) => {
        if (key === 'tagline') {
            setTagline('');
        } else {
            setFullName('');
        }
    };
    const classes = useStyles(styles);
    const { palette } = useTheme();
    return (
        <View style={classes.container}>
            <View style={[classes.row, { zIndex: 2 }]}>
                {editingFullName ? (
                    <View style={classes.editingHeaderContainer}>
                        <InputComponent
                            value={fullName}
                            onChangeText={(text) => setFullName(text)}
                            style={classes.inputContainer}
                            inputInnerStyle={classes.innerInputStyle}
                            inputStyle={classes.inputStyle}
                            textAlign="center"
                        />
                        <View style={classes.overflowActionIcons}>
                            <Touchable
                                disabled={!fullName.length}
                                onPress={saveName}
                                style={classes.overflowActionIcon}
                            >
                                <KwivrrIcon
                                    style={classes.overflowIcon}
                                    name="check"
                                    color={palette.button.primary}
                                />
                            </Touchable>
                            <Touchable
                                onPress={closeName}
                                style={classes.overflowActionIcon}
                            >
                                <KwivrrIcon
                                    style={classes.overflowIcon}
                                    name="x"
                                    color={palette.button.primary}
                                />
                            </Touchable>
                        </View>
                    </View>
                ) : (
                    <View style={classes.fullNameContainer}>
                        <TextHeader style={classes.fullName} size={18}>
                            {fullName}
                        </TextHeader>
                        <TouchableOpacity
                            onPress={() => setEditingFullName(true)}
                            style={classes.editButtonFullName}
                        >
                            <KwivrrIcon
                                name="edit"
                                size={24}
                                color={palette.button.primary}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View style={[classes.row, { zIndex: 1 }]}>
                {editingTagline ? (
                    <View style={classes.editingHeaderContainer}>
                        <InputComponent
                            value={tagline}
                            onChangeText={(text) => setTagline(text)}
                            style={classes.inputContainer}
                            inputInnerStyle={classes.innerInputStyle}
                            inputStyle={classes.inputStyle}
                            textAlign="center"
                        />
                        <View style={classes.overflowActionIcons}>
                            <TouchableOpacity
                                onPress={saveTagline}
                                style={classes.overflowActionIcon}
                            >
                                <KwivrrIcon
                                    style={classes.overflowIcon}
                                    name="check"
                                    color={palette.button.primary}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={closeTagline}
                                style={classes.overflowActionIcon}
                            >
                                <KwivrrIcon
                                    style={classes.overflowIcon}
                                    name="x"
                                    color={palette.button.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : tagline ? (
                    <View style={classes.fullNameContainer}>
                        <TextRegular style={classes.fullName}>
                            {tagline}
                        </TextRegular>
                        <TouchableOpacity
                            onPress={() => setEditingTagline(true)}
                            style={classes.editButtonFullName}
                        >
                            <KwivrrIcon
                                name="edit"
                                size={24}
                                color={palette.button.primary}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Touchable onPress={() => setEditingTagline(true)}>
                        <TextRegular color={palette.button.primary}>
                            Add Tagline
                        </TextRegular>
                    </Touchable>
                )}
            </View>
        </View>
    );
}

export default Main;
