import React, { useMemo, useState } from 'react';
import { Share, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import TextHeader from 'kwivrr-ui/TextHeader';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import TicketPill from 'kwivrr-ui/TicketPill';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import { MANAGEMENT, STACKS } from 'kwivrr-common/data/types/navigation';
import { useAuthCredentials } from '../../../kwivrr-hooks/useAuthCredentials';

function MainInfo({
    pillStatus = false,
    pillTickets = 0,
    openModal,
    eventName,
    eventStartDatetime,
    eventImage,
    hostName,
    hostAvatar,
    hostId,
    event,
    eventId,
    prices,
    isFreeEvent,
    title,
}) {
    const { openModal: openShareModal } = useShareModal();
    const { goBack, navigate } = useNavigation();
    const { userInfo } = useAuthCredentials();

    const onPress = () => {
        if (pillTickets > 0) {
            navigate(STACKS.MANAGEMENT, {
                params: {
                    eventName,
                    eventImage,
                    hostAvatar,
                    eventStartDatetime,
                    hostName,
                    event,
                    isHost: userInfo.id === hostId,
                    comingFrom: STACKS.HOME,
                    eventId,
                },
                screen: MANAGEMENT.EVENTMANAGEMENT,
            });
        }
        if (pillStatus && pillTickets === 0) {
            return openModal();
        }
    };
    const _pillStatus = useMemo(() => {
        if (pillTickets) return true;
        return pillStatus;
    }, [pillStatus, pillTickets]);

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 14,
                    paddingVertical: 18,
                }}
            >
                <TouchableOpacity onPress={() => goBack()}>
                    <KwivrrIcon name="arrow-left" color="black" size={24} />
                </TouchableOpacity>
                <TextHeader
                    style={{ width: '80%', textAlign: 'center' }}
                    size={20}
                >
                    {title}
                </TextHeader>
                <TouchableOpacity
                    onPress={() =>
                        openShareModal({
                            eventName,
                            eventImage,
                            eventStartDatetime,
                            eventId,
                            shareUrl: event.shareUrl,
                        })
                    }
                >
                    <KwivrrIcon name="share" color="#3652A2" size={24} />
                </TouchableOpacity>
            </View>
            <TextSubHeader style={{ marginBottom: 16 }} size={16}>
                {eventStartDatetime}
            </TextSubHeader>
            {!isFreeEvent && (
                <TicketPill
                    status={_pillStatus}
                    tickets={pillTickets}
                    onPress={onPress}
                    eventId={eventId}
                    eventInfo={{
                        eventImage,
                        eventStartDatetime,
                        eventName,
                        hostName,
                        avatar: hostAvatar,
                    }}
                />
            )}
        </View>
    );
}

MainInfo.propTypes = {
    pillStatus: PropTypes.bool,
    pillTickets: PropTypes.number,
    openModal: PropTypes.func.isRequired,
};

export default MainInfo;
