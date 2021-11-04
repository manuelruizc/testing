import React, { useMemo, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Divider from 'kwivrr-ui/Divider';
import TextHeader from 'kwivrr-ui/TextHeader';
import RadioButton from 'kwivrr-ui/RadioButton';
import AuthButton from 'kwivrr-ui/AuthButton';
import InputComponent from 'kwivrr-ui/InputComponent';
import priceNumber from 'kwivrr-common/priceNumber';
import { priceFormatting } from 'kwivrr-common/priceFormatter';
import { Formik } from 'formik';
import CreditCardSchema from './CreditCardSchema';
import CreditCardData from 'kwivrr-ui/CreditCardData';
import useActions from 'kwivrr-hooks/useActions';
import SelectCards from 'kwivrr-ui/BuyTicket/TicketsInfo/SelectCards';
import valid from 'card-validator';

const cards = ['Card Ending in 1234'];

const _ticketVIPData = {
    price: priceNumber(125.0),
    tax: priceNumber(0.6),
    fee: priceNumber(2.5),
};

function UpgradeTicket({
    closeModal,
    setIsLoading,
    ticket,
    ticketId,
    ticketInfo,
    eventId,
    ticketIndex,
    setTickets,
    setFireRefetch,
    refetch,
}) {
    const { onUpgradeTicket } = useActions();
    const {
        vipTicketPrice,
        gaTicketPricePaid,
        subtotal,
        serviceFee,
        tax,
        total,
    } = ticketInfo;
    const [isLoading, __setIsLoading] = useState(false);
    const [ticketVIPData, setTicketVIPData] = useState(null);
    const classes = useStyles(styles);
    const [cardSelected, setCardSelected] = useState(
        cards ? cards[0] : 'New Credit Card'
    );
    const [cardSelectedId, setCardSelectedId] = useState(0);
    // const subTotal = useMemo(() => {
    //     if (!ticketVIPData) return 0;
    //     return priceNumber(ticketVIPData.price - ticketPrice);
    // }, [ticketPrice, ticketVIPData]);
    // const total = useMemo(() => {
    //     const _total = Number(subTotal) + Number(serviceFee) + Number(taxTotal);
    //     return priceNumber(_total);
    // }, [subTotal, serviceFee, taxTotal, generalPrice]);

    const onUpgrade = async (cardInfo = null) => {
        try {
            setIsLoading(true);
            const payload = {
                id: ticketId,
                applyCredits: false,
                eventId,
            };
            const isSavedCC = cardSelectedId !== -1;
            const isNewCC = cardSelectedId === -1;
            if (isSavedCC) {
                payload.payment = { cardId: cardSelectedId };
            }

            if (isNewCC) {
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
            }
            const response = await onUpgradeTicket(payload);
            // if (refetch) {
            //     await refetch();
            // }

            if (setFireRefetch) {
                setFireRefetch(true);
            }

            Alert.alert('Your ticket was upgrade it', '', [
                {
                    onPress: () => {
                        closeModal();
                    },
                },
            ]);
            setIsLoading(false);
            // if (refetch) {
            //     refetch();
            //     setTimeout(() => {
            //         setIsLoading(false);
            //         closeModal();
            //     }, 500);
            // } else {
            //     setIsLoading(false);
            // }
        } catch (e) {
            setIsLoading(false);
            console.log(e);
            Alert.alert('There was an error with the purchase');
        }
        // closeModal();
    };

    return (
        <>
            <TextSubHeader style={classes.subTitle} size={18}>
                Order ID #: {ticketId}
            </TextSubHeader>
            <TextRegular style={classes.vipInfo}>
                Price per VIP Ticket: ${priceFormatting(vipTicketPrice)}
            </TextRegular>
            <View style={classes.infoContainer}>
                <View style={classes.infoRow}>
                    <TextRegular>VIP Tickets (x1):</TextRegular>
                    <TextRegular>
                        ${priceFormatting(vipTicketPrice)}
                    </TextRegular>
                </View>
                <View style={classes.infoRow}>
                    <TextRegular>General Ticket:</TextRegular>
                    <TextRegular>
                        -${priceFormatting(gaTicketPricePaid)}
                    </TextRegular>
                </View>
                <View style={classes.infoRow}>
                    <TextRegular>Sub Total:</TextRegular>
                    <TextRegular>${priceFormatting(subtotal)}</TextRegular>
                </View>
                <View style={classes.infoRow}>
                    <TextRegular>Service Fee:</TextRegular>
                    <TextRegular>${priceFormatting(serviceFee)}</TextRegular>
                </View>
                <View style={classes.infoRow}>
                    <TextRegular>Tax:</TextRegular>
                    <TextRegular>${priceFormatting(tax)}</TextRegular>
                </View>
                <Divider style={{ width: '100%', marginVertical: 5 }} />
                <View style={classes.infoRow}>
                    <TextHeader>Total:</TextHeader>
                    <TextHeader>${priceFormatting(total)}</TextHeader>
                </View>
            </View>
            <Divider style={{ width: '90%', marginVertical: 24 }} />
            <View style={classes.radioButtons}>
                {/* {cards.map((card, idx) => (
                    <RadioButton
                        key={idx}
                        label={card}
                        selected={cardSelectedId === card.id}
                        size={18}
                        labelSize={16}
                        buttonStyle={{ marginRight: 8 }}
                        style={{ marginBottom: 18 }}
                        onPress={() => {
                            console.log(card);
                            setCardSelectedId(card.id);
                        }}
                    />
                ))} */}
                <SelectCards setSelectedCardId={setCardSelectedId} />
                {/* <RadioButton
                    label="New Credit Card"
                    selected={cardSelectedId === -1}
                    size={18}
                    labelSize={16}
                    buttonStyle={{ marginRight: 8 }}
                    onPress={() => setCardSelectedId(-1)}
                /> */}
            </View>
            <View style={classes.bottomForm}>
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
                    {(formikProps) => {
                        return (
                            <CreditCardCheckout
                                formik={formikProps}
                                setCardSelectedId={setCardSelectedId}
                                cardSelectedId={cardSelectedId}
                                onUpgrade={onUpgrade}
                                isLoading={isLoading}
                            />
                        );
                    }}
                </Formik>
            </View>

            <TextRegular style={classes.cancel} onPress={closeModal}>
                Cancel
            </TextRegular>
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
        </>
    );
}

const CreditCardCheckout = ({
    formik,
    setCardSelectedId,
    cardSelectedId,
    onUpgrade,
    isLoading,
}) => {
    const classes = useStyles(styles);
    const upgradeTicket = () => {
        if (cardSelectedId === -1) {
            onUpgrade(formik.values);
        } else {
            onUpgrade();
        }
    };
    return (
        <View style={{ flex: 1 }}>
            {cardSelectedId === -1 && (
                <CreditCardData
                    formik={formik}
                    applyCredits={false}
                    setApplyCredits={() => {}}
                    credits={0}
                    setSelectedCardId={setCardSelectedId}
                />
            )}
            <AuthButton
                backgroundColor="#3551A1"
                buttonStyle={classes.buttonStyle}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                onPress={upgradeTicket}
                isLoading={isLoading}
            >
                Purchase Upgrade
            </AuthButton>
        </View>
    );
};

UpgradeTicket.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default UpgradeTicket;
