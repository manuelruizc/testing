import React, { memo, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import TextRegular from 'kwivrr-ui/TextRegular';
import Divider from 'kwivrr-ui/Divider';
import AuthButton from 'kwivrr-ui/AuthButton';
import Header from './Header';
import TicketsInfo from './TicketsInfo';
import useStyles from 'kwivrr-hooks/useStyles';
import languageList from 'kwivrr-common/adaptors/playgroundData/languageList';
import styles from './styles';
import useActions from 'kwivrr-hooks/useActions';
import { Formik } from 'formik';
import CreditCardSchema from './CreditCardSchema';
import valid from 'card-validator';
import useAppActions from 'kwivrr-hooks/useAppActions';
import { useNavigation } from '@react-navigation/core';
import { MANAGEMENT, STACKS } from 'kwivrr-common/data/types/navigation';

function BuyTicket({
    closeModal,
    id,
    ticketType = 'general',
    eventId,
    eventIndex,
    setEvents,
    event,
    from,
    ticketToBuyType = 'general',
    setHomeEvents,
    onAlertPress = () => {},
    setIsLoading,
}) {
    const { navigate } = useNavigation();
    const {
        availableLanguages,
        eventImageUrl,
        generalTicketPrice,
        hostId,
        hostName,
        hostAvatarUrl,
        startDate,
        title,
        vipTicketPrice,
        isFree,
        isSoldOutOfGeneralTickets,
        isSoldOutOfVipTickets,
        isSoldOut,
    } = event;
    const { addNewPurchasedEvent } = useAppActions();
    const { onPurchaseEventTickets } = useActions();
    const classes = useStyles(styles);
    const [applyCredits, setApplyCredits] = useState(false);
    const [languagesSupported, setLanguagesSupported] = useState('');
    const [generalTickets, setGeneralTickets] = useState(
        ticketToBuyType === 'general' ? 1 : 0
    );
    const [tickets, setTickets] = useState(0);
    const [vipTickets, setVIPTickets] = useState(
        ticketToBuyType === 'VIP' ? 1 : 0
    );
    const [tax, setTax] = useState(parseFloat(0.6));
    const [total, setTotal] = useState(0);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [isLoading, setIsIsLoading] = useState(false);

    const languagesToSelect = useMemo(() => {
        if (!availableLanguages) return null;
        if (availableLanguages.length === 0) return null;
        const filteredLanguages = languageList.filter((languageItem) =>
            availableLanguages.includes(languageItem.id)
        );
        // return filteredLanguages;
        return filteredLanguages.map((language) => ({
            label: language.label,
            value: language.id,
        }));
    }, [availableLanguages, languageList]);

    const resetTickets = () => {
        setVIPTickets(0);
        setGeneralTickets(0);
    };

    const purchaseEvent = async (cardInfo = null) => {
        try {
            setIsLoading(true);
            if (selectedCardId === null) {
                setIsLoading(false);
                return;
            }
            const payload = {
                id: eventId,
                generalTicketCount: generalTickets,
                vipTicketCount: vipTickets,
                applyCredits: false,
            };
            if (selectedCardId === -1) {
                if (cardInfo === null) {
                    return;
                }
                const expirationSplitted = cardInfo.expiration.split('/');
                const validResponse = valid.number(cardInfo.cardNumber);
                const { type } = validResponse.card;
                payload.payment = {
                    creditCard: {
                        name: cardInfo.nameOnCard,
                        cardNumber: cardInfo.cardNumber,
                        ccv: cardInfo.ccv,
                        cardType: type,
                        expirationMonth: expirationSplitted[0],
                        expirationYear: expirationSplitted[1],
                        saveCard: true,
                        address: {
                            line1:
                                cardInfo.addressLineOne +
                                ' ' +
                                cardInfo.addressLineTwo,
                            city: cardInfo.city,
                            state: cardInfo.state,
                            country: 'US',
                            zipCode: cardInfo.zipCode,
                        },
                    },
                };
            } else {
                payload.payment = {
                    cardId: 1,
                };
            }
            const plusTickets = generalTickets + vipTickets;
            const response = await onPurchaseEventTickets(payload);
            resetTickets();
            setIsLoading(false);
            addNewPurchasedEvent();
            if (from === 'splash') {
                setEvents((prevEvent) => {
                    prevEvent.userTicketsCount = !prevEvent.userTicketsCount
                        ? plusTickets
                        : prevEvent.userTicketsCount + plusTickets;
                    return { ...prevEvent };
                });
            } else if (from === 'splashHome') {
                setEvents((prevEvent) => {
                    prevEvent.userTicketsCount = !prevEvent.userTicketsCount
                        ? plusTickets
                        : prevEvent.userTicketsCount + plusTickets;
                    return { ...prevEvent };
                });
                setHomeEvents((prevEvents) => {
                    prevEvents[eventIndex].userTicketsCount = !prevEvents[
                        eventIndex
                    ].userTicketsCount
                        ? plusTickets
                        : prevEvents[eventIndex].userTicketsCount + plusTickets;
                    return [...prevEvents];
                });
            } else if (from === 'attendee') {
            } else {
                setEvents((prevEvents) => {
                    prevEvents[eventIndex].userTicketsCount = !prevEvents[
                        eventIndex
                    ].userTicketsCount
                        ? plusTickets
                        : prevEvents[eventIndex].userTicketsCount + plusTickets;
                    return [...prevEvents];
                });
            }

            Alert.alert('Purchase successful', '', [
                {
                    onPress: () => {
                        onAlertPress();
                        closeModal();
                        navigate(STACKS.MANAGEMENT, {
                            eventId,
                            goToTicketManagement: true,
                        });
                    },
                },
            ]);
        } catch (e) {
            setIsLoading(false);
            console.error(e);
            Alert.alert('There was an error with the purchase. Try again.');
        }
    };

    const ticketsCanBeSold = useMemo(() => !isFree, [isFree]);

    const isFreeVip = useMemo(
        () => Number(vipTicketPrice) === 0,
        [vipTicketPrice]
    );

    const blockSelling = useMemo(
        () => isSoldOut || !ticketsCanBeSold,
        [isSoldOut, ticketsCanBeSold]
    );

    return (
        <React.Fragment>
            <Header
                hostId={hostId}
                avatarUrl={hostAvatarUrl}
                hostName={hostName}
                title={title}
                eventImageUrl={eventImageUrl}
                eventDate={startDate}
            />
            <Divider style={classes.divider} />
            <Formik
                validateOnMount
                initialValues={{
                    addressLineOne: '',
                    addressLineTwo: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    aptNumber: '',
                    nameOnCard: '',
                    cardNumber: '',
                    expiration: '',
                    ccv: '',
                }}
                validationSchema={CreditCardSchema}
                initialTouched={{
                    addressLineOne: true,
                    addressLineTwo: true,
                    city: true,
                    state: true,
                    zipCode: true,
                    aptNumber: true,
                    nameOnCard: true,
                    cardNumber: true,
                    expiration: true,
                    ccv: true,
                }}
            >
                {(formikProps) => (
                    <TicketsInfo
                        applyCredits={applyCredits}
                        setApplyCredits={setApplyCredits}
                        languagesSupported={languagesSupported}
                        tickets={tickets}
                        setGeneralTickets={setGeneralTickets}
                        setVIPTickets={setVIPTickets}
                        generalTickets={generalTickets}
                        vipTickets={vipTickets}
                        setLanguagesSupported={setLanguagesSupported}
                        tax={tax}
                        eventId={eventId}
                        isVIPSoldOut={isSoldOutOfVipTickets || isFreeVip}
                        isGeneralSoldOut={isSoldOutOfGeneralTickets}
                        prices={{ vipTicketPrice, generalTicketPrice }}
                        languagesToSelect={languagesToSelect}
                        setTotal={setTotal}
                        selectedCardId={selectedCardId}
                        setSelectedCardId={setSelectedCardId}
                        formik={formikProps}
                        purchaseEvent={purchaseEvent}
                        isLoading={isLoading}
                        total={total}
                        isSoldOut={isSoldOut}
                        ticketsCanBeSold={ticketsCanBeSold}
                        blockSelling={blockSelling}
                    />
                )}
            </Formik>
            {!blockSelling && (
                <TextRegular
                    onPress={closeModal}
                    style={classes.cancel}
                    size={16}
                >
                    Cancel
                </TextRegular>
            )}
            {isLoading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextRegular size={18}>Processing</TextRegular>
                    <ActivityIndicator size="large" color="tomato" />
                </View>
            )}
        </React.Fragment>
    );
}

BuyTicket.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default memo(BuyTicket);
