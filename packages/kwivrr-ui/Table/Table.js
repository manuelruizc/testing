import React, { memo, useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
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
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import { priceFormatting } from 'kwivrr-common/priceFormatter';

function Table({
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
    ...rest
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
        return data;
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
                            attendee={attendee}
                            orderBy={orderBy}
                            data={data}
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
                                    {...rest}
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
                    if (button) {
                        return (
                            <TouchableOpacity
                                key={_key}
                                onPress={() => selectOrderData(_key)}
                                style={importedClasses[styling]}
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
                    }
                    return (
                        <View key={_key} style={importedClasses[styling]}>
                            <TextHeader style={classes.text} size={16}>
                                {label}
                            </TextHeader>
                        </View>
                    );
                })}
            </View>
        );
    }
);

const colors = ['#56A0CB', '#5D4E8A', '#C24854', '#EA5D3E', '#F0AF48'];

const keyValue = (key, item) => {
    if (key === 'purchasedDatetime') {
        return defaultDateFormat(item[key]);
    }
    if (key === 'ticketType') {
        const type = item[key];
        if (type === 'vip') return 'VIP';
        return type.length > 1 ? type[0].toUpperCase() + type.substr(1) : type;
    }
    if (key === 'price') {
        return '$' + priceFormatting(item[key]);
    }
    return item[key];
};

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

        if (pressableItems) {
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
                                    {keyValue(key, item)}
                                </TextRegular>
                            </View>
                        );
                    })}
                </TouchableWithoutFeedback>
            );
        }
        return (
            <View style={[classes.row, style]}>
                {headers.map((header, idx) => {
                    const { styling, key } = header;
                    return (
                        <View key={key} style={importedClasses[styling]}>
                            <TextRegular style={classes.text}>
                                {keyValue(key, item)}
                            </TextRegular>
                        </View>
                    );
                })}
            </View>
        );
    }
);

export default Table;
