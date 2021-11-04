import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import React, { useEffect, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import TextRegular from '../TextRegular';

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

function LiveBug({
    absolute = true,
    style = {},
    onPress = null,
    fontSize = 16,
}) {
    const { navigateToAuth, userIsLogged } = useAuthCredentials();
    const bugOpacity = useSharedValue(0.2);
    const bugStyle = useMemo(() => {
        if (!absolute) {
            return {
                marginTop: 12,
                ...style,
                width: 'auto',
                height: 'auto',
                backgroundColor: '#F1201C',
                paddingVertical: 5,
                paddingHorizontal: 20,
                opacity: 1,
                borderRadius: 1000,
                justifyContent: 'center',
                alignItems: 'center',
            };
        }
        return {
            top: 12,
            right: 18,
            ...style,
            position: 'absolute',
            backgroundColor: '#F1201C',
            paddingVertical: 5,
            paddingHorizontal: 20,
            opacity: 1,
            borderRadius: 1000,
            justifyContent: 'center',
            alignItems: 'center',
        };
    });

    const loopAnimation = () => {
        animation();
    };

    const animation = () => {
        'worklet';
        bugOpacity.value = withTiming(
            bugOpacity.value === 0.4 ? 1 : 0.4,
            {
                duration: 900,
                easing: Easing.inOut(Easing.ease),
            },
            () => {
                'worklet';
                runOnJS(loopAnimation)();
            }
        );
    };
    // useEffect(() => {
    //     loopAnimation();
    // }, []);
    if (onPress) {
        const _onPress = () => {
            if (!userIsLogged) {
                return navigateToAuth();
            }
            return onPress();
        };
        return (
            <TouchableOpacity onPress={_onPress} style={bugStyle}>
                <TextRegular size={fontSize} color="white">
                    LIVE
                </TextRegular>
            </TouchableOpacity>
        );
    }
    return (
        <View style={bugStyle}>
            <TextRegular size={fontSize} color="white">
                LIVE
            </TextRegular>
        </View>
    );
}

export default LiveBug;
