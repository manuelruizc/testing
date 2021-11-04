import React, { useMemo } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Touchable({
    children,
    centered = true,
    full = true,
    style = {},
    touchableStyle = {},
    onPressIn = () => {},
    onPressOut = () => {},
    anim,
    innerStyle,
    disabled,
    activeOpacity = 0.4,
    ...rest
}) {
    const animation = useSharedValue(0);
    const _onPressIn = () => {
        'worklet';
        onPressIn();
        if (anim) {
            animation.value = withTiming(1, { duration: 100 });
        }
    };
    const _onPressOut = () => {
        'worklet';
        onPressOut();
        if (anim) {
            animation.value = withTiming(0, { duration: 100 });
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            transform: [
                {
                    scale: animation.value,
                },
            ],
        };
    });

    const _touchableStyle = useMemo(() => {
        if (!Object.keys(style).length) {
            return {};
        }
        const styleObject = {};
        if (centered) {
            styleObject.justifyContent = 'center';
            styleObject.alignItems = 'center';
        }
        if ((full && style.height) || style.height) {
            styleObject.height = '100%';
        }
        if ((full && style.width) || style.width) {
            styleObject.width = '100%';
        }
        if (full && !style.width && !style.height) {
            styleObject.flex = 1;
        }
        return { ...touchableStyle, ...styleObject, ...innerStyle };
    }, [centered, style, full, touchableStyle]);
    const containerStyle = useMemo(() => {
        if (disabled) {
            return {
                ...style,
                opacity: 0.75,
            };
        }
        return style;
    }, [style, disabled]);
    return (
        <View style={containerStyle}>
            {anim && <Animated.View style={animatedStyle} />}
            <TouchableOpacity
                {...rest}
                disabled={disabled}
                onPressIn={_onPressIn}
                onPressOut={_onPressOut}
                style={_touchableStyle}
                activeOpacity={anim ? 1 : activeOpacity}
            >
                {children}
            </TouchableOpacity>
        </View>
    );
}

export default Touchable;
