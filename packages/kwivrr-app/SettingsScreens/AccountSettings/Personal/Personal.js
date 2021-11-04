import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import Touchable from 'kwivrr-ui/Touchable';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import Divider from 'kwivrr-ui//Divider';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import useTheme from 'kwivrr-hooks/useTheme';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import TextRegular from 'kwivrr-ui/TextRegular';
import { useFormik } from 'formik';
import { personalInfoSchema } from './schemas';
import useActions from 'kwivrr-hooks/useActions';

const INPUTS = [
    {
        id: 'email',
        icon: {
            size: 22,
            name: 'mail',
        },
        _props: {},
    },
    {
        id: 'phone',
        icon: {
            size: 22,
            name: 'phone',
        },
        _props: {
            keyboardType: 'phone-pad',
        },
    },
    {
        id: 'shopLink',
        icon: {
            size: 22,
            name: 'shopping-cart',
        },
        _props: {},
    },
];

function Personal({ userInfo: _userInfo }) {
    const { onUpdateUserAccount, onUpdateUserEmail } = useActions();
    const { palette } = useTheme();
    const { userInfo, setUserInfo } = useAuthCredentials();
    useEffect(() => {
        setUserInfo((prev) => ({ ...prev, ..._userInfo }));
    }, []);
    const { email_visibility } = userInfo;
    const { values, errors, setFieldValue, handleChange } = useFormik({
        initialValues: {
            email: userInfo.email,
            phone: userInfo.phone,
            shopLink: userInfo.shopLink,
        },
        validationSchema: personalInfoSchema,
    });
    const [isEditing, setIsEditing] = useState({
        email: false,
        phone: false,
        shopLink: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [compare, setCompare] = useState({
        email: userInfo.email,
        phone: userInfo.phone,
        shopLink: userInfo.shopLink,
    });
    const [show, setShow] = useState({
        email: email_visibility,
        phone: false,
    });
    const changeVisibility = (id) => {
        const payloadKey = `${id}_visibility`;
        onUpdateUserAccount({
            [payloadKey]: !show[id],
            userId: 'me',
            id: 'me',
        });
        setShow((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const save = (key) => {
        if (values[key] !== compare[key]) {
            if (key === 'email') {
                setIsLoading(true);
                changeEmail(key);
                return;
            } else {
                let payloadKey = key === 'shopLink' ? 'shop_link' : key;
                onUpdateUserAccount({ [payloadKey]: values[key] });
                unactiveEditing(key);
            }
            setUserInfo((prev) => ({
                ...prev,
                [key]: values[key],
            }));
            setCompare((prev) => ({
                ...prev,
                [key]: values[key],
            }));
        }
    };
    const changeEmail = async (key) => {
        try {
            const response = await onUpdateUserEmail({
                id: 'me',
                email: values.email,
            });
            setUserInfo((prev) => ({
                ...prev,
                [key]: values[key],
            }));
            setCompare((prev) => ({
                ...prev,
                [key]: values[key],
            }));
            setIsLoading(false);
            unactiveEditing('email');
        } catch (e) {
            Alert.alert('Email Error', e.data.error);
            setUserInfo((prev) => ({
                ...prev,
                [key]: compare.email,
            }));
            setFieldValue('email', compare.email);
            setIsLoading(false);
            unactiveEditing('email');
        }
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
        <View style={[classes.container, { zIndex: 2 }]}>
            {INPUTS.map(({ id, icon, _props }, idx) => (
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
                                {..._props}
                            />
                            <View style={classes.overflowActionIcons}>
                                <Touchable
                                    disabled={
                                        errors[id] ||
                                        values[id] === compare[id] ||
                                        isLoading ||
                                        (id === 'email' &&
                                            values[id].length === 0)
                                    }
                                    onPress={() => save(id)} // here
                                    style={classes.overflowActionIcon}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator
                                            color={palette.button.primary}
                                            size="small"
                                            style={classes.overflowIcon}
                                        />
                                    ) : (
                                        <KwivrrIcon
                                            style={classes.overflowIcon}
                                            name="check"
                                            color={palette.button.primary}
                                        />
                                    )}
                                </Touchable>
                                <Touchable
                                    onPress={() => close(id)}
                                    style={classes.overflowActionIcon}
                                    disabled={isLoading}
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
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                style={classes.editButtonFullName}
                            >
                                {id === 'email' && (
                                    <TouchableOpacity
                                        onPress={() => changeVisibility(id)}
                                        style={[
                                            // classes.editButtonFullName,
                                            { marginRight: 8 },
                                        ]}
                                    >
                                        <KwivrrIcon
                                            name={show[id] ? 'eye' : 'eye-off'}
                                            size={24}
                                            color={palette.button.primary}
                                        />
                                    </TouchableOpacity>
                                )}
                                <Touchable onPress={() => activeEditing(id)}>
                                    <KwivrrIcon
                                        name={
                                            !values[id] ||
                                            values[id]?.length === 0
                                                ? 'plus'
                                                : 'edit'
                                        }
                                        size={24}
                                        color={palette.button.primary}
                                    />
                                </Touchable>
                            </View>
                        </View>
                    )}
                </View>
            ))}
            <Divider style={classes.divider} />
        </View>
    );
}

export default Personal;
