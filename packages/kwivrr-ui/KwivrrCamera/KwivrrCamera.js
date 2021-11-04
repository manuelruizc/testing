import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Platform,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { Orientation } from 'expo-screen-orientation';
import Touchable from 'kwivrr-ui/Touchable';
// import { Accelerometer } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import KwivrrGradient from '../KwivrrGradient';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import CameraHeader from './CameraHeader';
import PictureTaken from './PictureTaken';
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useTheme from 'kwivrr-hooks/useTheme';

function KwivrrCamera({ unmountModal = () => {}, setImage }) {
    let cameraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [picture, setPicture] = useState(true);
    const [pictureBeenTaken, setPictureBeenTaken] = useState(false);
    const [pictureUrl, setPictureUrl] = useState(Orientation.PORTRAIT_UP);
    const [pictureIsLoading, setPictureIsLoading] = useState(false);
    const classes = useStyles(styles);
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const degrees = useSharedValue(true);
    const [orientation, setOrientation] = useState('portrait');
    const [subscription, setSubscription] = useState(null);

    // const _subscribe = () => {
    //     setSubscription(
    //         Accelerometer.addListener(gyroscopeData => {
    //         setData(gyroscopeData);
    //       })
    //     );
    // };

    // const _unsubscribe = () => {
    //     subscription && subscription.remove();
    //     setSubscription(null);
    // };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if (!pictureBeenTaken) {
            cameraRef.current?.resumePreview();
            setPictureIsLoading(false);
            return;
        }
        cameraRef.current?.pausePreview();
    }, [pictureBeenTaken, setPictureIsLoading]);

    const snap = async () => {
        try {
            if (cameraRef.current) {
                let photo = await cameraRef.current.takePictureAsync({
                    exif: true,
                    base64: true,
                    quality: 0.3,
                });
                setPictureIsLoading(true);
                setPictureUrl(photo);
                setPictureBeenTaken(true);
            }
        } catch (e) {
            Alert.alert(
                'Camera Error',
                'There was an error with the picture you tried to take'
            );
        }
    };

    // const { x, y, z } = data;

    // const phoneDegrees = useMemo(() => {
    //     let alpha = Math.atan(x/y)/Math.PI*360;
    //     alpha = Math.abs(alpha);
    //     return (x > 0) ? alpha : -alpha;
    // }, [x, y, z]);

    // useEffect(() => {
    //     if (phoneDegrees < 225 && phoneDegrees > 140) {
    //         degrees.value = withTiming(90);
    //         setOrientation('landscape-right');
    //     }
    //     if (phoneDegrees > -225 && phoneDegrees < -140) {
    //         degrees.value = withTiming(90);
    //         setOrientation('landscape-left');
    //     }
    //     if (phoneDegrees > -45 && phoneDegrees < 45) {
    //         degrees.value = withTiming(0);
    //         setOrientation('portrait');
    //     }
    // }, [phoneDegrees, setOrientation]);

    const buttonStyles = useAnimatedStyle(() => {
        const rotate = interpolate(
            degrees.value,
            [-90, 0, 90],
            [-90, 0, 90],
            Extrapolate.CLAMP
        );
        return {
            width: Platform.OS === 'ios' ? 50 : 40,
            height: Platform.OS === 'ios' ? 50 : 40,
            borderRadius: Platform.OS === 'ios' ? 50 : 40,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            transform: [
                {
                    rotate: `${rotate}deg`,
                },
            ],
        };
    });

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const { screenWidth } = useDimensions();

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.offsetX = translateX.value;
            ctx.offsetY = translateY.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.offsetX + event.translationX;
            translateY.value = ctx.offsetY + event.translationY;
        },
        onEnd: (event, ctx) => {
            if (translateX.value > screenWidth / 2) {
                translateX.value = withTiming(screenWidth * 2);
                translateY.value = withTiming(screenWidth * 2, {}, () => {
                    runOnJS(unmountModal)();
                });
                return;
            } else if (translateX.value < -(screenWidth / 2)) {
                translateX.value = withTiming(-(screenWidth * 2));
                translateY.value = withTiming(-(screenWidth * 2), {}, () => {
                    runOnJS(unmountModal)();
                });
                return;
            }
            translateX.value = withTiming(0);
            translateY.value = withTiming(0);
            //     velocity: event.velocityX,
            //     clamp: [0, width - CARD_WIDTH],
            //   });
            //   translateY.value = withDecay({
            //     velocity: event.velocityY,
            //     clamp: [0, height - CARD_HEIGHT],
            //   });
        },
    });

    const { device } = useTheme();

    const containerStyle = useAnimatedStyle(() => {
        return {
            flex: 1,
            height: device.size.height,
            position: 'relative',
            backgroundColor: 'black',
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
                {
                    scale: interpolate(
                        translateX.value,
                        [-screenWidth, 0, screenWidth],
                        [0.8, 1, 0.8]
                    ),
                },
            ],
            borderRadius: interpolate(
                translateY.value,
                [-0.1, 0, 0.1],
                [40, 0, 40],
                Extrapolate.CLAMP
            ),
            overflow: 'hidden',
            opacity: interpolate(
                translateX.value,
                [-screenWidth, 0, screenWidth],
                [0.2, 1, 0.2]
            ),
        };
    });

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <PanGestureHandler {...{ onGestureEvent }}>
            <Animated.View style={containerStyle}>
                <Camera
                    ref={cameraRef}
                    ratio="16:9"
                    style={classes.camera}
                    type={type}
                    autoFocus={Camera.Constants.AutoFocus.on}
                    flashMode={
                        !picture && flashMode === Camera.Constants.FlashMode.on
                            ? Camera.Constants.FlashMode.torch
                            : flashMode
                    }
                >
                    <SafeAreaView
                        style={{ flex: 1, justifyContent: 'space-between' }}
                    >
                        <CameraHeader
                            pictureBeenTaken={pictureBeenTaken}
                            setFlashMode={setFlashMode}
                            flashMode={flashMode}
                            closeModal={unmountModal}
                            degrees={degrees}
                        />
                        <View style={classes.cameraFooter}>
                            <View style={{ width: 50 }} />
                            <TouchableOpacity
                                disabled={pictureBeenTaken}
                                onPress={snap}
                                style={classes.recordButton}
                            >
                                <View style={classes.recordButtonBackground}>
                                    <KwivrrGradient />
                                </View>
                                <View style={classes.recColor} />
                            </TouchableOpacity>
                            <Animated.View style={buttonStyles}>
                                <TouchableOpacity
                                    disabled={pictureBeenTaken}
                                    onPress={() =>
                                        setType((prev) =>
                                            prev === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        )
                                    }
                                    style={{
                                        ...classes.regularBtn,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Ionicons
                                        name="camera-reverse"
                                        color="white"
                                        size={24}
                                    />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </SafeAreaView>
                </Camera>
                {pictureBeenTaken && (
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'black',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    />
                )}
                {pictureBeenTaken && (
                    <PictureTaken
                        pictureUrl={pictureUrl}
                        setPictureBeenTaken={setPictureBeenTaken}
                        setImage={setImage}
                        closeModal={unmountModal}
                    />
                )}
                {pictureIsLoading && !pictureBeenTaken && (
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'black',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    />
                )}
            </Animated.View>
        </PanGestureHandler>
    );
}

export default KwivrrCamera;
