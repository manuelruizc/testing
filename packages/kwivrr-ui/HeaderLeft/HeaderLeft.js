import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { HOME } from 'kwivrr-common/data/types/navigation';

function HeaderLeft() {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigate(HOME.INITIAL)}
            style={{
                width: 120,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 12,
            }}
        >
            <Image
                fadeDuration={0}
                source={require('kwivrr-assets/logo/KwivrrBetaLogoHorizontal.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
}

export default HeaderLeft;
