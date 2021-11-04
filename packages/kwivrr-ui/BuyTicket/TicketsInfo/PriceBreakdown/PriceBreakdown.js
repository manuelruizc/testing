import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Divider from '../../../Divider';
import kwivrrApi from 'kwivrr-common/sdk';
import { priceFormatting } from 'kwivrr-common/priceFormatter';

function PriceBreakdown({ applyCredits, credits, tickets, prices, setTotal }) {
    const classes = useStyles(styles);
    const cartTotals = useMemo(() => {
        const obj = {
            vipTicketCount: tickets.vip,
            vipTicketPrice: Number(prices.vipTicketPrice),
            gaTicketCount: tickets.general,
            gaTicketPrice: Number(prices.generalTicketPrice),
        };
        return kwivrrApi.calculateCartTotals(obj);
    }, [tickets, prices]);

    const serivceFees = useMemo(() => {
        return kwivrrApi.calculateServiceFee({
            vipTicketCount: tickets.vip,
            vipTicketPrice: Number(prices.vipTicketPrice),
            gaTicketCount: tickets.general,
            gaTicketPrice: Number(prices.generalTicketPrice),
        });
    }, [tickets, prices]);

    useEffect(() => {
        setTotal(cartTotals.total);
    }, [cartTotals.total, setTotal]);

    return (
        <View style={classes.ticketInfo}>
            <View style={classes.ticketInfoRow}>
                <TextRegular size={16}>
                    Tickets (x{tickets.vip + tickets.general}):
                </TextRegular>
                <TextRegular size={16}>
                    ${priceFormatting(cartTotals.subtotal)}
                </TextRegular>
            </View>
            <View style={classes.ticketInfoRow}>
                <TextRegular size={16}>Sub Total:</TextRegular>
                <TextRegular size={16}>
                    ${priceFormatting(cartTotals.subtotal)}
                </TextRegular>
            </View>
            <View style={classes.ticketInfoRow}>
                <TextRegular size={16}>Service Fee:</TextRegular>
                <TextRegular size={16}>
                    ${priceFormatting(cartTotals.serviceFee)}
                </TextRegular>
            </View>
            <View style={classes.ticketInfoRow}>
                <TextRegular size={16}>Tax:</TextRegular>
                <TextRegular size={16}>
                    ${priceFormatting(cartTotals.tax)}
                </TextRegular>
            </View>
            <Divider style={classes.totalDivider} />
            <View style={classes.ticketInfoRow}>
                <TextHeader weight="bold" size={16}>
                    Total:
                </TextHeader>
                <TextHeader weight="bold" size={16}>
                    ${priceFormatting(cartTotals.total)}
                </TextHeader>
            </View>
            <View
                style={[
                    classes.ticketInfoRow,
                    { opacity: applyCredits ? 1 : 0 },
                ]}
            >
                <View style={classes.kwivrrCredits}>
                    <KwivrrImage
                        style={classes.kwivrrCreditsLogo}
                        resizeMode="contain"
                        source={require('kwivrr-assets/logo/Icon/PNG/Kwivrr_Icon_4C.png')}
                    />
                    <TextHeader weight="bold" size={16}>
                        Credits
                    </TextHeader>
                </View>
                <TextHeader weight="bold" size={16}>
                    -{Math.floor(Number(credits)).toFixed(2)}
                </TextHeader>
            </View>
        </View>
    );
}

export default PriceBreakdown;
