import React from 'react';
import { Text } from 'react-native';

function TextHeader({
    children,
    size = 14,
    color = 'black',
    style = {},
    ...rest
}) {
    const fontSize = Platform.OS === 'android' ? size - 2 <= 0 ? size : size - 2 : size;
    const textStyle = {
        color,
        fontWeight: 'bold',
        fontFamily: 'Rubik-Bold',
        fontSize
    };

    return (
        <Text
            style={[{...style}, textStyle]}
            {...rest}
        >
            {children}
        </Text>
    )
}

export default TextHeader;
