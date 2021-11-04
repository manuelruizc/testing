import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useStyles from 'kwivrr-hooks/useStyles';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import _orderBy from 'kwivrr-common/orderBy';
import styles from './styles';
import Body from './Body';
import Header from './Header/Header';
import { useNavigation } from '@react-navigation/native';
import { MANAGEMENT } from 'kwivrr-common/data/types/navigation';
import useInfiniteScroll from 'kwivrr-hooks/useInfiniteScroll';
import useTheme from 'kwivrr-hooks/useTheme';
import kwivrrApi from 'kwivrr-common/sdk';

function Table({
    tableData,
    listSummary,
    title,
    totalsFooter = false,
    attendee = false,
    scope,
    refreshing,
    ...rest
}) {
    const { palette } = useTheme();
    const { isLoading, fetchingOver, page, data, setData, fetchMore, refresh } =
        useInfiniteScroll({
            initialFetchingOver: !listSummary.hasMore,
            fetchCall: async () => {
                const response = await kwivrrApi.getEvents({
                    page: page + 1,
                    scope,
                });
                const toReturn = {
                    entries: response.entries,
                    hasMore: response.listSummary.hasMore,
                };
                return toReturn;
            },
            initialData: tableData,
            scope,
        });

    useEffect(() => {
        if (refreshing) {
            refresh();
        }
    }, [refreshing]);

    const { navigate } = useNavigation();
    const [orderBy, setOrderBy] = useState(null); // [key, ASC | DESC];
    const classes = useStyles(styles);
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
    const onPress = (event) => {
        return navigate(MANAGEMENT.EVENTMANAGEMENT, {
            event,
            eventId: event.id,
            isHost: !attendee,
            comingFromManagement: true,
        });
        // return navigate('HostEventManagementScreen', { event, comingFromManagement: true })
    };

    return (
        <View style={classes.tableContainer}>
            <TextHeader size={18} style={classes.tableTitle}>
                {title}
            </TextHeader>
            <View style={classes.tableItemsContainer}>
                <View style={classes.scrollViewContainer}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={classes.tableScrollView}
                    >
                        <View style={{ flex: 1 }}>
                            <Header
                                selectOrderData={selectOrderData}
                                attendee={attendee}
                                orderBy={orderBy}
                            />
                            {data.map((event, idx) => {
                                return (
                                    <Body
                                        key={idx}
                                        index={idx}
                                        event={event}
                                        attendee={attendee}
                                        onPress={onPress}
                                        {...rest}
                                        setEvents={setData}
                                    />
                                );
                            })}
                            {/* {totalsFooter && (
                            <View style={classes.row}>
                                <View style={classes.eventRow}>
                                    <TextRegular>
                                        Upcoming Stream Total
                                    </TextRegular>
                                </View>
                                <View style={classes.dateTimeRow}>
                                    <TextRegular>-</TextRegular>
                                </View>
                                <View style={classes.attendingRow}>
                                    <TextRegular>-</TextRegular>
                                </View>
                                <View style={classes.generalTicketsSoldRow}>
                                    <TextRegular>-</TextRegular>
                                </View>
                                <View style={classes.vipTicketsSoldRow}>
                                    <TextRegular>-</TextRegular>
                                </View>
                                <View style={classes.grossSalesRow}>
                                    <TextRegular>-</TextRegular>
                                </View>
                                <View style={classes.actionsRow}>
                                    <TextRegular>-</TextRegular>
                                </View>
                            </View>
                        )} */}
                        </View>
                    </ScrollView>
                </View>
                {!fetchingOver && (
                    <View style={classes.loadMoreContainer}>
                        {isLoading ? (
                            <ActivityIndicator color="tomato" size="small" />
                        ) : (
                            <TouchableOpacity onPress={fetchMore}>
                                <TextRegular color={palette.button.primary}>
                                    Load more...
                                </TextRegular>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    totalsFooter: PropTypes.bool,
    attendee: PropTypes.bool,
};

export default Table;
