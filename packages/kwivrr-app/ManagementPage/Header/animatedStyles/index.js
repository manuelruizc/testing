import { useAnimatedStyle } from 'react-native-reanimated';

const animatedStyles = ({ animatedValues, screenWidth }) => {
    const { selector } = animatedValues;
    const bottomBarStyle = useAnimatedStyle(() => {
        return {
            width: screenWidth / 3,
            height: 3,
            position: 'absolute',
            bottom: 14,
            left: (screenWidth / 3) * (selector.value / screenWidth),
            justifyContent: 'center',
            alignItems: 'center',
        };
    });
    return { bottomBarStyle };
};

export default animatedStyles;
