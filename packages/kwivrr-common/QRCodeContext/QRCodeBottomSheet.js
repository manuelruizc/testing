import React, { forwardRef, useEffect, useMemo } from 'react';
import { View, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedProps,
    useAnimatedStyle,
} from 'react-native-reanimated';

function QRCodeBottomSheet({ qrCode }, ref) {
    const snapPoints = useMemo(() => ['-10%', '50%'], []);
    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            style={{
                elevation: 5,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                shadowColor: 'black',
            }}
            backdropComponent={CustomBackdrop}
        >
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 12,
                }}
            >
                <Image
                    source={{ uri: qrCode }}
                    style={{ width: '80%', height: '80%' }}
                    resizeMode="contain"
                />
                <TouchableOpacity
                    onPress={() => ref.current?.close()}
                    style={{ marginBottom: 18 }}
                >
                    <KwivrrIcon name="x" size={26} />
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
}

function CustomBackdrop({ animatedIndex, style }) {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 0.5],
            Extrapolate.CLAMP
        ),
    }));

    const animatedProps = useAnimatedProps(() => {
        const bottomSheetIsActive = animatedIndex.value === 1;
        const pointerEvents = bottomSheetIsActive ? 'auto' : 'none';
        return {
            pointerEvents,
        };
    });

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: 'black',
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <Animated.View {...{ animatedProps }} style={containerStyle} />;
}

export default forwardRef(QRCodeBottomSheet);
