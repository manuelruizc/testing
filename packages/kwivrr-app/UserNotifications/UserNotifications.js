import React, { useEffect } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import useDimensions from 'kwivrr-hooks/useDimensions';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon/KwivrrIcon';
import { useDropdowns } from 'kwivrr-common/MiniModalsContext';
import headerHeight from 'kwivrr-common/headerHeight';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import Notifications from './Notifications';

function UserNotifications({ navigationRef }) {
    const { isAndroid } = usePlatform();
    const { screenWidth, screenHeight } = useDimensions();
    const { notificationsState, closeNotifications, unmountNotifications } =
        useDropdowns();
    const animationValue = useSharedValue(-screenHeight);
    const shadowRadius = useSharedValue(0);
    const topAnimation = useSharedValue(0);
    const backdrop = useSharedValue(0);
    const classes = useStyles(styles);

    useEffect(() => {
        animationValue.value = withTiming(0, {
            duration: 450,
            easing: Easing.in(Easing.ease),
        });
        topAnimation.value = withDelay(
            450,
            withTiming(-10, {
                duration: 200,
            })
        );
        shadowRadius.value = withDelay(450, withTiming(15));
        backdrop.value = withTiming(1);
    }, []);

    useEffect(() => {
        if (notificationsState.close) {
            topAnimation.value = withTiming(0, {
                duration: 200,
            });
            animationValue.value = withDelay(
                200,
                withTiming(
                    -screenHeight,
                    { duration: 450, easing: Easing.out(Easing.ease) },
                    (isFinished) => {
                        runOnJS(unmountNotifications)();
                    }
                )
            );
        }
    }, [notificationsState.close]);

    const style = useAnimatedStyle(() => {
        if (isAndroid) {
            return {
                width: screenWidth * 0.95,
                marginLeft: screenWidth * 0.025,
                height: screenHeight * 0.7,
                position: 'absolute',
                top: animationValue.value,
                marginTop: headerHeight,
                left: 0,
                backgroundColor: 'white',
                borderRadius: 18,
                elevation: 8,
            };
        }
        return {
            width: screenWidth * 0.95,
            marginLeft: screenWidth * 0.025,
            height: screenHeight * 0.7,
            position: 'absolute',
            top: animationValue.value,
            marginTop: headerHeight,
            left: 0,
            backgroundColor: 'white',
            borderRadius: 18,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.4,
            shadowRadius: shadowRadius.value,
            shadowColor: 'black',
        };
    });

    const backdropStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            opacity: backdrop.value,
        };
    });

    const styleTop = useAnimatedStyle(() => {
        return {
            top: topAnimation.value,
        };
    });

    const _closeNotifications = () => {
        animationValue.value = withTiming(
            -screenHeight,
            { duration: 450, easing: Easing.out(Easing.ease) },
            (isFinished) => {
                runOnJS(unmountNotifications)();
            }
        );
        backdrop.value = withTiming(0, { duration: 450 });
    };

    const close = () => {
        _closeNotifications();
        backdrop.value = withTiming(0);
    };

    const onRequestClose = () => {
        close();
    };

    return (
        <Modal
            presentationStyle="overFullScreen"
            transparent={true}
            visible={true}
            onRequestClose={onRequestClose}
        >
            <Animated.View style={backdropStyle}>
                <TouchableOpacity
                    onPress={close}
                    style={classes.backdropTouchable}
                >
                    <View style={classes.backdropTouchable} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={style}>
                <View style={classes.container}>
                    {/* <NotificationsContainer navigationRef={navigationRef} /> */}
                    <Notifications navigationRef={navigationRef} />
                </View>
                <Animated.View style={[classes.selector, styleTop]} />
                <TouchableOpacity
                    onPress={_closeNotifications}
                    style={classes.closeButton}
                >
                    <KwivrrIcon
                        style={classes.closeButtonIcon}
                        name="x"
                        color="rgba(0, 0, 0, 0.35)"
                        size={26}
                    />
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    );
}

export default UserNotifications;
