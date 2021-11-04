import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextHeader from 'kwivrr-ui/TextHeader';
import TicketPill from 'kwivrr-ui/TicketPill';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import EventActions from 'kwivrr-common/EventActions';
import { useNavigation } from '@react-navigation/native';
import { HOME, MANAGEMENT, STACKS } from 'kwivrr-common/data/types/navigation';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import CloneEventModal from 'kwivrr-ui/CloneEventModal';
import useAppActions from 'kwivrr-hooks/useAppActions';
import useConfirmModal from 'kwivrr-hooks/useConfirmModal';
import useActions from 'kwivrr-hooks/useActions';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function EventCard({
    event,
    cardPressableOptions = {
        allCardIsPressable: false,
        imagePressable: false,
        streamTitlePressable: false,
    },
    params,
    isHost,
    onPress = null,
    showTicketPill = false,
    setEvents,
    index,
    fromCalendar,
}) {
    const { allCardIsPressable, imagePressable, streamTitlePressable } =
        cardPressableOptions;
    const classes = useStyles(styles);
    const {
        id,
        title: name,
        eventImageUrl,
        startDate,
        hasGeneralTicketsRemaining,
        hasVipTicketsRemaining,
        generalTicketPrice,
        vipTicketPrice,
        userTicketsCount,
        generalTicketCount,
        vipTicketCount,
        shareUrl,
    } = event;

    const ticketCount = generalTicketCount + vipTicketCount;
    const [modal, setModal] = useState(false);

    let Container = onPress && allCardIsPressable ? TouchableOpacity : View;
    let pressableProps = onPress ? { onPress, activeOpacity: 0.7 } : {};
    const { openModal } = useShareModal();
    const { onDeleteEvent } = useActions();
    const { navigate, goBack } = useNavigation();
    const { addNewEvent } = useAppActions();
    const { openConfirmModal } = useConfirmModal();
    const onTicketPillPress = () => {
        return navigate(STACKS.MANAGEMENT, {
            params: {
                ...params,
                comingFromManagement: true,
                eventId: id,
            },
            screen: MANAGEMENT.EVENTMANAGEMENT,
        });
    };

    const editEvent = () => {
        return navigate(MANAGEMENT.EDIT_EVENT, { eventId: id });
    };

    const onDeleteEventAction = async () => {
        try {
            const response = await onDeleteEvent({ id: id });
            addNewEvent(fromCalendar ? 'CalendarView' : 'CardView', 'delete');
            setEvents((prevEvents) => {
                return prevEvents.filter(
                    (_, eventIndex) => eventIndex !== index
                );
            });
            Alert.alert('Event deleted', 'The event was deleted successfully.');
        } catch (e) {
            Alert.alert(
                'Error',
                'There was an error trying to delete this event.'
            );
        }
    };

    const deleteEvent = () => {
        openConfirmModal(
            [
                'Are you sure you want to delete this event? This cannot be undone.',
                'Cancel',
                'Confirm',
            ],
            onDeleteEventAction,
            []
        );
    };

    const onPressTitle = () => {
        navigate(HOME.SPLASH, {
            eventId: id,
        });
    };

    return (
        <Container style={classes.container} {...pressableProps}>
            {(allCardIsPressable || !imagePressable) && (
                <KwivrrImage
                    source={{ uri: imageSourceWithoutCache(image) }}
                    resizeMode="cover"
                    style={classes.image}
                    includingKwivrrBackground
                />
            )}
            {!allCardIsPressable && imagePressable && (
                <TouchableOpacity style={classes.image} {...pressableProps}>
                    <KwivrrImage
                        source={{ uri: imageSourceWithoutCache(eventImageUrl) }}
                        resizeMode="cover"
                        style={classes.fullImage}
                        includingKwivrrBackground
                    />
                </TouchableOpacity>
            )}
            <View style={classes.bottomInfoContainer}>
                <View style={classes.topInfo}>
                    {(allCardIsPressable || !streamTitlePressable) && (
                        <TextHeader
                            numberOfLines={1}
                            ellipsizeMode="middle"
                            style={classes.streamTitle}
                        >
                            {name}
                        </TextHeader>
                    )}
                    {!allCardIsPressable && streamTitlePressable && (
                        <TouchableOpacity
                            style={classes.streamTitle}
                            {...pressableProps}
                            onPress={onPressTitle}
                        >
                            <TextHeader
                                numberOfLines={1}
                                ellipsizeMode="middle"
                                style={classes.eventName}
                            >
                                {name}
                            </TextHeader>
                        </TouchableOpacity>
                    )}
                    {showTicketPill ? (
                        <View style={classes.ticketPill}>
                            <TicketPill
                                onPress={onTicketPillPress}
                                status
                                tickets={userTicketsCount}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    openModal({
                                        eventName: name,
                                        eventImage: eventImageUrl,
                                        eventStartDatetime:
                                            defaultDateFormat(startDate),
                                        eventId: id,
                                        shareUrl,
                                    })
                                }
                            >
                                <KwivrrIcon
                                    name="upload"
                                    color="#5A70B3"
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={classes.actions}>
                            <EventActions
                                action="share"
                                onPress={() =>
                                    openModal({
                                        eventName: name,
                                        eventImage: eventImageUrl,
                                        eventStartDatetime:
                                            defaultDateFormat(startDate),
                                        shareUrl,
                                    })
                                }
                                iconSize={18}
                            />
                            <EventActions
                                onPress={editEvent}
                                action="edit"
                                iconSize={18}
                            />
                            <EventActions
                                onPress={() => setModal(true)}
                                action="clone"
                                iconSize={18}
                            />
                            {event.isDeleteable && (
                                <EventActions
                                    onPress={deleteEvent}
                                    action="delete"
                                    iconSize={18}
                                />
                            )}
                        </View>
                    )}
                </View>
                <TextRegular style={classes.dateTime}>
                    {defaultDateFormat(startDate)}
                </TextRegular>
            </View>
            {modal && (
                <KwivrrModal title="Clone Event" close={() => setModal(false)}>
                    <CloneEventModal eventId={id} />
                </KwivrrModal>
            )}
        </Container>
    );
}

EventCard.propTypes = {
    event: PropTypes.object.isRequired,
    cardPressableOptions: PropTypes.shape({
        allCardIsPressable: PropTypes.bool.isRequired,
        imagePressable: PropTypes.bool.isRequired,
        streamTitlePressable: PropTypes.bool.isRequired,
    }),
    onPress: PropTypes.func,
};

export default EventCard;
