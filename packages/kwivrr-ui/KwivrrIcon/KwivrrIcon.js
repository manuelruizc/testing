import React from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

function KwivrrIcon({ name = 'home', size = 22, color = 'black', style = {} }) {
    const fontSize = Platform.OS === 'ios' ? size : size - 4;
    if (name.startsWith('logo-')) {
        return (
            <MaterialCommunityIcons
                style={style}
                name={name.substr(5)}
                size={fontSize}
                color={color}
            />
        );
    }
    return <Feather style={style} name={name} size={fontSize} color={color} />;
}

export default KwivrrIcon;
