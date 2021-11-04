import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, View } from 'react-native';
import TextHeader from 'kwivrr-ui/TextHeader';
import TicketPill from 'kwivrr-ui/TicketPill';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextRegular from 'kwivrr-ui/TextRegular';
import LiveBug from 'kwivrr-ui/LiveBug';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Touchable from 'kwivrr-ui/Touchable';
import { HOME, MANAGEMENT, STACKS } from 'kwivrr-common/data/types/navigation';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

function EventFooter({
    openModal,
    eventName,
    eventStartDatetime,
    isLive,
    eventImage,
    bookable,
    userTicketsCount,
    ticketsAvailable,
    isSoldOut,
    hostName,
    avatar,
    userTickets,
    hasWaitList,
    event,
    eventId,
    isFreeEvent,
    eventIndex,
    setEvents,
    hostId,
}) {
    const { userInfo } = useAuthCredentials();
    const { openModal: openShareModal } = useShareModal();
    const { navigate } = useNavigation();
    const pillStatus = useMemo(() => ticketsAvailable, [ticketsAvailable]);
    const onPress = () => {
        if (pillStatus && userTicketsCount > 0) {
            const params = {
                eventImage: event.eventImage,
                eventStartDatetime: event.eventStartDatetime,
                eventName: event.eventName,
                hostName: event.hostName,
                hostAvatar: event.avatar,
                comingFromManagement: true,
                comingFrom: HOME.INITIAL,
                event,
                eventId,
            };
            return navigate(STACKS.MANAGEMENT, {
                screen: MANAGEMENT.EVENTMANAGEMENT,
                params,
                initial: false,
            });
        }
        openModal(eventId);
    };
    const classes = useStyles(styles, { eventImage });
    const renderPill = useMemo(() => {
        if (hostId === userInfo?.user_id) return false;
        if (!isSoldOut && !isFreeEvent) return true;
        return false;
    }, [isSoldOut, hostId, userInfo, isFreeEvent]);

    return (
        <View style={classes.container}>
            <View style={classes.topInfo}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        navigate(HOME.SPLASH, {
                            eventId: event.id,
                            eventIndex,
                            setEvents,
                            splashFromHome: true,
                        })
                    }
                    style={classes.touchableEventName}
                >
                    <TextHeader style={classes.eventName} size={17}>
                        {eventName}
                    </TextHeader>
                </TouchableOpacity>
                <View style={classes.leftOptions}>
                    {renderPill && (
                        <TicketPill
                            onPress={onPress}
                            status={pillStatus}
                            tickets={userTicketsCount}
                            eventInfo={{
                                eventName,
                                eventImage,
                                eventStartDatetime,
                                hostName,
                                hostAvatar: avatar,
                            }}
                            eventId={eventId}
                        />
                    )}
                    <Touchable
                        anim
                        style={classes.shareButton}
                        centered
                        onPress={() =>
                            openShareModal({
                                eventName,
                                eventImage,
                                eventStartDatetime,
                                eventId,
                                shareUrl: event.shareUrl,
                            })
                        }
                        activeOpacity={0.65}
                    >
                        <KwivrrIcon
                            name="share"
                            color="#4F68AC"
                            size={20}
                            style={classes.shareIcon}
                        />
                    </Touchable>
                </View>
            </View>
            <View style={{ width: '100%', flex: 1 }}>
                {!isLive && (
                    <TextRegular size={18} style={classes.eventStartDatetime}>
                        {eventStartDatetime}
                    </TextRegular>
                )}
                {!eventImage && isLive && (
                    <View style={classes.liveBug}>
                        <LiveBug
                            absolute={false}
                            onPress={() =>
                                navigate(HOME.SPLASH, {
                                    eventId: event.id,
                                })
                            }
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

export default EventFooter;
