import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import Avatar from 'kwivrr-ui/Avatar';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import EventActions from 'kwivrr-common/EventActions';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import useQuery from 'kwivrr-hooks/useQuery';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import { HOME, MANAGEMENT } from 'kwivrr-common/data/types/navigation';
import useAppActions from 'kwivrr-hooks/useAppActions';
import kwivrrApi from 'kwivrr-common/sdk';
import CloneEventModal from 'kwivrr-ui/CloneEventModal';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import useConfirmModal from 'kwivrr-hooks/useConfirmModal';
import useActions from 'kwivrr-hooks/useActions';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function Header({
    event: eventApi,
    isHost,
    onPress,
    onPressDelete,
    comingFromManagement = false,
    comingFrom = false,
    eventId,
    openEventManagerModal,
    openModal = () => {},
}) {
    const [event, setEvent] = useState(eventApi);
    const { addingNewHomeEvent } = useAppActions();
    const {
        title,
        eventImageUrl,
        startDate,
        hostName,
        hostAvatarUrl,
        hostId,
        id,
    } = event;
    const classes = useStyles(styles);
    const { reset, goBack, navigate } = useNavigation();
    const onBack = () => {
        if (comingFrom) {
            reset({
                index: 0,
                routes: [{ name: MANAGEMENT.INITIAL }],
            });
            return navigate(comingFrom);
        }
        return goBack();
    };

    const updateHeader = async () => {
        try {
            const response = await kwivrrApi.getEvent({ id: eventId });
            setEvent({ ...response });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (addingNewHomeEvent) {
            updateHeader();
        }
    }, [addingNewHomeEvent]);

    const navigateToSplash = () => {
        navigate(HOME.SPLASH, { eventId: event.id });
    };

    return (
        <View style={classes.container}>
            <TouchableOpacity
                onPress={onBack}
                style={classes.backButtonContainer}
            >
                <KwivrrIcon
                    name="arrow-left"
                    size={24}
                    style={{ marginRight: 6 }}
                />
                <TextRegular size={16}>Back</TextRegular>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={navigateToSplash}
                >
                    <KwivrrImage
                        source={{ uri: eventImageUrl }}
                        resizeMode="cover"
                        style={classes.image}
                        includingKwivrrBackground
                    />
                </TouchableOpacity>
                <View style={classes.infoContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={navigateToSplash}
                        style={classes.streamTitle}
                    >
                        <TextHeader
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            size={18}
                        >
                            {title}
                        </TextHeader>
                    </TouchableOpacity>
                    <TextSubHeader>
                        {defaultDateFormat(startDate)}
                    </TextSubHeader>
                    {isHost && (
                        <ButtonsSection
                            event={event}
                            onPressDelete={onPressDelete}
                            onPress={onPress}
                            eventName={title}
                            eventImage={eventImageUrl}
                            eventStartDatetime={defaultDateFormat(startDate)}
                            openModal={openModal}
                            openEventManagerModal={openEventManagerModal}
                            navigateToSplash={navigateToSplash}
                            // eventUrl={'url'}
                        />
                    )}
                    {!isHost && hostId ? (
                        <Host avatar={hostAvatarUrl} hostName={hostName} />
                    ) : null}
                </View>
            </View>
        </View>
    );
}

function Host({ user, avatar, hostName }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.hostContainer}>
            <Avatar
                size={20}
                style={{ marginRight: 4 }}
                source={{ uri: imageSourceWithoutCache(avatar) }}
            />
            <TextRegular>{hostName}</TextRegular>
        </View>
    );
}

function ButtonsSection({
    event,
    onPress,
    onPressDelete,
    eventStartDatetime,
    eventName,
    eventImage,
    openModal,
    openEventManagerModal,
    navigateToSplash,
}) {
    const { addNewEvent } = useAppActions();
    const { onDeleteEvent } = useActions();
    const { openConfirmModal } = useConfirmModal();
    const [modal, setModal] = useState(false);
    const { navigate, goBack } = useNavigation();
    const classes = useStyles(styles);
    const { openModal: _openShareModal } = useShareModal();
    const openShareModal = () => {
        _openShareModal({
            eventStartDatetime,
            eventName,
            eventImage,
            shareUrl: event.shareUrl,
        });
    };
    const editEvent = () => {
        return navigate(MANAGEMENT.EDIT_EVENT, { eventId: event.id });
    };

    const onDeleteEventAction = async () => {
        try {
            const response = await onDeleteEvent({ id: event.id });
            addNewEvent('Header', 'delete');
            Alert.alert(
                'Event deleted',
                'The event was deleted successfully.',
                [
                    {
                        onPress: () => {
                            goBack();
                        },
                    },
                ]
            );
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

    return (
        <React.Fragment>
            <View style={classes.buttonsContainer}>
                <EventActions
                    eventInfo={event}
                    action="splashScreen"
                    onPress={navigateToSplash}
                />
                <EventActions
                    eventInfo={event}
                    action="share"
                    onPress={openShareModal}
                />
                <EventActions
                    onPress={editEvent}
                    eventInfo={event}
                    action="edit"
                />
                <EventActions
                    eventInfo={event}
                    action="customTicket"
                    onPress={() => openModal('Sell Custom Ticket', null)}
                />
                <EventActions
                    onPress={() => setModal(true)}
                    eventInfo={event}
                    action="clone"
                />
                <EventActions
                    eventInfo={event}
                    action="eventmanager"
                    onPress={openEventManagerModal}
                />
                {event.isDeleteable && (
                    <EventActions
                        onPress={deleteEvent}
                        eventInfo={event}
                        action="delete"
                    />
                )}
            </View>
            {modal && (
                <KwivrrModal title="Clone Event" close={() => setModal(false)}>
                    <CloneEventModal eventId={event.id} />
                </KwivrrModal>
            )}
        </React.Fragment>
    );
}

Header.propTypes = {
    avatar: PropTypes.string,
    eventStartDatetime: PropTypes.string.isRequired,
    eventImage: PropTypes.string,
    eventName: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    isHost: PropTypes.bool,
    onPress: PropTypes.func,
    onPressDelete: PropTypes.func,
};

export default Header;
