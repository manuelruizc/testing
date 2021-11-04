import React, { forwardRef, useEffect } from 'react';
import { Button, Platform, View } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

function Picker(props, ref) {
    if (Platform.OS === 'ios') {
        const { ...rest } = props;
        return <IOSPicker ref={ref} {...rest} />
    }
    const {
        pickerState,
        style,
        mode,
        onValueChange
    } = props;
    const [value, setValue] = pickerState;
    return (
        <RNPicker
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
            style={style}
            mode={mode}
            onValueChange={onValueChange}
        >
            {props.items.map((item, idx) => {
                return (
                    <RNPicker.Item
                        key={idx}
                        label={item}
                        value={item}
                    />
                );
            })}
        </RNPicker>
    )
}

const IOSPicker = forwardRef((props, ref) => {
    const {
        pickerState,
        items,
        onConfirmLabel = 'Confirm',
        onCancelLabel,
        onConfirm
    } = props;
    const [value, setValue] = pickerState;
    
    const container = useSharedValue(0);
    const shared = useSharedValue(0);
    useEffect(() => {
        container.value = withTiming(1);
        shared.value = withDelay(150,
            withTiming(1)
        );
    }, [])

    const closePicker = () => {
        shared.value = withTiming(0);
        container.value = withDelay(150,
            withTiming(0, {}, () => {
                runOnJS(props.setPickerActive)(false)
            })
        );
    }

    const style = useAnimatedStyle(() => {
        return {
            width: '100%',
            transform: [
                {
                    translateY: interpolate(
                        shared.value,
                        [0, 1],
                        [200, 0]
                    )
                }
            ],
            zIndex: 100000
        }
    });
    const containerStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            botttom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            opacity: container.value
        }
    });
    return (
        <Animated.View style={containerStyle}>
            <Animated.View style={style}>
                <View style={{width: '100%', height:40, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.05)', flexDirection: 'row', alignItems: 'center', justifyContent: onCancelLabel ? 'space-between' : 'flex-end', paddingHorizontal: 18}}>
                    {onCancelLabel && <Button title={onCancelLabel} onPress={closePicker} />}
                    <Button title={onConfirmLabel} onPress={() => {
                        onConfirm();
                        closePicker();
                    }} />
                </View>
                <RNPicker
                    style={{height:140, width: '100%', backgroundColor: 'white'}}
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
                >
                    {items.map((item, idx) => (
                        <RNPicker.Item
                            key={idx}
                            label={item}
                            value={item}
                        />
                    ))}
                </RNPicker>
            </Animated.View>
        </Animated.View>
    )
})

export default forwardRef(Picker);
