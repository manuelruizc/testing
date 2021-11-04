import React, { useEffect, memo, useState } from 'react';
import {
    ScrollView,
    View,
    Modal,
    TouchableOpacity,
    SafeAreaView,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useStyles from 'kwivrr-hooks/useStyles';
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextHeader from 'kwivrr-ui/TextHeader';
import styles from './styles';
import useTheme from 'kwivrr-hooks/useTheme';
import TextRegular from '../TextRegular';

const InfoContainer = memo(
    ({
        children: propChildren,
        scrollViewKeyboard,
        usingScrollView,
        modalInnerStyle,
    }) => {
        const classes = useStyles(styles);
        const ScrollContainer = scrollViewKeyboard
            ? KeyboardAwareScrollView
            : ScrollView;
        if (usingScrollView) {
            return (
                <ScrollContainer
                    style={{ ...classes.scrollView }}
                    contentContainerStyle={{
                        ...classes.scrollViewContent,
                        ...modalInnerStyle,
                    }}
                    keyboardShouldPersistTaps="never"
                    enableResetScrollToCoords={false}
                    nestedScrollEnabled={true}
                >
                    {propChildren}
                </ScrollContainer>
            );
        }
        return (
            <View
                style={{ ...classes.scrollView, ...modalInnerStyle }}
                keyboardShouldPersistTaps="false"
            >
                {propChildren}
            </View>
        );
    }
);

function KwivrrModal({
    close,
    closeButton = true,
    closeButtonColor = 'rgba(0, 0, 0, 0.35)',
    title = '',
    inNavigation = false,
    containerStyle,
    children,
    usingScrollView = true,
    modalStyle = {},
    modalInnerStyle = {},
    absoluteCloseButton = false,
    scrollViewKeyboard = false,
    titleStyle = {},
    fullscreen = false,
    fullScreenContainerStyle = {},
    fullscreenSafeArea = false,
    backdropColor = 'rgba(0, 0, 0, 0.8)',
    onRequestCloseType = 'close',
    blockOnLoading = true,
    onLoadingLabel = 'Processing',
}) {
    const { device } = useTheme();
    const classes = useStyles(styles);
    const backdrop = useSharedValue(0);
    const animation = useSharedValue(0);
    const [isLoading, setIsLoading] = useState(false);
    // const {} = useDeviceActions();÷

    const closeModal = async () => {
        if (isLoading) {
            return;
        }
        await Keyboard.dismiss();
        animation.value = withTiming(0, {
            duration: 800,
        });
        backdrop.value = withDelay(
            400,
            withTiming(0, { duration: 500 }, () => {
                runOnJS(close)();
            })
        );
    };

    const unmountModal = () => {
        close();
    };

    useEffect(() => {
        backdrop.value = withTiming(1, { duration: 500 });
        animation.value = withDelay(
            200,
            withTiming(1, {
                duration: 800,
            })
        );
    }, []);

    const backdropStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: device.size.height,
            backgroundColor: backdropColor,
            opacity: backdrop.value,
        };
    });
    const sheetStyle = useAnimatedStyle(() => {
        return {
            width: '95%',
            // height: '90%',
            backgroundColor: 'white',
            borderRadius: 18,
            ...modalStyle,
            transform: [
                {
                    scaleY: interpolate(
                        animation.value,
                        [0, 0.5],
                        [0, 1],
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    });
    const infoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                animation.value,
                [0.5, 1],
                [0, 1],
                Extrapolate.CLAMP
            ),
        };
    });

    const ChildWithProps = React.Children.map(children, (child, i) => {
        // props
        return React.cloneElement(child, {
            closeModal,
            unmountModal,
            setIsLoading,
        });
    });

    const ChildContainer = fullscreenSafeArea ? SafeAreaView : View;
    const onRequestClose =
        onRequestCloseType === 'close' ? closeModal : unmountModal;

    if (fullscreen) {
        return (
            <Modal
                presentationStyle="overFullScreen"
                transparent={true}
                visible={true}
                onRequestClose={onRequestClose}
            >
                <View style={classes.containerNavigation}>
                    <Animated.View style={backdropStyle}>
                        <BackdropPressable closeModal={closeModal} />
                    </Animated.View>
                    <ChildContainer
                        style={{
                            backgroundColor: 'black',
                            ...fullScreenContainerStyle,
                            flex: 1,
                            width: '100%',
                        }}
                    >
                        {ChildWithProps}
                    </ChildContainer>
                </View>
            </Modal>
        );
    }

    return (
        <Modal
            presentationStyle="overFullScreen"
            transparent={true}
            visible={true}
            onRequestClose={onRequestClose}
        >
            <SafeAreaView style={[classes.containerNavigation, containerStyle]}>
                <Animated.View style={backdropStyle}>
                    <BackdropPressable closeModal={closeModal} />
                </Animated.View>
                <Animated.View style={sheetStyle}>
                    <View
                        style={[
                            classes.closeButtonContainer,
                            absoluteCloseButton
                                ? {
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      zIndex: 100000,
                                      elevation: 1000000,
                                  }
                                : {},
                        ]}
                    >
                        {closeButton && (
                            <TouchableOpacity onPress={closeModal}>
                                <KwivrrIcon
                                    name="x"
                                    color={closeButtonColor}
                                    size={24}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Animated.View style={infoStyle}>
                        <InfoContainer
                            scrollViewKeyboard={scrollViewKeyboard}
                            usingScrollView={usingScrollView}
                            modalInnerStyle={modalInnerStyle}
                            nestedScrollEnabled={true}
                        >
                            {title.length > 0 && (
                                <TextHeader
                                    size={18}
                                    style={{
                                        ...classes.headerTitle,
                                        paddingTop: absoluteCloseButton
                                            ? 28
                                            : 0,
                                        ...titleStyle,
                                    }}
                                >
                                    {title}
                                </TextHeader>
                            )}
                            {ChildWithProps}
                        </InfoContainer>
                    </Animated.View>
                    {isLoading && blockOnLoading && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 16,
                                }}
                            >
                                <TextRegular
                                    size={16}
                                    style={{ marginBottom: 12 }}
                                >
                                    Processing
                                </TextRegular>
                                <ActivityIndicator
                                    size="small"
                                    color="tomato"
                                />
                            </View>
                        </View>
                    )}
                </Animated.View>
            </SafeAreaView>
        </Modal>
    );
}

function BackdropPressable({ closeModal, children }) {
    const classes = useStyles(styles);
    return (
        <TouchableOpacity
            onPress={closeModal}
            style={classes.pressable}
            activeOpacity={0.1}
        >
            <View style={{ width: '100%', height: '100%' }} />
        </TouchableOpacity>
    );
}

export default memo(KwivrrModal);
