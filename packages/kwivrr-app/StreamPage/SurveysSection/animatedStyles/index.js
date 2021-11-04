import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const animatedStyles = ({
    animatedValues,
    totalHeight,
    screenWidth,
    layoutDone,
}) => {
    const { active, surveysHeight } = animatedValues;
    const style = useAnimatedStyle(() => {
        const addedHeight = totalHeight + surveysHeight.value;
        return {
            width: screenWidth,
            paddingHorizontal: 24,
            overflow: 'hidden',
            height: !layoutDone
                ? undefined
                : withTiming(active.value ? addedHeight : 0),
        };
    });
    return {
        style,
    };
};

export default animatedStyles;
