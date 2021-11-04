import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const animatedStyles = ({
    animatedValues,
    totalHeight,
    screenWidth,
    layoutDone,
}) => {
    const { active, ticketsActive, ticketsHeight } = animatedValues;
    const accordionStyle = useAnimatedStyle(() => {
        return {
            width: screenWidth,
            paddingHorizontal: 24,
            overflow: 'hidden',
            // height: !layoutDone
            //     ? undefined
            //     : withTiming(
            //           active.value
            //               ? ticketsActive.value
            //                   ? totalHeight + ticketsHeight.value
            //                   : totalHeight
            //               : 0
            //       ),
            height: !layoutDone
                ? undefined
                : withTiming(active.value ? totalHeight : 0),
        };
    });
    return {
        accordionStyle,
    };
};

export default animatedStyles;
