import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const animatedStyles = ({
    animatedValues,
    totalHeight,
    screenWidth,
    layoutDone,
}) => {
    const { active, ticketsActive, ticketsHeight } = animatedValues;
    const style = useAnimatedStyle(() => {
        const height = active.value
            ? ticketsHeight.value > 0
                ? totalHeight + ticketsHeight.value
                : totalHeight
            : 0;
        return {
            width: screenWidth,
            paddingHorizontal: 24,
            overflow: 'hidden',
            height: !layoutDone ? undefined : withTiming(height),
        };
    });
    return {
        style,
    };
};

export default animatedStyles;
