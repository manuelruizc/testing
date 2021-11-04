import { useAnimatedStyle } from 'react-native-reanimated';

const animatedStyles = ({ animatedValues, active, OS, screenWidth }) => {
    const { barAnimated } = animatedValues;
    const barStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            bottom: OS === 'ios' ? 20 : 6,
            left: barAnimated.value,
            width: screenWidth / 4,
            height: 3,
            justifyContent: 'center',
            alignItems: 'center',
            display: active ? 'flex' : 'none',
        };
    });
    return {
        barStyle,
    };
};

export default animatedStyles;
