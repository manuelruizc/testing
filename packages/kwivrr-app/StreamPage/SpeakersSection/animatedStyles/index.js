import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const animatedStyles = ({
    animatedValues,
    totalHeight,
    screenWidth,
    layoutDone,
}) => {
    const { active, newSpeakerHeight } = animatedValues;
    const style = useAnimatedStyle(() => {
        const addedHeight = totalHeight + newSpeakerHeight.value;
        return {
            width: screenWidth,
            paddingHorizontal: 24,
            overflow: active.value ? 'visible' : 'hidden',
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
