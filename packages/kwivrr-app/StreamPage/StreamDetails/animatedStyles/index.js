import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const animatedStyles = ({
    animatedValues,
    totalHeight,
    screenWidth,
    layoutDone,
    providerActive,
}) => {
    const { detailsActive, providerHeight } = animatedValues;
    const detailsStyle = useAnimatedStyle(() => {
        return {
            width: screenWidth,
            paddingHorizontal: 24,
            overflow: 'hidden',
            height: !layoutDone
                ? undefined
                : withTiming(
                      detailsActive.value
                          ? providerActive
                              ? totalHeight + providerHeight.value
                              : totalHeight
                          : 0
                  ),
        };
    });
    return {
        detailsStyle,
    };
};

export default animatedStyles;
