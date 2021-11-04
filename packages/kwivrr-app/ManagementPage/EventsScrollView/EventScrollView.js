import React, { memo, useMemo, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import { useNavigation } from '@react-navigation/native';
import EventCard from '../EventCard';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import useDimensions from 'kwivrr-hooks/useDimensions';
import { MANAGEMENT } from 'kwivrr-common/data/types/navigation';
import kwivrrApi from 'kwivrr-common/sdk';

function EventsScrollView({
    events: apiEvents,
    listSummary,
    message = 'No registered events for this day',
    title,
    style = {},
    cardsPressable: pressable = false,
    cardPressableOptions = {
        allCardIsPressable: false,
        imagePressable: false,
        streamTitlePressable: false,
    },
    isHost = false,
    scope,
    ...rest
}) {
    const classes = useStyles(styles);
    const { screenWidth } = useDimensions();
    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [fetchingOver, setFetchingOver] = useState(!listSummary.hasMore);
    const [page, setPage] = useState(1);
    const [events, setEvents] = useState(apiEvents);

    const onEndReached = async () => {
        try {
            // console.log({ fetchingOver, isLoading });
            if (fetchingOver || isLoading) return;
            setIsLoading(true);
            const response = await kwivrrApi.getEvents({
                page: page + 1,
                scope,
            });
            const {
                listSummary: { hasMore },
            } = response;
            if (!hasMore) {
                setFetchingOver(true);
            }
            setPage((prev) => prev + 1);
            setEvents((prevEvents) => {
                return [...prevEvents, ...response.entries];
            });
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setFetchingOver(true);
            setIsLoading(false);
        }
    };

    const renderFooter = () => {
        if (!isLoading || fetchingOver) return null;
        return (
            <View style={classes.footer}>
                <ActivityIndicator size="large" color="tomato" />
            </View>
        );
    };

    const showTicketPill = useMemo(() => scope === 'registeredFor', [scope]);

    return (
        <View style={{ ...classes.container, ...style }}>
            <TextHeader style={classes.title} size={16}>
                {title}
            </TextHeader>
            {events && (
                <View style={classes.scrollViewContainer}>
                    <FlatList
                        style={classes.scrollView}
                        snapToInterval={screenWidth * 0.89}
                        snapToAlignment="center"
                        decelerationRate="fast"
                        pagingEnabled
                        horizontal
                        istKey={(item, index) => `_key${index.toString()}`}
                        showsHorizontalScrollIndicator={false}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0}
                        ListFooterComponent={renderFooter}
                        contentContainerStyle={
                            classes.scrollViewContentContainer
                        }
                        data={events}
                        // keyExtractor={({ id }) => id}
                        renderItem={({ item, index }) => {
                            if (!pressable) {
                                return (
                                    <EventCard
                                        showTicketPill={showTicketPill}
                                        event={item}
                                        setEvents={setEvents}
                                        index={index}
                                        {...rest}
                                    />
                                );
                            }
                            const { id } = item;
                            const params = {
                                eventImage: item.eventImage,
                                eventStartDatetime: item.eventStartDatetime,
                                eventName: item.eventName,
                                hostName: item.hostName,
                                hostAvatar: item.avatar,
                                comingFromManagement: true,
                                comingFrom: false,
                                event: item,
                                eventId: id,
                                isHost,
                            };
                            return (
                                <EventCard
                                    pressable={pressable}
                                    event={item}
                                    showTicketPill={showTicketPill}
                                    params={params}
                                    cardPressableOptions={cardPressableOptions}
                                    isHost={isHost}
                                    setEvents={setEvents}
                                    index={index}
                                    onPress={() =>
                                        navigate(
                                            MANAGEMENT.EVENTMANAGEMENT,
                                            params
                                        )
                                    }
                                    {...rest}
                                />
                            );
                        }}
                    />
                </View>
            )}
            {!events && (
                <TextRegular size={16} style={classes.message}>
                    {message}
                </TextRegular>
            )}
        </View>
    );
}

EventsScrollView.propTypes = {
    events: PropTypes.array,
    message: PropTypes.string,
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    cardsPressable: PropTypes.bool,
    cardPressableOptions: PropTypes.shape({
        allCardIsPressable: PropTypes.bool.isRequired,
        imagePressable: PropTypes.bool.isRequired,
        streamTitlePressable: PropTypes.bool.isRequired,
    }),
};

export default memo(EventsScrollView);
