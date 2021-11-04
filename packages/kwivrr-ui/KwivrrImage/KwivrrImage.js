import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import useTheme from 'kwivrr-hooks/useTheme';

function KwivrrImage({
    style,
    imageStyle = {},
    backgroundActive = false,
    includingKwivrrBackground = false,
    hasImage = false,
    ...rest
}) {
    const [loaderActive, setLoaderActive] = useState(true);
    return (
        <View style={{ ...style, imageStyle, overflow: 'hidden' }}>
            {loaderActive || backgroundActive ? <LoadingUI /> : null}
            {includingKwivrrBackground && !hasImage && (
                <Image
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    source={require('kwivrr-assets/logo/Logotype/JPG/Kwivrr_Logotype_Reverse_GradientBG.jpg')}
                    resizeMode="cover"
                />
            )}
            <Image
                {...rest}
                style={{ width: '100%', height: '100%' }}
                onLoadEnd={() => setLoaderActive(false)}
            />
        </View>
    );
}

function LoadingUI() {
    const { palette } = useTheme();
    return (
        <View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                width: '100%',
                height: '100%',
                backgroundColor: palette.placeholder,
            }}
        />
    );
}

export default KwivrrImage;
