import React, { useState, useEffect, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import faker from 'faker';
import KwivrrImage from '../KwivrrImage';
import Touchable from '../Touchable';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import KwivrrIcon from '../KwivrrIcon';
import useTheme from 'kwivrr-hooks/useTheme';
import KwivrrModal from '../KwivrrModal';
import KwivrrCamera from '../KwivrrCamera';

function SelectCoverMedia({
    style = {},
    source = null,
    imageStyle = {},
    onChange = () => {},
    hasInitialImage = true,
    hasDeleteButton = false,
}) {
    const { palette } = useTheme();
    const [modalActive, setModalActive] = useState(false);
    const openModal = () => setModalActive(true);
    const closeModal = () => setModalActive(false);
    const [imageDeleted, setImageDeleted] = useState(false);
    const active = useSharedValue(!hasInitialImage);
    const [image, setImage] = useState(null);
    const toggleActive = () => {
        active.value = !active.value;
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.3,
            allowsMultipleSelection: false,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };
    useEffect(() => {
        'worklet';
        if (typeof image === undefined || !image) return;
        runOnJS(onChange)({ uri: !image ? '' : image });
        runOnJS(setImageDeleted)(false);
        active.value = false;
    }, [image]);

    const animatedImage = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: '100%',
            transform: [
                {
                    scale: withTiming(active.value ? 0.5 : 1),
                },
            ],
            opacity: withTiming(active.value ? 0 : 1),
            overflow: 'hidden',
        };
    });
    const animatedOptions = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: '100%',
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: palette.button.primary,
            top: 0,
            left: 0,
            borderRadius: 8,
            transform: [
                {
                    scale: withTiming(active.value ? 1 : 0.5),
                },
            ],
            opacity: withTiming(active.value ? 1 : 0),
        };
    });
    const xStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(active.value ? 1 : 0),
            transform: [
                {
                    scale: withTiming(active.value ? 1 : 0),
                },
            ],
        };
    });
    const addStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(active.value ? 0 : 1),
            transform: [
                {
                    scale: withTiming(active.value ? 0 : 1),
                },
            ],
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        };
    });
    const showDeleteButton = useMemo(
        () => hasDeleteButton && !imageDeleted && (image || hasInitialImage),
        [hasDeleteButton, image, imageDeleted]
    );

    const deleteImage = () => {
        runOnJS(onChange)({}, true);
        setImageDeleted(true);
        active.value = true;
    };

    const classes = useStyles(styles);

    return (
        <>
            <View style={style}>
                <Animated.View style={animatedOptions}>
                    <Touchable
                        style={classes.optionButtonFirst}
                        onPress={openModal}
                    >
                        <KwivrrIcon
                            name="camera"
                            color={palette.common.white}
                            size={32}
                        />
                    </Touchable>
                    <Touchable onPress={pickImage} style={classes.optionButton}>
                        <KwivrrIcon
                            name="image"
                            color={palette.common.white}
                            size={32}
                        />
                    </Touchable>
                </Animated.View>
                <Animated.View style={animatedImage}>
                    {source ? (
                        <KwivrrImage
                            style={{ ...classes.image, ...imageStyle }}
                            source={source}
                        />
                    ) : (
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: palette.placeholder,
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            activeOpacity={0.6}
                            onPress={toggleActive}
                        >
                            <KwivrrIcon
                                name="plus"
                                size={28}
                                color={palette.button.primary}
                            />
                        </TouchableOpacity>
                    )}
                </Animated.View>
                {showDeleteButton && (
                    <Touchable
                        style={classes.deleteButton}
                        onPress={deleteImage}
                    >
                        <View>
                            <KwivrrIcon
                                name="trash"
                                color={palette.common.white}
                            />
                        </View>
                    </Touchable>
                )}
                <Touchable style={classes.activeButton} onPress={toggleActive}>
                    <View>
                        <Animated.View style={xStyle}>
                            <KwivrrIcon name="x" color={palette.common.white} />
                        </Animated.View>
                        <Animated.View style={addStyle}>
                            <KwivrrIcon
                                name="plus"
                                color={palette.common.white}
                            />
                        </Animated.View>
                    </View>
                </Touchable>
            </View>
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

export default SelectCoverMedia;
