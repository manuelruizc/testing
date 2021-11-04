import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import useDimensions from 'kwivrr-hooks/useDimensions';
import KwivrrGradient from 'kwivrr-ui/KwivrrGradient';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

function SplashScreen({ assetsLoaded, setAssetsLoaded }) {
    const { screenWidth } = useDimensions();
    const scale = useSharedValue(1);
    const enterAnimation = () => {
        'worklet';
        scale.value = withSequence(
            withTiming(0.85, { duration: 200, easing: Easing.linear }),
            withTiming(300, { duration: 400, easing: Easing.linear }, () => {
                runOnJS(JSLoaded)();
            })
        );
    };
    const JSLoaded = () => {
        setAssetsLoaded((prev) => ({
            ...prev,
            loaded: true,
        }));
    };
    useEffect(() => {
        if (assetsLoaded.loadAssetsFromSplash) {
            setTimeout(() => {
                enterAnimation();
            }, 1300);
        }
    }, [assetsLoaded.loadAssetsFromSplash]);
    const logoStyle = useAnimatedStyle(() => {
        return {
            width: screenWidth * 0.5,
            height: screenWidth * 0.5,
            transform: [{ scale: scale.value }],
        };
    });
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <KwivrrGradient style={{ position: 'absolute', top: 0, left: 0 }} />
            <Animated.View style={logoStyle}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                    source={require('kwivrr-assets/logo/KwivrrBetaLogoVertical.png')}
                />
            </Animated.View>
        </View>
    );
}

SplashScreen.propTypes = {
    assetsLoaded: PropTypes.shape({
        loaded: PropTypes.bool.isRequired,
        loadAssetsFromSplash: PropTypes.bool.isRequired,
    }).isRequired,
    setAssetsLoaded: PropTypes.func.isRequired,
};

export default SplashScreen;
