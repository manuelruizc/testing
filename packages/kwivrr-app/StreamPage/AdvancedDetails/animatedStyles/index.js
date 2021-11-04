import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const animatedStyles = ({
    animatedValues,
    screenWidth,
    layoutDone,
    totalHeight,
    storeActive,
}) => {
    const { newSpeakerHeight, advancedActive, storeLinkHeight } =
        animatedValues;
    const advancedStyle = useAnimatedStyle(() => {
        const addedHeight = totalHeight + newSpeakerHeight.value;
        return {
            width: screenWidth,
            paddingHorizontal: 24,
            overflow: 'hidden',
            height: !layoutDone
                ? undefined
                : // : withTiming(advancedActive.value ? addedHeight : 0),
                  withTiming(
                      advancedActive.value
                          ? storeActive
                              ? totalHeight + storeLinkHeight.value
                              : totalHeight
                          : 0
                  ),
        };
    });

    return {
        advancedStyle,
    };
};

export default animatedStyles;
