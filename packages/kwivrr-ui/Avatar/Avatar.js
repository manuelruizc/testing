import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Touchable from 'kwivrr-ui/Touchable';
import * as ImagePicker from 'expo-image-picker';
import KwivrrIcon from '../KwivrrIcon';
import KwivrrImage from '../KwivrrImage';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import KwivrrModal from '../KwivrrModal';
import KwivrrCamera from '../KwivrrCamera';
import useTheme from 'kwivrr-hooks/useTheme';

function Avatar({
    style = {},
    imageStyle = {},
    onPress = null,
    onPressIcon = 'x',
    onPressIconSize = 20,
    onPressIconColor = 'white',
    onPressIconBackgroundColor = '#FF1B1A',
    size = 38,
    source = {
        uri: 'https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/male_avatar-512.png',
    },
    ...rest
}) {
    const { palette } = useTheme();
    const classes = useStyles(styles);
    const _source = useMemo(() => {
        if (!source.uri)
            return {
                uri: 'https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/male_avatar-512.png',
            };
        if (!source.uri.length)
            return {
                uri: 'https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/male_avatar-512.png',
            };
        else return source;
    }, [source]);
    if (onPress) {
        return (
            <View
                style={[
                    { ...style },
                    classes.profileImage,
                    {
                        width: size,
                        height: size,
                        borderRadius: size,
                        borderWidth: 1,
                        backgroundColor: palette.placeholder,
                    },
                ]}
            >
                <KwivrrImage
                    source={_source}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10000,
                    }}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        ...classes.xButton,
                        backgroundColor: onPressIconBackgroundColor,
                    }}
                >
                    <KwivrrIcon
                        name={onPressIcon}
                        color={onPressIconColor}
                        size={onPressIconSize}
                    />
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View
            style={[
                style,
                {
                    width: size,
                    height: size,
                    borderRadius: size,
                    overflow: 'hidden',
                    backgroundColor: palette.placeholder,
                },
            ]}
        >
            <KwivrrImage
                {...rest}
                style={[
                    {
                        width: size,
                        height: size,
                        borderRadius: size,
                        borderRadius: 1000,
                    },
                    imageStyle,
                ]}
                source={_source}
                resizeMode="cover"
            />
        </View>
    );
}

