import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
// import Animated, { Easing, runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import EventCard from 'kwivrr-ui/EventCard';
import Header from './Header';
import EventImage from './EventImage';
import EventFooter from './EventFooter';
import moment from 'moment';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import isEventLive from 'kwivrr-common/isEventLive';

function Card({ event, included, openModal, index, setEvents }) {
    const {
        id: eventId,
        startDate,
        endDate,
        shopUrl,
        learnMoreUrl,
        shareUrl,
        eventImageUrl,
        hasImage,
        promotionalVideoEmbedCode,
        descriptionText,
        descriptionHtml,
        generalTicketPrice,
        hasGeneralTicketsRemaining,
        generalTicketDescriptionText,
        vipTicketPrice,
        hasVipTicketsRemaining,
        vipTicketDescriptionText,
        userTicketsCount,
        isOnWaitlist,
        eventGroupsIds,
        title,
        bookable,
        userId,
        isLive,
        userTickets,
        hasWaitList,
        isFree,
        hostName,
        hostId,
        hostAvatarUrl,
        // user_tickets_count: userTicketsCount,
    } = event;

    const isSoldOut = useMemo(() => {
        if (!hasVipTicketsRemaining && !hasGeneralTicketsRemaining) return true;
        if (Number(vipTicketPrice) === 0 && Number(generalTicketPrice) === 0)
            return true;
    }, [
        hasVipTicketsRemaining,
        hasGeneralTicketsRemaining,
        vipTicketPrice,
        generalTicketPrice,
    ]);

    const eventStartDatetime = useMemo(
        () => defaultDateFormat(startDate),
        [startDate]
    );
    // const isLive = useMemo(() => {
    //     return isEventLive(startDate, endDate);
    // }, [startDate, endDate]);

    const ticketsAvailable = useMemo(() => {
        return hasGeneralTicketsRemaining || hasVipTicketsRemaining;
    }, [hasGeneralTicketsRemaining, hasVipTicketsRemaining]);

    return (
        <EventCard>
            <Header
                avatar={hostAvatarUrl}
                hostId={hostId}
                hostName={hostName}
                isSoldOut={
                    !hasGeneralTicketsRemaining && !hasVipTicketsRemaining
                }
            />
            {eventImageUrl && (
                <EventImage
                    event={event}
                    source={{ uri: eventImageUrl + '?' + new Date() }}
                    isLive={isLive}
                    ticketsAvailable={ticketsAvailable}
                    bookable={bookable}
                    isSoldOut={!isSoldOut}
                    eventImage={eventImageUrl}
                    eventName={title}
                    hostName={hostName}
                    avatar={hostAvatarUrl}
                    eventStartDatetime={eventStartDatetime}
                    eventId={eventId}
                    eventIndex={index}
                    setEvents={setEvents}
                    hasImage={hasImage}
                />
            )}
            <EventFooter
                event={event}
                ticketsAvailable={ticketsAvailable}
                bookable={bookable}
                userTicketsCount={userTicketsCount}
                eventName={title}
                eventStartDatetime={eventStartDatetime}
                isLive={isLive}
                eventImage={eventImageUrl}
                hostName={hostName}
                avatar={hostAvatarUrl}
                openModal={openModal}
                userTickets={userTickets}
                hasWaitList={hasWaitList}
                eventId={eventId}
                isSoldOut={isSoldOut}
                isFreeEvent={isFree}
                eventIndex={index}
                setEvents={setEvents}
                hostId={hostId}
            />
        </EventCard>
    );
}

Card.propTypes = {
    event: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default Card;
