import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular';
import InputComponent from 'kwivrr-ui/InputComponent';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useStyles from 'kwivrr-hooks/useStyles';
import useActions from 'kwivrr-hooks/useActions';
import AuthButton from 'kwivrr-ui/AuthButton';
import Touchable from 'kwivrr-ui/Touchable';
import styles from './styles';
import { Formik } from 'formik';
import CreditCardData from 'kwivrr-ui/CreditCardData';
import CreditCardSchema from '../UpgradeTicket/CreditCardSchema';
import valid from 'card-validator';
import AutoCompleteInput from 'kwivrr-ui/AutoCompleteInput';
import kwivrrApi from 'kwivrr-common/sdk';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import TextHeader from 'kwivrr-ui/TextHeader';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function SellCustomTicket({ closeModal, eventId, setFireRefetch }) {
    const { onSellCustomEventTickets } = useActions();
    const [ticketsGeneral, setTicketsGeneral] = useState({
        count: '',
        price: '',
    });
    const [ticketsVIP, setTicketsVIP] = useState({
        count: '',
        price: '',
    });
    const [searchUserTerm, setSearchUserTerm] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles(styles);
    const sellCustomTicket = async (cardInfo) => {
        try {
            setIsLoading(true);
            const {
                addressLineOne,
                addressLineTwo,
                city,
                state,
                zipCode,
                aptNumber,
                nameOnCard,
                cardNumber,
                expiration,
                ccv,
            } = cardInfo;
            const expirationSplitted = expiration.split('/');
            const validResponse = valid.number(cardNumber);
            const { type } = validResponse.card;

            const payload = {
                id: eventId,
                userId: user.userId,
                generalTicketCount: Number(
                    ticketsGeneral.count.length === 0 ? 0 : ticketsGeneral.count
                ),
                generalTicketPrice: Number(
                    ticketsGeneral.price.length === 0 ? 0 : ticketsGeneral.price
                ),
                vipTicketCount: Number(
                    ticketsVIP.count.length === 0 ? 0 : ticketsVIP.count
                ),
                vipTicketPrice: Number(
                    ticketsVIP.price.length === 0 ? 0 : ticketsVIP.price
                ),
                payment: {
                    creditCard: {
                        name: nameOnCard,
                        cardNumber,
                        ccv,
                        cardType: type,
                        expirationMonth: expirationSplitted[0],
                        expirationYear: expirationSplitted[1],
                        saveCard: false,
                        address: {
                            line1: addressLineOne + ' ' + addressLineTwo,
                            city,
                            state,
                            country: 'US',
                            zipCode,
                        },
                    },
                },
            };
            const response = await onSellCustomEventTickets(payload);
            if (setFireRefetch) setFireRefetch(true);
            Alert.alert(
                `Custom Tickets Sold`,
                `Custom Tickets Sold to ${user.firstName} ${user.lastName}`,
                [
                    {
                        onPress: closeModal,
                    },
                ]
            );
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
        // closeModal();
    };

    const searchUsers = async (term) => {
        try {
            const response = await kwivrrApi.searchUsers({
                term,
            });
            setSearchedUsers(response.entries);
        } catch (e) {
            console.error(e);
            setSearchedUsers([]);
        }
    };

    const onPressSearchItem = (item, index) => {
        setUser(item);
    };

    return (
        <>
            <View style={classes.ticketInfoContainer}>
                <TextRegular size={16}>General {eventId} ($5.00)</TextRegular>
                <View style={classes.ticketInfo}>
                    <InputComponent
                        keyboardType="decimal-pad"
                        style={{ width: '30%' }}
                        placeholder="0"
                        inputStyle={classes.inputStyle}
                        value={ticketsGeneral.count}
                        onChangeText={(text) =>
                            setTicketsGeneral((prev) => ({
                                ...prev,
                                count: text,
                            }))
                        }
                    />
                    <KwivrrIcon name="x" size={16} />
                    <InputComponent
                        keyboardType="decimal-pad"
                        iconLeft="dollar-sign"
                        iconSize={16}
                        style={{ width: '40%' }}
                        placeholder="0"
                        inputStyle={classes.inputStyle}
                        value={ticketsGeneral.price}
                        onChangeText={(text) =>
                            setTicketsGeneral((prev) => ({
                                ...prev,
                                price: text,
                            }))
                        }
                    />
                </View>
            </View>
            <View style={classes.ticketInfoContainer}>
                <TextRegular size={16}>VIP Ticket ($5.00)</TextRegular>
                <View style={classes.ticketInfo}>
                    <InputComponent
                        keyboardType="decimal-pad"
                        style={{ width: '30%' }}
                        placeholder="0"
                        inputStyle={classes.inputStyle}
                        value={ticketsVIP.count}
                        onChangeText={(text) =>
                            setTicketsVIP((prev) => ({
                                ...prev,
                                count: text,
                            }))
                        }
                    />
                    <KwivrrIcon name="x" size={16} />
                    <InputComponent
                        keyboardType="decimal-pad"
                        iconLeft="dollar-sign"
                        iconSize={16}
                        style={{ width: '40%' }}
                        placeholder="0"
                        inputStyle={classes.inputStyle}
                        value={ticketsVIP.price}
                        onChangeText={(text) =>
                            setTicketsVIP((prev) => ({
                                ...prev,
                                price: text,
                            }))
                        }
                    />
                </View>
            </View>
            {/* <InputComponent
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ width: '84%' }}
                placeholder="Email"
                label="Deliver To"
                inputStyle={classes.inputStyle}
            /> */}
            {user ? (
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 18,
                        marginVertical: 12,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 18,
                        }}
                    >
                        <KwivrrImage
                            source={{
                                uri: imageSourceWithoutCache(user.avatarUrl),
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                marginRight: 8,
                            }}
                        />
                        <TextHeader size={16}>
                            {user.firstName} {user.lastName}
                        </TextHeader>
                    </View>

                    <TouchableOpacity onPress={() => setUser(null)}>
                        <TextRegular>Select other user</TextRegular>
                    </TouchableOpacity>
                </View>
            ) : (
                <AutoCompleteInput
                    value={searchUserTerm}
                    onChangeText={(text) => setSearchUserTerm(text)}
                    onSearch={(searchTerm) => searchUsers(searchTerm)}
                    style={{
                        ...classes.autocompleteInputContainer,
                        zIndex: 10,
                    }}
                    placeholder="Search Kwivrr Users"
                    label="Deliver To"
                    inputStyle={{ ...classes.inputStyle }}
                    labelSize={14}
                    labelColor="black"
                    data={searchedUsers}
                    onPressItem={(item, index) =>
                        onPressSearchItem(item, index)
                    }
                />
            )}
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
                                // setCardSelectedId={setCardSelectedId}
                                // cardSelectedId={cardSelectedId}
                                sellCustomTicket={sellCustomTicket}
                                isLoading={isLoading}
                                user={user}
                            />
                        );
                    }}
                </Formik>
            </View>
            <View style={classes.bottomOptions}>
                {/* <AuthButton
                    textFontSize={18}
                    backgroundColor="#3551A1"
                    textColor="white"
                    buttonStyle={{ paddingHorizontal: 18 }}
                    uppercase={false}
                    onPress={sellTicket}
                >
                    Sell Ticket
                </AuthButton> */}
                <Touchable onPress={closeModal}>
                    <TextRegular style={{ marginTop: 24 }}>Cancel</TextRegular>
                </Touchable>
            </View>
        </>
    );
}

const CreditCardCheckout = ({ formik, sellCustomTicket, isLoading, user }) => {
    // const classes = useStyles(styles);
    const sellTicket = () => {
        sellCustomTicket(formik.values);
    };

    return (
        <View style={{ flex: 1 }}>
            <CreditCardData
                formik={formik}
                applyCredits={false}
                setApplyCredits={() => {}}
            />
            <AuthButton
                backgroundColor="#3551A1"
                buttonStyle={{
                    width: 'auto',
                    paddingHorizontal: 42,
                    paddingVertical: 12,
                    marginVertical: 42,
                }}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                onPress={sellTicket}
                isLoading={isLoading}
                disabled={
                    Object.keys(formik.errors).length > 0 || user === null
                }
            >
                Sell Custom Ticket
            </AuthButton>
        </View>
    );
};

export default SellCustomTicket;
