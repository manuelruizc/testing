import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function(props) {
    const { style, children, ...rest } = props;
    if (!children) {
        return (
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x:1, y: 1}}
                colors={['#56A0CB', '#5D4E8A', '#C24854', '#EA5D3E', '#F0AF48']}
                style={{width: '100%', height: '100%', ...style}}
            />
        );
    }
    return (
        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x:1, y: 1}}
            colors={['#56A0CB', '#5D4E8A', '#C24854', '#EA5D3E', '#F0AF48']}
            style={{width: '100%', height: '100%', ...style}}
        >
            {children}
        </LinearGradient>
    )
}
