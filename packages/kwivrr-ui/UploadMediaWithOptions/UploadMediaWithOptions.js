import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    SafeAreaView,
    ActivityIndicator,
    // TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import KwivrrIcon from '../KwivrrIcon';
import KwivrrModal from '../KwivrrModal';
import { mediaTypes } from '../UploadMedia/utils';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import KwivrrCamera from '../KwivrrCamera/KwivrrCamera';
import useAnimatedClasses from './useAnimatedClasses';
import animatedstyles from './animatedstyles';

function UploadMediaWithOptions({
    style = {},
    onPress = {},
    icon = {
        size: 24,
        color: 'black',
        name: 'upload',
    },
    size = 10,
    mediaType = 'all',
    onChange = () => {},
}) {
    const [modalActive, setModalActive] = useState(false);
    const [image, setImage] = useState(undefined);
    const [imagePickerResult, setImagePickerResult] = useState(null);
    const [selecting, setSelecting] = useState(false);
    const [selectingFrom, setSelectingFrom] = useState('');

    const pickImage = async () => {
        setSelecting(true);
        setSelectingFrom('roll');
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: mediaTypes['images'],
            allowsEditing: false,
            //   aspect: [1, 1],
            quality: 0.2,
            base64: true,
        });
        setImagePickerResult(result);

        if (!result.cancelled) {
            setImage(result);
        } else {
            setSelecting(false);
        }
    };

    useEffect(() => {
        if (typeof image !== undefined || image !== undefined) {
            active.value = false;
            setTimeout(() => {
                onChange(image ? image : null);
                setSelecting(false);
            }, 500);
        }
    }, [image]);

    useEffect(() => {
        if (!selecting) {
            setSelectingFrom('');
        }
    }, [selecting, setSelectingFrom]);

    const active = useSharedValue(false);

    const animatedClasses = useAnimatedClasses(
        animatedstyles,
        { active },
        { size, backgroundColor: style.backgroundColor, selecting }
    );

    const buttonStyle = useMemo(
        () => ({
            width: size,
            height: size,
            borderRadius: size,
            justifyContent: 'center',
            alignItems: 'center',
        }),
        [size]
    );

    const openModal = () => {
        setSelecting(true);
        setSelectingFrom('camera');
        setModalActive(true);
    };
    const closeModal = () => {
        setSelecting(false);
        setModalActive(false);
    };

    return (
        <>
            <View>
                <Animated.View style={animatedClasses.styleCamera}>
                    <TouchableOpacity
                        onPress={openModal}
                        style={buttonStyle}
                        disabled={selecting}
                    >
                        {selecting && selectingFrom === 'camera' ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <KwivrrIcon
                                name="camera"
                                size={icon.size}
                                color={icon.color}
                            />
                        )}
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={animatedClasses.styleGallery}>
                    <TouchableOpacity
                        onPress={pickImage}
                        style={buttonStyle}
                        disabled={selecting}
                    >
                        {selecting && selectingFrom === 'roll' ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <KwivrrIcon
                                name="image"
                                size={icon.size}
                                color={icon.color}
                            />
                        )}
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        active.value = !active.value;
                    }}
                    style={{
                        ...style,
                        width: size,
                        height: size,
                        borderRadius: size,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    disabled={selecting}
                >
                    <View>
                        {selecting ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <React.Fragment>
                                <Animated.View
                                    style={animatedClasses.closeIcon}
                                >
                                    <KwivrrIcon
                                        name="x"
                                        size={icon.size}
                                        color={icon.color}
                                    />
                                </Animated.View>
                                <Animated.View
                                    style={animatedClasses.uploadIcon}
                                >
                                    <KwivrrIcon
                                        name={icon.name}
                                        size={icon.size}
                                        color={icon.color}
                                    />
                                </Animated.View>
                            </React.Fragment>
                        )}
                    </View>
                </TouchableOpacity>
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

function Camera({ unmountModal, setImage }) {
    return <KwivrrCamera setImage={setImage} unmountModal={unmountModal} />;
}

export default UploadMediaWithOptions;
