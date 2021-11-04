import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const animatedStyles = ({ animatedValues }) => {
    const {
        goLiveShared,
        advancedActive,
        detailsActive,
        speakersActive,
        surveysActive,
        schedulingAndTicketingActive,
    } = animatedValues;
    const goLiveStyle = useAnimatedStyle(() => {
        return {
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 18,
            transform: [
                {
                    scale: goLiveShared.value,
                },
            ],
        };
    });
    const detailsChevronStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: withTiming(detailsActive.value ? '0deg' : '180deg'),
                },
            ],
        };
    });
    const schedulingAndTicketingChevronStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: withTiming(
                        schedulingAndTicketingActive.value ? '0deg' : '180deg'
                    ),
                },
            ],
        };
    });
    const speakersChevronStyle = useAnimatedStyle(() => {
        return {
            zIndex: -1,
            transform: [
                {
                    rotate: withTiming(
                        speakersActive.value ? '0deg' : '180deg'
                    ),
                },
            ],
        };
    });
    const surveysChevronStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: withTiming(surveysActive.value ? '0deg' : '180deg'),
                },
            ],
        };
    });

    const advancedChevronStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: withTiming(
                        advancedActive.value ? '0deg' : '180deg'
                    ),
                },
            ],
        };
    });
    return {
        detailsChevronStyle,
        advancedChevronStyle,
        schedulingAndTicketingChevronStyle,
        speakersChevronStyle,
        surveysChevronStyle,
        goLiveStyle,
    };
};

export default animatedStyles;
