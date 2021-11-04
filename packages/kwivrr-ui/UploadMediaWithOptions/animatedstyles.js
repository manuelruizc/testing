import {
    useAnimatedStyle,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

const animatedstyles = ({
    animatedValues,
    size,
    backgroundColor,
    selecting,
}) => {
    const { active } = animatedValues;
    const styleCamera = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: withTiming(active.value ? -(size + 4) : 0),
            right: 0,
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ scale: withTiming(active.value ? 1 : 0) }],
            opacity: selecting ? 0.7 : withTiming(active.value ? 1 : 0.5),
        };
    });
    const styleGallery = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: withDelay(
                80,
                withTiming(active.value ? -((size + 4) * 2) : 0)
            ),
            justifyContent: 'center',
            alignItems: 'center',
            right: 0,
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor,
            transform: [
                { scale: withDelay(80, withTiming(active.value ? 1 : 0)) },
            ],
            opacity: selecting
                ? 0.7
                : withDelay(80, withTiming(active.value ? 1 : 0.5)),
        };
    });
    const closeIcon = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            transform: [
                {
                    scale: withTiming(active.value ? 1 : 0),
                },
            ],
        };
    });
    const uploadIcon = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(active.value ? 0 : 1),
                },
            ],
        };
    });
    return {
        closeIcon,
        uploadIcon,
        styleCamera,
        styleGallery,
    };
};

export default animatedstyles;
