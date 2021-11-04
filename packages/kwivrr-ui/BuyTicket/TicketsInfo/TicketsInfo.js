import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import faker from 'faker';
import PropTypes from 'prop-types';
import TextHeader from 'kwivrr-ui/TextHeader';
import Divider from 'kwivrr-ui/Divider';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import Select from 'kwivrr-ui/Select/Select';
import PriceBreakdown from './PriceBreakdown';
import TicketsSelection from './TicketsSelection';
import { priceFormatting } from 'kwivrr-common/priceFormatter';
import CreditCardData from 'kwivrr-ui/CreditCardData';
import SelectCards from './SelectCards';
import AuthButton from '../../AuthButton';

const fakeCredits = faker.datatype.number({ min: 0, max: 20 });

function TicketsInfo({
    ticketPrice = parseFloat(10.0),
    applyCredits,
    setApplyCredits,
    kwivrrCredits = fakeCredits,
    languagesSupported,
    tickets,
    tax,
    setLanguagesSupported,
    setVIPTickets,
    setGeneralTickets,
    generalTickets,
    vipTickets,
    isVIPSoldOut,
    isGeneralSoldOut,
    isSoldOut,
    ticketsCanBeSold,
    blockSelling,
    languagesToSelect,
    prices,
    setTotal,
    selectedCardId,
    setSelectedCardId,
    formik,
    isLoading,
    total,
    purchaseEvent,
}) {
    const classes = useStyles(styles);
    const credits = useMemo(() => {
        return 0;
        // if (kwivrrCredits >= account.total) return account.total;
        // return kwivrrCredits;
    }, [kwivrrCredits]);

    const completePurchase = () => {
        if (selectedCardId === -1) {
            purchaseEvent(formik.values);
        } else {
            purchaseEvent();
        }
    };

    return (
        <View style={classes.container}>
            {blockSelling ? (
                <NoTickets
                    soldOut
                    message={
                        !ticketsCanBeSold ? 'This event is free' : undefined
                    }
                />
            ) : (
                <React.Fragment>
                    {!isGeneralSoldOut ? (
                        <React.Fragment>
                            <TicketsSelection
                                setTickets={setGeneralTickets}
                                tickets={generalTickets}
                                type="General"
                            />
                            <TicketPrice price={prices.generalTicketPrice} />
                        </React.Fragment>
                    ) : null}
                    {!isVIPSoldOut ? (
                        <React.Fragment>
                            <TicketsSelection
                                setTickets={setVIPTickets}
                                tickets={vipTickets}
                            />
                            <TicketPrice price={prices.vipTicketPrice} />
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
            )}

            {!blockSelling && (
                <React.Fragment>
                    <PriceBreakdown
                        prices={prices}
                        tickets={{ general: generalTickets, vip: vipTickets }}
                        credits={credits}
                        // tickets={tickets}
                        setTotal={setTotal}
                        applyCredits={applyCredits}
                    />
                    <Divider style={classes.ticketInfoDivider} />
                    {languagesToSelect && !blockSelling && (
                        <Select
                            value={languagesSupported}
                            style={{
                                ...classes.inputStyle,
                                borderWidth: 0,
                            }}
                            containerStyle={{ width: 'auto' }}
                            options={languagesToSelect}
                            dropDownDirection="TOP"
                            placeholder="Not specified"
                            placeholderStyle={{
                                color: 'rgba(0, 0, 0, 0.2)',
                                fontSize: 15,
                                fontFamily: 'Rubik-Light',
                            }}
                            listMode="SCROLLVIEW"
                            scrollViewProps={{
                                nestedScrollEnabled: true,
                            }}
                            onChange={(value) => setLanguagesSupported(value)}
                        />
                    )}
                    <SelectCards setSelectedCardId={setSelectedCardId} />
                    {selectedCardId === -1 && (
                        <CreditCardData
                            formik={formik}
                            applyCredits={applyCredits}
                            setApplyCredits={setApplyCredits}
                            credits={credits}
                            setSelectedCardId={setSelectedCardId}
                        />
                    )}
                    <AuthButton
                        backgroundColor="#3551A1"
                        buttonStyle={classes.button}
                        textFontSize={20}
                        uppercase={false}
                        textColor="white"
                        style={classes.authButton}
                        disabled={
                            total === 0 ||
                            (selectedCardId === -1 &&
                                Object.keys(formik.errors).length > 0)
                        }
                        onPress={completePurchase}
                        isLoading={isLoading}
                    >
                        Purchase
                    </AuthButton>
                </React.Fragment>
            )}
        </View>
    );
}

TicketsInfo.propTypes = {
    ticketPrice: PropTypes.number,
};

const TicketPrice = ({ price }) => {
    return (
        <TextRegular size={16}>
            Price per Ticket:{' '}
            {Number(priceFormatting(price)) === 0
                ? 'Free'
                : `$${priceFormatting(price)}`}
        </TextRegular>
    );
};

const NoTickets = ({
    type = 'VIP',
    soldOut = false,
    message = `Event sold out.${'\n'}No tickets available`,
}) => {
    const classes = useStyles(styles);
    return (
        <View style={classes.noTicketsAvailableContainer}>
            {soldOut ? (
                <TextHeader
                    size={18}
                    style={classes.noTicketsText}
                    color="tomato"
                >
                    {message}
                </TextHeader>
            ) : (
                <TextHeader
                    size={18}
                    style={classes.noTicketsText}
                    color="tomato"
                >
                    No {type} tickets available
                </TextHeader>
            )}
        </View>
    );
};

export default TicketsInfo;

// const [selectedLanguage, setSelectedLanguage] = useState('java');
{
    /* <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 24}}>
        {Platform.OS === 'android' ?
        <>
            <Picker
                itemStyle={{backgroundColor: '#EBEBEB'}}
                style={{height: 60, width: '90%', backgroundColor:'red'}}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </>
        :
        <>
            <TouchableOpacity
                style={{...classes.inputStyle, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%', paddingHorizontal: 12, paddingVertical: 14, height:'auto'}}
                onPress={() => setPickerActive(true)}
            >
                <TextRegular color="rgba(0, 0, 0, 0.6)" size={16}>{value}</TextRegular>
                <KwivrrIcon name="chevron-down" color="rgba(0, 0, 0, 0.3)" />
            </TouchableOpacity>
            
        </>
        }
    </View> */
}
