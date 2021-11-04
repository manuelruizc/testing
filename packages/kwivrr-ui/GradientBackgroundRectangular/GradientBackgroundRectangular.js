import React from 'react';
import { Image } from 'react-native';

function GradientBackgroundRectangular({ style }) {
    return (
        <Image
            source={require('../../../assets/background.jpg')}
            resizeMode="cover"
            style={{width: '100%', height: '100%', position:'absolute', top: 0, left: 0, ...style}}
        />
    );
}

export default GradientBackgroundRectangular;
