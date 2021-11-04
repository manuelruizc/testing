import React, { memo, useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import EventActions from 'kwivrr-common/EventActions';
import TicketPill from 'kwivrr-ui/TicketPill';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import { useNavigation } from '@react-navigation/native';
import { STACKS, MANAGEMENT, HOME } from 'kwivrr-common/data/types/navigation';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import { priceFormatting } from 'kwivrr-common/priceFormatter';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import CloneEventModal from 'kwivrr-ui/CloneEventModal';
import useActions from 'kwivrr-hooks/useActions';
import useAppActions from 'kwivrr-hooks/useAppActions';
import useConfirmModal from 'kwivrr-hooks/useConfirmModal';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function Body({ event, setEvents, index, attendee, onPress = () => {} }) {
    const {
        id,
        startDate,
        attendant,
        vipTicketsSold,
        eventImageUrl,
        totalTicketsSold,
        totalTicketSales,
        userTicketsCount,
        generalTicketsSold,
        title: name,
        isFree,
        host,
        hostName,
        shareUrl,
        // attributes: { name },
    } = event;

    const classes = useStyles(styles);
    const _onPress = () => onPress(event);
    const [modal, setModal] = useState(false);
    const { openModal: _openShareModal } = useShareModal();
    const openShareModal = () => {
        _openShareModal({
            startDate,
            eventName: name,
            eventImage: eventImageUrl,
            eventId: id,
            shareUrl,
        });
    };
    const { onDeleteEvent } = useActions();
    const { openConfirmModal } = useConfirmModal();
    const { addNewEvent } = useAppActions();
    const { navigate } = useNavigation();
    const onTicketPillPress = () => {
        const params = {
            eventImage: event.eventImage,
            eventStartDatetime: event.startDate,
            eventName: name,
            hostName: event.hostName,
            hostAvatar: event.avatar,
            comingFromManagement: true,
            event,
            comingFrom: false,
            eventId: id,
        };
        return navigate(STACKS.MANAGEMENT, {
            params,
            screen: MANAGEMENT.EVENTMANAGEMENT,
        });
    };

    const editEvent = () => {
        return navigate(MANAGEMENT.EDIT_EVENT, { eventId: id });
    };

    const onDeleteEventAction = async () => {
        try {
            const response = await onDeleteEvent({ id: id });
            addNewEvent('ListView', 'delete');
            setEvents((prevEvents) => {
                const newEvents = prevEvents.filter((_, eventIndex) => {
                    return eventIndex !== index;
                });
                return [...newEvents];
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

    const goToSplashScreen = () => {
        navigate(HOME.SPLASH, {
            eventId: id,
        });
    };

    if (attendee) {
        return (
            <View style={classes.row}>
                <View style={classes.eventRow}>
                    <TouchableOpacity
                        style={classes.eventRowImage}
                        onPress={_onPress}
                    >
                        <KwivrrImage
                            source={{
                                uri: imageSourceWithoutCache(eventImageUrl),
                            }}
                            resizeMode="cover"
                            style={classes.imageFull}
                            includingKwivrrBackground
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={classes.eventName}
                        onPress={goToSplashScreen}
                    >
                        <TextRegular
                            numberOfLines={1}
                            // style={classes.eventName}
                            ellipsizeMode="tail"
                        >
                            {name}
                        </TextRegular>
                    </TouchableOpacity>
                </View>
                <View style={classes.hostRow}>
                    <TextRegular>{hostName}</TextRegular>
                </View>
                <View style={classes.dateTimeRow}>
                    <TextRegular>{defaultDateFormat(startDate)}</TextRegular>
                </View>
                {/* <View style={classes.attendingRow}>
                    <TextRegular>{totalTicketsSold}</TextRegular>
                </View> */}
                <View style={classes.attendeeActionsRow}>
                    <TicketPill
                        status
                        tickets={userTicketsCount}
                        onPress={onTicketPillPress}
                    />
                    <EventActions
                        action="share"
                        onPress={openShareModal}
                        style={classes.attendeeAction}
                    />
                </View>
            </View>
        );
    }
    return (
        <React.Fragment>
            <View style={classes.row}>
                <View style={classes.eventRow}>
                    <TouchableOpacity
                        style={classes.eventRowImage}
                        onPress={_onPress}
                    >
                        <KwivrrImage
                            source={{
                                uri: imageSourceWithoutCache(eventImageUrl),
                            }}
                            resizeMode="cover"
                            style={classes.fullImage}
                            includingKwivrrBackground
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={classes.eventName}
                        onPress={goToSplashScreen}
                    >
                        <TextRegular
                            numberOfLines={1}
                            // style={classes.eventName}
                            ellipsizeMode="tail"
                        >
                            {name}
                        </TextRegular>
                    </TouchableOpacity>
                </View>
                <View style={classes.dateTimeRow}>
                    <TextRegular>{defaultDateFormat(startDate)}</TextRegular>
                </View>
                <View style={classes.attendingRow}>
                    <TextRegular>{isFree ? '-' : totalTicketsSold}</TextRegular>
                </View>
                <View style={classes.generalTicketsSoldRow}>
                    <TextRegular>
                        {isFree ? '-' : generalTicketsSold}
                    </TextRegular>
                </View>
                <View style={classes.vipTicketsSoldRow}>
                    <TextRegular>{isFree ? '-' : vipTicketsSold}</TextRegular>
                </View>
                <View style={classes.grossSalesRow}>
                    <TextRegular>
                        $ {priceFormatting(totalTicketSales)}
                    </TextRegular>
                </View>
                <View style={classes.actionsRow}>
                    <EventActions
                        action="share"
                        onPress={openShareModal}
                        style={classes.eventAction}
                    />
                    <EventActions
                        onPress={editEvent}
                        action="edit"
                        style={classes.eventAction}
                    />
                    <EventActions
                        onPress={() => setModal(true)}
                        action="clone"
                        style={classes.eventAction}
                    />
                    {event.isDeleteable && (
                        <EventActions
                            onPress={deleteEvent}
                            action="delete"
                            style={classes.eventAction}
                        />
                    )}
                </View>
            </View>
            {modal && (
                <KwivrrModal title="Clone Event" close={() => setModal(false)}>
                    <CloneEventModal eventId={id} />
                </KwivrrModal>
            )}
        </React.Fragment>
    );
}

// refactor this
// add propTypes
// Body.propTypes = {
//     streamTitle,
//     dateTime,
//     attendant,
//     ticketsSold,
//     ticketsPrice,
//     vipTicketsSold,
//     grossSales,
//     image,
//     host,
//     attendee
// }

export default memo(Body);
