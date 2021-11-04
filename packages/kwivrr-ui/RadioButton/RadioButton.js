import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import TextRegular from '../TextRegular';

function RadioButton({
    size = 12,
    selected = false,
    label = null,
    subLabel = null,
    style = {},
    buttonStyle = {},
    labelStyle = {},
    labelSize = 14,
    onPress = () => {},
    selectedItem = null,
}) {
    const classes = useStyles(styles);
    const selectedContainer = useSharedValue(selected ? 1 : 0);
    const selectedChild = useSharedValue(selected ? 1 : 0);
    const selectedContainerStyle = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: '100%',
            backgroundColor: '#3551A1',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: selectedContainer.value,
        };
    });
    const selectedChildStyle = useAnimatedStyle(() => {
        return {
            width: size / 2.5,
            height: size / 2.5,
            borderRadius: size / 2.5,
            backgroundColor: '#FFFFFF',
            transform: [
                {
                    scale: selectedChild.value,
                },
            ],
        };
    });

    useEffect(() => {
        if (selected) {
            selectedContainer.value = withTiming(1, {
                duration: 200,
                easing: Easing.inOut(Easing.ease),
            });
            selectedChild.value = withDelay(
                150,
                withTiming(1, {
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                })
            );
        } else {
            selectedChild.value = withTiming(0, {
                duration: 200,
                easing: Easing.inOut(Easing.ease),
            });
            selectedContainer.value = withDelay(
                150,
                withTiming(0, {
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                })
            );
        }
    }, [selected]);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...classes.container, ...style }}
        >
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                    backgroundColor: '#CCCCCC',
                    ...buttonStyle,
                    overflow: 'hidden',
                }}
            >
                <Animated.View style={selectedContainerStyle}>
                    {!selectedItem ? (
                        <Animated.View style={selectedChildStyle} />
                    ) : (
                        selectedItem
                    )}
                </Animated.View>
            </View>
            {label && !subLabel && (
                <TextRegular size={labelSize} style={labelStyle}>
                    {label}
                </TextRegular>
            )}
            {label && subLabel && (
                <View style={{ flex: 1 }}>
                    <TextRegular size={labelSize} style={labelStyle}>
                        {label}
                    </TextRegular>
                    <TextRegular
                        size={labelSize}
                        numberOfLines={2}
                        color={'rgba(0, 0, 0, 0.7)'}
                    >
                        {subLabel}
                    </TextRegular>
                </View>
            )}
        </TouchableOpacity>
    );
}

export default RadioButton;
