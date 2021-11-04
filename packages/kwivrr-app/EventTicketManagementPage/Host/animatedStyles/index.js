import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const animatedStyles = ({ animatedValues }) => {
    const { ticketsActive, overviewActive, surveysActive } = animatedValues;
    const ticketsChevronStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: withTiming(ticketsActive.value ? '0deg' : '180deg'),
                },
            ],
        };
    });
    const overviewChevronStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: withTiming(
                        overviewActive.value ? '0deg' : '180deg'
                    ),
                },
            ],
        };
    });
    const surveyChevronStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: withTiming(surveysActive.value ? '0deg' : '180deg'),
                },
            ],
        };
    });
    return { ticketsChevronStyle, overviewChevronStyle, surveyChevronStyle };
};

export default animatedStyles;
