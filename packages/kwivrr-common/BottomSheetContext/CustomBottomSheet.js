import React, {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity, View, Platform } from 'react-native';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import useDimensions from 'kwivrr-hooks/useDimensions';

const titles = {
    ticketManagementOptions: 'Options',
};

function CustomBottomSheet({ setBottomSheet, bottomSheetInfo }, ref) {
    const { items, type } = bottomSheetInfo;
    const snapPoints = useMemo(() => {
        const { items } = bottomSheetInfo;
        const height =
            Platform.OS === 'android'
                ? items.length * 48 + 44
                : items.length * 48 + 60;
        return ['-10%', height];
    }, [bottomSheetInfo]);
    const closeBottomSheet = useCallback(() => {
        ref.current?.close();
        setBottomSheet(false);
    }, []);
    useEffect(() => {
        ref.current?.expand();
    }, []);
    return (
        <BottomSheet
            ref={ref}
            index={-1}
            onChange={(index) => {
                if (index === 0) {
                    return setBottomSheet(false);
                }
            }}
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
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            borderBottomWidth: 2,
                            borderColor: 'rgba(0, 0, 0, 0.14)',
                        }}
                    >
                        <TextHeader size={22}>{titles[type]}</TextHeader>
                    </View>
                    {type === 'ticketManagementOptions' && items && (
                        <TicketManagementOptions
                            close={closeBottomSheet}
                            items={items}
                        />
                    )}
                </View>
            </View>
        </BottomSheet>
    );
}

const colors = ['#56A0CB', '#5D4E8A', '#C24854', '#EA5D3E', '#F0AF48'];
function TicketManagementOptions({ items, close }) {
    const { screenWidth } = useDimensions();
    const onPress = (func) => {
        func();
        close();
    };
    return (
        <>
            {items.map((_, idx) => {
                const {
                    title,
                    func,
                    payload: { item },
                } = _;
                const press = useSharedValue(0);
                const [randomIndex, setRandomIndex] = useState(0);
                const backgroundColor = useMemo(
                    () => colors[randomIndex],
                    [randomIndex]
                );
                const onPressIn = () => {
                    setRandomIndex(Math.floor(Math.random() * 5) + 1 - 1);
                    press.value = withTiming(0.2, { duration: 500 });
                };
                const onPressOut = () => (press.value = withTiming(0));
                const pressStyle = useAnimatedStyle(() => {
                    return {
                        width: screenWidth * 2,
                        height: 90,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: backgroundColor,
                        opacity: press.value,
                    };
                });
                return (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={idx}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={() => onPress(func)}
                        style={{
                            width: '100%',
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Animated.View style={pressStyle} />
                        <TextRegular style={{ paddingVertical: 14 }}>
                            {title}
                        </TextRegular>
                    </TouchableOpacity>
                );
            })}
        </>
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

export default forwardRef(CustomBottomSheet);
