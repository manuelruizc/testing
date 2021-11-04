import React, { memo, useCallback, useMemo, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useStyles from 'kwivrr-hooks/useStyles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import _orderBy from 'kwivrr-common/orderBy';
import styles from './styles';
import {
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

function KwivrrTable({
    data,
    attendee = false,
    headers = null,
    body = null,
    classes: importedClasses = {},
    style = {},
    title = '',
    headerRowStyle = {},
    dataRowStyle = {},
    onLongPress = null,
    pressableItems = null,
}) {
    const [orderBy, setOrderBy] = useState(null); // [key, ASC | DESC];
    const { screenWidth } = useDimensions();
    const selectOrderData = useCallback(
        (key) => {
            const defaultOrder = 'ASC';
            if (!orderBy) {
                setOrderBy([key, defaultOrder]);
                return;
            }
            const [stateKey, stateOrder] = orderBy;
            const newOrder = !orderBy
                ? defaultOrder
                : key === stateKey
                ? stateOrder === 'ASC'
                    ? 'DESC'
                    : !stateOrder
                    ? defaultOrder
                    : null
                : defaultOrder;
            setOrderBy([key, newOrder]);
        },
        [orderBy, setOrderBy]
    );

    const orderedData = useMemo(() => {
        if (!data) return null;
        if (!orderBy) return data;
        const [key, order] = orderBy;
        if (!order) return data;
        let jejeData = data;
        const newData = _orderBy(jejeData, [key], [order.toLowerCase()]);
        return newData;
    }, [data, orderBy]);

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                ...style,
            }}
        >
            {title.length > 0 && (
                <TextHeader
                    size={18}
                    style={{ paddingLeft: 18, paddingVertical: 16 }}
                >
                    {title}
                </TextHeader>
            )}
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={{ flex: 1 }}
                >
                    <View>
                        <Header
                            selectOrderData={selectOrderData}
                            // attendee={attendee}
                            orderBy={orderBy}
                            // data={data}
                            headers={headers}
                            classes={importedClasses}
                            style={headerRowStyle}
                        />
                        {orderedData &&
                            orderedData.map((item, idx) => (
                                <Body
                                    idx={idx}
                                    key={idx}
                                    item={item}
                                    headers={headers}
                                    classes={importedClasses}
                                    style={dataRowStyle}
                                    onLongPress={onLongPress}
                                    pressableItems={pressableItems}
                                />
                            ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const Header = memo(
    ({
        attendee,
        selectOrderData,
        orderBy,
        data,
        headers,
        classes: importedClasses,
        style,
    }) => {
        const classes = useStyles(styles);
        const { screenWidth } = useDimensions();
        return (
            <View style={[classes.headerRow, style]}>
                {headers.map(({ key: _key, label, styling, button }) => {
                    const iconName = useMemo(() => {
                        if (!orderBy) return 'align-justify';
                        const [key, order] = orderBy;
                        if (!order) return 'align-justify';
                        if (_key !== key) {
                            return 'align-justify';
                        }
                        if (order === 'ASC') return 'chevron-up';
                        return 'chevron-down';
                    }, [orderBy]);
                    return (
                        <TouchableOpacity
                            key={_key}
                            onPress={() => selectOrderData(_key)}
                            // style={importedClasses[styling]}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                width: screenWidth * 0.54,
                                paddingVertical: 12,
                            }}
                        >
                            <TextHeader
                                style={{ ...classes.text, marginRight: 12 }}
                                size={16}
                            >
                                {label}
                            </TextHeader>
                            <KwivrrIcon
                                name={iconName}
                                color={
                                    iconName !== 'align-justify'
                                        ? 'black'
                                        : 'transparent'
                                }
                            />
                        </TouchableOpacity>
                    );
                    // return (
                    //     <View
                    //         key={_key}
                    //         style={{
                    //             flexDirection: 'row',
                    //             justifyContent: 'flex-start',
                    //             alignItems: 'center',
                    //             paddingHorizontal: 18,
                    //             paddingVertical: 12,
                    //         }}
                    //     >
                    //         <TextHeader style={classes.text} size={16}>
                    //             {label}
                    //         </TextHeader>
                    //     </View>
                    // );
                })}
            </View>
        );
    }
);

const colors = ['#56A0CB', '#5D4E8A', '#C24854', '#EA5D3E', '#F0AF48'];
const Body = memo(
    ({
        item,
        headers,
        classes: importedClasses,
        onLongPress = null,
        pressableItems = null,
        style,
        idx,
    }) => {
        const { screenWidth } = useDimensions();
        const itemToIterate = useMemo(() => {
            if (!item) return [];
            return Object.keys(item);
        }, [item]);
        const classes = useStyles(styles);
        const press = useSharedValue(0);
        const [randomIndex, setRandomIndex] = useState(0);
        const backgroundColor = useMemo(
            () => colors[randomIndex],
            [randomIndex]
        );
        const onPressIn = () => {
            setRandomIndex(Math.floor(Math.random() * 5) + 1 - 1);
            press.value = withTiming(1, { duration: 500 });
        };
        const onPressOut = () => {
            press.value = withTiming(0);
        };
        const pressStyling = useAnimatedStyle(() => {
            return {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor,
                opacity: interpolate(
                    press.value,
                    [0, 1],
                    [0, 0.15],
                    Extrapolate.CLAMP
                ),
                // transform: [{scaleX: press.value}]
            };
        });
        if (false) {
            return (
                <TouchableWithoutFeedback
                    delayLongPress={500}
                    onLongPress={() => {
                        onLongPress({ index: idx, item });
                        Haptics.selectionAsync();
                    }}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    style={[classes.row, style]}
                >
                    <Animated.View style={pressStyling} />
                    {headers.map((header, idx) => {
                        const { styling, key } = header;
                        return (
                            <View key={key} style={importedClasses[styling]}>
                                <TextRegular style={classes.text}>
                                    {item[key]}
                                </TextRegular>
                            </View>
                        );
                    })}
                </TouchableWithoutFeedback>
            );
        }
        return (
            <View style={[classes.row, style]}>
                {itemToIterate.length > 0 &&
                    itemToIterate.map((key, idx) => {
                        return (
                            <View
                                key={key}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: screenWidth * 0.54,
                                    paddingVertical: 12,
                                }}
                            >
                                <TextRegular style={classes.text}>
                                    {item[key]}
                                </TextRegular>
                            </View>
                        );
                    })}
            </View>
        );
    }
);

export default KwivrrTable;
