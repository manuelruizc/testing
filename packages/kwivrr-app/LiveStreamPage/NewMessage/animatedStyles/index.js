import {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

const animatedStyles = ({
    animatedValues,
    bottomOffset,
    screenWidth,
    isAndroid,
}) => {
    const { bottom, container } = animatedValues;
    const containerStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            bottom: bottom.value,
            left: 0,
            // width: bottom.value === 0 ? '100%' : screenWidth,
            width: !container.value.width
                ? '100%'
                : interpolate(
                      bottom.value,
                      [0, bottomOffset],
                      [container.value.width, screenWidth],
                      Extrapolate.CLAMP
                  ),
            paddingVertical: 6,
            paddingHorizontal: interpolate(
                bottom.value,
                [0, bottomOffset],
                [0, 12],
                Extrapolate.CLAMP
            ),
            marginLeft: interpolate(
                bottom.value,
                [0, bottomOffset],
                [0, -screenWidth * 0.06],
                Extrapolate.CLAMP
            ),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
        };
    });
    return {
        containerStyle,
    };
};

export default animatedStyles;
