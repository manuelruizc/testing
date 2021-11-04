import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import Touchable from 'kwivrr-ui/Touchable';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import useTheme from 'kwivrr-hooks/useTheme';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import TextRegular from 'kwivrr-ui/TextRegular';
import { useFormik } from 'formik';
import { SocialMediaSchema } from './schemas';
import Divider from 'kwivrr-ui/Divider';
import useActions from 'kwivrr-hooks/useActions';

const INPUTS = [
    {
        id: 'facebookId',
        name: 'facebook',
        icon: {
            size: 22,
            name: 'logo-facebook',
        },
    },
    {
        id: 'instagramId',
        name: 'instagram',
        icon: {
            size: 22,
            name: 'logo-instagram',
        },
    },
    {
        id: 'twitterId',
        name: 'twitter',
        icon: {
            size: 22,
            name: 'logo-twitter',
        },
    },
    {
        id: 'pinterestId',
        name: 'pinterest',
        icon: {
            size: 22,
            name: 'logo-pinterest',
        },
    },
    {
        id: 'linkedinId',
        name: 'linkedin',
        icon: {
            size: 22,
            name: 'logo-linkedin',
        },
    },
    {
        id: 'bloggerId',
        name: 'blogger',
        icon: {
            size: 22,
            name: 'logo-blogger',
        },
    },
];

function SocialMedia({ userInfo: _userInfo }) {
    const { onUpdateUserAccount } = useActions();
    const { palette } = useTheme();
    const { userInfo, setUserInfo } = useAuthCredentials();
    const initialStates = useMemo(() => {
        const object = {
            initialValues: {},
            editingStates: {},
            compareValues: {},
        };
        INPUTS.forEach((input) => {
            object.initialValues[input.id] = userInfo[input.name];
            object.editingStates[input.id] = false;
            object.compareValues[input.id] = userInfo[input.name];
        });
        return object;
    }, [INPUTS, userInfo]);
    const { values, handleChange, setFieldValue, errors } = useFormik({
        initialValues: initialStates.initialValues,
        validationSchema: SocialMediaSchema,
    });
    const [isEditing, setIsEditing] = useState(initialStates.editingStates);
    const [compare, setCompare] = useState(initialStates.compareValues);

    useEffect(() => {
        setUserInfo((prev) => ({ ...prev, ..._userInfo }));
    }, []);

    const save = (key, payloadKey) => {
        if (values[key] !== compare[key]) {
            setUserInfo((prev) => ({
                ...prev,
                [key]: values[key],
            }));
            setCompare((prev) => ({
                ...prev,
                [key]: values[key],
            }));
            onUpdateUserAccount({ [payloadKey]: values[key] });
        }
        unactiveEditing(key);
    };
    const close = (key) => {
        setFieldValue(key, compare[key]);
        unactiveEditing(key);
    };
    const activeEditing = (key) => {
        setIsEditing((prev) => ({
            ...prev,
            [key]: true,
        }));
    };
    const unactiveEditing = (key) => {
        setIsEditing((prev) => ({
            ...prev,
            [key]: false,
        }));
    };
    const classes = useStyles(styles);

    return (
        <View style={classes.container}>
            {INPUTS.map(({ id, name, icon }, idx) => (
                <View
                    key={id}
                    style={[classes.row, { zIndex: INPUTS.length - idx }]}
                >
                    {isEditing[id] ? (
                        <View style={classes.editingHeaderContainer}>
                            <InputComponent
                                autoCapitalize="none"
                                value={values[id]}
                                onChangeText={handleChange(id)}
                                style={classes.inputContainer}
                                inputInnerStyle={classes.innerInputStyle}
                                inputStyle={classes.inputStyle}
                                iconLeft={icon.name}
                                iconLeftSize={icon.size}
                            />
                            <View style={classes.overflowActionIcons}>
                                <Touchable
                                    disabled={errors[id]}
                                    onPress={() => save(id, name)}
                                    style={classes.overflowActionIcon}
                                >
                                    <KwivrrIcon
                                        style={classes.overflowIcon}
                                        name="check"
                                        color={palette.button.primary}
                                    />
                                </Touchable>
                                <Touchable
                                    onPress={() => close(id)}
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
                        <View style={classes.personalDataContainer}>
                            <KwivrrIcon name={icon.name} />
                            <TextRegular style={classes.fullName} size={16}>
                                {values[id]}
                            </TextRegular>
                            <Touchable
                                onPress={() => activeEditing(id)}
                                style={classes.editButtonFullName}
                            >
                                <KwivrrIcon
                                    name={
                                        !values[id] || values[id]?.length === 0
                                            ? 'plus'
                                            : 'edit'
                                    }
                                    size={24}
                                    color={palette.button.primary}
                                />
                            </Touchable>
                        </View>
                    )}
                </View>
            ))}
            <Divider style={classes.divider} />
        </View>
    );
}

export default SocialMedia;
