import React from 'react';
import { Platform, Text } from 'react-native';

const FONT_WEIGHTS = ['normal'];
const DEFAULT_WEIGHT = FONT_WEIGHTS[FONT_WEIGHTS.length - 1];

function TextRegular({
    children,
    size = 14,
    color = 'black',
    weight = DEFAULT_WEIGHT,
    style = {},
    ...rest
}) {
    const fontWeight = FONT_WEIGHTS.includes(weight) ? weight : DEFAULT_WEIGHT;
    const fontSize = Platform.OS === 'android' ? size - 2 <= 0 ? size : size - 2 : size;
    const textStyle = {
        color,
        fontWeight,
        fontFamily: 'Rubik-Light',
        fontSize
    };

    return (
        <Text
            style={[style, textStyle]}
            {...rest}
        >
            {children}
        </Text>
    )
}

export default TextRegular;