export function AvatarSelectMedia({
    style = {},
    // containerStyle = {},
    // onPress = null,
    onChange = () => {},
    onPress = null,
    onPressIcon = 'x',
    onPressIconSize = 20,
    onPressIconColor = 'white',
    onPressIconBackgroundColor = '#FF1B1A',
    avatarSize = 38,
    uri = null,
    hasInitialImage = true,
    hasDeleteButton = false,
    ...rest
}) {
    const mounted = useRef(false);
    const classes = useStyles(styles);
    const [modalActive, setModalActive] = useState(false);
    const [image, setImage] = useState(uri);
    const [imageDeleted, setImageDeleted] = useState(false);
    const [imagePickerResult, setImagePickerResult] = useState(null);
    const active = useSharedValue(!hasInitialImage);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.4,
            allowsMultipleSelection: false,
            base64: true,
        });

        setImagePickerResult(result);

        if (!result.cancelled) {
            setImage(result);
        }
    };

    const activeSelection = () => {
        active.value = !active.value;
        // if (image) {
        //     setImage(null);
        // }
    };

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }
        if (typeof image === undefined && !image) return;
        if (imageDeleted) {
            setImageDeleted(true);
            setImage(null);
        }
        onChange({ uri: !image ? '' : image });
        setImageDeleted(false);
        active.value = false;
    }, [image, imageDeleted]);

    const containerStyle = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: '100%',
            borderRadius: 10000,
            backgroundColor: '#3551A1',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
                {
                    scale: withTiming(active.value ? 0 : 1),
                },
            ],
        };
    });
    const optionsStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 10000,
            backgroundColor: '#3551A1',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
                {
                    scale: withTiming(active.value ? 1 : 0),
                },
            ],
        };
    });
    const closeButton = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            right: -(14 / 2),
            height: 36,
            width: 36,
            backgroundColor: '#3551A1',
            overflow: 'hidden',
            borderWidth: 1,
            borderRadius: 80,
            borderColor: 'rgba(255, 255, 255, 0.6)',
            transform: [
                { scale: withTiming(active.value ? 1 : 0) },
                { translateX: withTiming(active.value ? 0 : -40) },
            ],
            opacity: withTiming(active.value ? 1 : 0),
        };
    });
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: [
                {
                    scale: withTiming(active.value ? 0 : 1),
                },
            ],
            opacity: withTiming(active.value ? 0 : 1),
        };
    });

    const openModal = () => setModalActive(true);
    const closeModal = () => setModalActive(false);

    const showDeleteButton = useMemo(
        () => hasDeleteButton && !imageDeleted && (image || hasInitialImage),
        [hasDeleteButton, image, imageDeleted]
    );

    const deleteImage = () => {
        onChange({}, true);
        setImageDeleted(true);
        active.value = true;
    };

    return (
        <>
            <View
                style={{
                    ...classes.noImageContainer,
                    ...style,
                    width: avatarSize,
                    height: avatarSize,
                    backgroundColor: '#3551A1',
                }}
            >
                <Animated.View style={containerStyle}>
                    <Touchable
                        onPress={activeSelection}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <KwivrrIcon name="upload" color="white" size={24} />
                    </Touchable>
                </Animated.View>
                <Animated.View style={optionsStyle}>
                    <Touchable
                        onPress={pickImage}
                        style={{
                            width: '100%',
                            borderBottomWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            height: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <KwivrrIcon name="image" color="white" size={24} />
                    </Touchable>
                    <TouchableOpacity
                        onPress={openModal}
                        style={{
                            width: '100%',
                            height: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <KwivrrIcon name="camera" color="white" size={24} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={closeButton}>
                    <Touchable
                        onPress={() => (active.value = false)}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <KwivrrIcon
                            name="x"
                            color="white"
                            size={onPressIconSize}
                        />
                    </Touchable>
                </Animated.View>
                {image && (
                    <Animated.View style={imageStyle}>
                        <KwivrrImage
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: avatarSize,
                            }}
                            source={{ uri: image.uri ? image.uri : image }}
                        />
                        <Touchable
                            onPress={activeSelection}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                height: 36,
                                width: 36,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10000,
                                transform: [
                                    {
                                        translateX: 10,
                                    },
                                ],
                                backgroundColor: onPressIconBackgroundColor,
                            }}
                        >
                            <KwivrrIcon
                                name={onPressIcon}
                                color={onPressIconColor}
                                size={onPressIconSize}
                            />
                        </Touchable>
                        {showDeleteButton && (
                            <View style={classes.deleteImage}>
                                <TouchableOpacity
                                    onPress={deleteImage}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <KwivrrIcon
                                        name="trash"
                                        color="white"
                                        size={onPressIconSize}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </Animated.View>
                )}
            </View>
            {/* ) : (
                <Avatar
                    style={style}
                    source={{ uri: image }}
                    resizeMode="cover"
                    size={avatarSize}
                    onPress={() => setImage(null)}
                />
            )} */}
            {modalActive && (
                <KwivrrModal
                    fullscreen
                    fullScreenContainerStyle={{
                        backgroundColor: 'transparent',
                    }}
                    close={closeModal}
                    backdropColor="transparent"
                    onRequestCloseType="unmount"
                >
                    <Camera setImage={setImage} />
                </KwivrrModal>
            )}
        </>
    );
}

function Camera({ setImage, unmountModal }) {
    return <KwivrrCamera setImage={setImage} unmountModal={unmountModal} />;
}

export default Avatar;
