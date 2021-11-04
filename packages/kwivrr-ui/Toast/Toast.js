import React, { useContext, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import { ToastContext } from 'kwivrr-common/ToastContext';
import useDimensions from 'kwivrr-hooks/useDimensions';
import KwivrrIcon from '../KwivrrIcon';
import TextRegular from '../TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import useToast from 'kwivrr-hooks/useToast';

function Toast() {
    const { toasts } = useToast();
    if (!toasts.length) {
        return <></>;
    }
    return (
        <>
            {toasts.map((toast, idx) => {
                return <SingleToast key={toast.id} toast={toast} idx={idx} />;
            })}
        </>
    );
}

function SingleToast({ toast, idx }) {
    const { isAndroid } = usePlatform();
    const { screenWidth, screenHeight } = useDimensions();
    const { setToast, unshiftToast, deleteToastWithId } = useToast();
    const classes = useStyles(styles);
    const position = useSharedValue(-screenHeight / 3);
    const isClosing = useSharedValue(false);
    const top = useMemo(() => ({
        first: isAndroid ? 30 : 60,
        nonFirst: isAndroid ? 60 : 74,
    }));
    const containerStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: withTiming((idx + 1) * (idx === 0 ? top.first : top.nonFirst)),
            left: 0,
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
                {
                    translateY: position.value,
                },
            ],
            opacity: interpolate(
                position.value,
                [-screenHeight / 3, 0],
                [0, 1]
            ),
            zIndex: 10000 + idx,
            elevation: 10000 + idx,
        };
    });
    const deleteToast = () => {
        deleteToastWithId(toast.id);
    };
    const unshift = () => {
        unshiftToast();
    };
    const close = () => {
        'worklet';
        if (!isClosing.value) {
            isClosing.value = true;
            position.value = withTiming(
                -screenHeight / 3,
                { duration: 500, easing: Easing.inOut(Easing.ease) },
                () => {
                    runOnJS(unshift)();
                }
            );
        }
    };
    const closeId = () => {
        'worklet';
        if (!isClosing.value) {
            isClosing.value = true;
            position.value = withTiming(
                -screenHeight / 3,
                { duration: 500, easing: Easing.inOut(Easing.ease) },
                () => {
                    runOnJS(deleteToast)();
                }
            );
        }
    };
    useEffect(() => {
        position.value = withTiming(0, {
            duration: 800,
            easing: Easing.inOut(Easing.ease),
        });
        setTimeout(() => {
            close();
        }, 3800);
    }, []);
    return (
        <Animated.View style={containerStyle}>
            <View style={classes.container}>
                <View style={classes.infoContainer}>
                    <KwivrrIcon
                        name={toast.icon}
                        color={toast.color}
                        size={28}
                        style={classes.toastIcon}
                    />
                    <TextRegular multiline style={classes.toastText}>
                        {toast.text}
                    </TextRegular>
                </View>
                {/* <TouchableOpacity onPress={closeId} style={classes.close}>
                    <KwivrrIcon name="x" size={16} color="rgba(0, 0, 0, 0.1)" />
                </TouchableOpacity> */}
            </View>
        </Animated.View>
    );
}

export default Toast;
