import React, { useEffect, useMemo, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';
import LiveEvent from './LiveEvent';
import Divider from 'kwivrr-ui/Divider';
import Header from './Header';
import EventImage from './EventImage';
import EventDescription from './EventDescription';
// import Speakers from './Speakers';
import MainInfo from './MainInfo';
import TicketsToBuy from './TicketsToBuy';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import BuyTicket from 'kwivrr-ui/BuyTicket';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import { AUTH_STATE } from 'kwivrr-common/AuthContext';
import countdown from 'kwivrr-common/countdown';
import Countdown from './Countdown';
import TextRegular from 'kwivrr-ui/TextRegular';
import Speakers from './Speakers';

function SplashScreen({ route, data, eventId }) {
    const { eventIndex, setEvents, splashFromHome } = route.params;

    const [ticketType, setTicketType] = useState('general');
    const [stateEvent, setEvent] = useState(data);
    const {
        name,
        id,
        eventImageUrl,
        startDate,
        endDate,
        title,
        descriptionText,
        generalTicketPrice,
        vipTicketPrice,
        hasGeneralTicketsRemaining,
        hasVipTicketsRemaining,
        generalTicketDescriptionText,
        vipTicketDescriptionText,
        userTicketsCount,
        isFree,
        isLive,
        disclaimer,
        withCountdownDisplay,
        host,
        isSoldOut,
        isDigital,
        hostId,
        hostName,
        hostAvatarUrl,
        hasImage,
        hasStarted,
    } = stateEvent;

    const eventStartDatetime = useMemo(
        () => defaultDateFormat(startDate),
        [startDate]
    );

    const { userIsLogged, setAuthState } = useAuthCredentials();
    const classes = useStyles(styles);
    const { openModal: openShareModal } = useShareModal();
    const [buyTicketModal, setBuyTicketModal] = useState(false);
    const openModal = () => {
        if (userIsLogged) {
            setBuyTicketModal(true);
            return;
        }
        Alert.alert(
            'You need to login',
            'You need to log in or sign up to buy tickets',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => setAuthState(AUTH_STATE.LOGIN_IN),
                },
            ]
        );
    };
    const isDescriptionEmpty = useMemo(
        () => !descriptionText.trim(),
        [descriptionText]
    );

    useEffect(() => {
        // fetchData(() => fetchSplashPageData(eventId));
    }, [eventId]);

    const [nowDate, setNowDate] = useState(new Date());
    const countdownValues = countdown(startDate, nowDate);

    const showCountdown = useMemo(() => {
        return !hasStarted && withCountdownDisplay;
    }, [isLive, withCountdownDisplay]);

    useEffect(() => {
        let interval;
        if (showCountdown) {
            interval = setInterval(() => {
                setNowDate(new Date());
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showCountdown]);

    return (
        <SafeAreaView style={classes.container}>
            <ScrollView
                style={classes.scrollViewStyle}
                contentContainerStyle={classes.scrollViewContentContainer}
            >
                <Header
                    hostName={hostName}
                    avatar={hostAvatarUrl}
                    hostId={hostId}
                />
                {isLive && (
                    <>
                        <LiveEvent
                            isSoldOut={
                                !hasVipTicketsRemaining &&
                                !hasGeneralTicketsRemaining
                            }
                            hasTicket={userTicketsCount > 0 && userIsLogged}
                            shareInfo={{
                                eventName: name,
                                eventImage: eventImageUrl,
                                eventStartDatetime: eventStartDatetime,
                            }}
                            eventId={id}
                            vipTicketPrice={vipTicketPrice}
                            generalTicketPrice={generalTicketPrice}
                            isDigital={isDigital}
                            openModal={openModal}
                            isFreeEvent={isFree}
                            hostId={hostId}
                        />
                        <MainInfo
                            event={data}
                            openModal={openModal}
                            pillStatus={
                                hasGeneralTicketsRemaining ||
                                hasVipTicketsRemaining
                            }
                            pillTickets={userTicketsCount}
                            eventStartDatetime={eventStartDatetime}
                            eventImage={eventImageUrl}
                            hostAvatar={hostAvatarUrl}
                            hostName={hostName}
                            hostId={hostId}
                            title={title}
                            eventId={eventId}
                            prices={{ vipTicketPrice, generalTicketPrice }}
                            isFreeEvent={isFree}
                        />
                    </>
                )}
                {eventImageUrl && (
                    <EventImage
                        hasImage={hasImage}
                        eventImage={eventImageUrl}
                    />
                )}
                {!isLive && (
                    <MainInfo
                        event={data}
                        openModal={openModal}
                        pillStatus={
                            hasGeneralTicketsRemaining || hasVipTicketsRemaining
                        }
                        pillTickets={userTicketsCount}
                        eventStartDatetime={eventStartDatetime}
                        eventImage={eventImageUrl}
                        hostAvatar={hostAvatarUrl}
                        hostName={hostName}
                        hostId={hostId}
                        eventId={eventId}
                        title={title}
                        prices={{ vipTicketPrice, generalTicketPrice }}
                        isFreeEvent={isFree}
                    />
                )}
                {showCountdown && (
                    <Countdown
                        days={countdownValues.days}
                        hours={countdownValues.hours}
                        minutes={countdownValues.minutes}
                        seconds={countdownValues.seconds}
                    />
                )}
                {!isDescriptionEmpty && (
                    <EventDescription description={descriptionText} />
                )}
                {disclaimer?.length > 0 && (
                    <View style={classes.disclaimerContainer}>
                        <TextRegular>{disclaimer}</TextRegular>
                    </View>
                )}
                {/* <Divider style={classes.divider} /> */}
                <Speakers eventId={id} />
                {/* <Divider style={classes.secondDivider} /> */}
                {!isFree && (
                    <TicketsToBuy
                        generalTicket={{
                            price: generalTicketPrice,
                            hasTickets: hasGeneralTicketsRemaining,
                            description: generalTicketDescriptionText,
                        }}
                        VIPTicket={{
                            price: vipTicketPrice,
                            hasTickets: hasVipTicketsRemaining,
                            description: vipTicketDescriptionText,
                        }}
                        openModal={openModal}
                        setTicketType={setTicketType}
                    />
                )}
            </ScrollView>
            {buyTicketModal && (
                <KwivrrModal
                    absoluteCloseButton
                    modalStyle={{ ...classes.modalStyle }}
                    innerModalStyle={classes.kwivrrModalInnerModalStyle}
                    close={() => setBuyTicketModal(false)}
                    scrollViewKeyboard={true}
                >
                    <BuyTicket
                        eventId={eventId}
                        eventIndex={eventIndex}
                        setEvents={setEvent}
                        setHomeEvents={setEvents ? setEvents : undefined}
                        event={stateEvent}
                        from={splashFromHome ? 'splashHome' : 'splash'}
                        ticketToBuyType={ticketType}
                    />
                </KwivrrModal>
            )}
        </SafeAreaView>
    );
}

export default SplashScreen;
