import React from 'react';
import { StyleSheet, Text } from 'react-native';

function TextSubHeader({
    children,
    size = 14,
    color = 'black',
    style = {},
    ...rest
}) {
    const fontSize = Platform.OS === 'android' ? size - 2 <= 0 ? size : size - 2 : size;
    const textStyle = {
        color,
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

export default TextSubHeader;
