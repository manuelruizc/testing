import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrImage from '../KwivrrImage';
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

function LoadingUI({ color = '#EA5D3E', style = {} }) {
    const classes = useStyles(styles);
    const animation = useSharedValue(1);
    const rotated = useSharedValue(false);
    const fireAnimation = () => {
        animation.value = withTiming(
            animation.value === 1 ? 0.3 : 1,
            { duration: 960 },
            () => {
                if (animation.value === 0.3) {
                    rotated.value = !rotated.value;
                }
                runOnJS(fireAnimation)();
            }
        );
    };
    useEffect(() => {
        fireAnimation();
    }, []);
    const animStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                animation.value,
                [0.3, 1],
                [0, 1],
                Extrapolate.CLAMP
            ),
            transform: [
                {
                    scale: animation.value,
                },
                // {
                //     rotate: rotated.value ? '180deg' : '0deg',
                // },
            ],
        };
    });

    return (
        <View style={{ ...classes.container, ...style }}>
            <Animated.View style={animStyle}>
                <KwivrrImage
                    style={{ width: 120, height: 120 }}
                    resizeMode="contain"
                    source={require('kwivrr-assets/logo/Icon/PNG/Kwivrr_Icon_4C.png')}
                />
            </Animated.View>
        </View>
    );
}

export default LoadingUI;
