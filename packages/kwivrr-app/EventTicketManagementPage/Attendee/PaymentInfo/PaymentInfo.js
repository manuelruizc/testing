import React, { useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Divider from 'kwivrr-ui/Divider';
import Touchable from 'kwivrr-ui/Touchable';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import useQRCode from 'kwivrr-hooks/useQRCode';
import useIsFutureEvent from 'kwivrr-hooks/useIsFutureEvent';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import { priceFormatting } from 'kwivrr-common/priceFormatter';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

const eventStatus = {
    status: 'Checked In',
    username: 'Megan Benz',
    userEmail: 'megan.benz@gmail.com',
};

function PaymentInfo({
    status = eventStatus,
    chargeInfo,
    paymentDetails,
    ticket,
    openModal,
    eventStartDatetime,
    eventId,
    selectModal,
    index,
}) {
    const { userInfo } = useAuthCredentials();
    const { expand } = useQRCode();
    const isFutureEvent = useIsFutureEvent(eventStartDatetime);
    const {
        id,
        status: ticketStatus,
        purchased_datetime: purchasedDatetime,
        price: generalPrice,
        vip_price: vipPrice,
        type,
        name,
        isCheckedIn,
        ticketState,
        email,
        orderId: orderID,
        qrCode,
        isUpgraded,
        isReclaimable,
        giftedUserEmail,
        userEmail,
        userName,
        chargeInfo: { individualCharges },
    } = ticket;

    const ticketIsReclaimed = useMemo(
        () => ticketState === 'RECLAIMED',
        [ticketState]
    );

    const charges = useMemo(() => {
        if (individualCharges.length === 0) return null;
        return individualCharges[0];
    }, [individualCharges]);
    const ticketIsVip = type === 1;
    const ticketPrice = ticketIsVip ? vipPrice : generalPrice;

    const tax = '4.00';
    const serviceFee = '10.00';

    const onLayoutFinished = useSharedValue(false);
    const onStaticHeightLayoutFinished = useSharedValue(false);
    const expanded = useSharedValue(false);
    const [heightStatic, setHeightStatic] = useState(0);
    const classes = useStyles(styles);
    const [totalHeight, setTotalHeight] = useState(0);
    const onLayout = (event) => {
        'worklet';
        if (onLayoutFinished.value) return;
        const { height: _height } = event.nativeEvent.layout;
        onLayoutFinished.value = true;
        runOnJS(setTotalHeight)(_height);
    };
    const onLayoutInfoContainer = (event) => {
        'worklet';
        if (onStaticHeightLayoutFinished.value) return;
        const { height: mesis } = event.nativeEvent.layout;
        const { height: _height } = event.nativeEvent.layout;
        runOnJS(setHeightStatic)(_height * 1.4);
        onStaticHeightLayoutFinished.value = true;
    };
    const expandCard = () => {
        'worklet';
        expanded.value = !expanded.value;
    };
    const styling = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: !onLayoutFinished.value
                ? undefined
                : expanded.value
                ? withTiming(totalHeight)
                : withTiming(heightStatic),
            overflow: 'hidden',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingBottom: 12,
        };
    });
    const chevronStyle = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [
                {
                    scale: expanded.value ? withTiming(-1) : withTiming(1),
                },
            ],
        };
    });
    const ticketTypeTitle = useMemo(() => {
        // create enum for ticket types
        if (!ticketIsVip) return 'General Ticket';
        return 'VIP Ticket';
    }, [ticketIsVip]);

    const availableActions = useMemo(() => {
        const options = [];
        const {
            ticketStatus,
            ticketType,
            isVip,
            isUpgradeable,
            isTransferrable,
            isTransferred,
        } = ticket;
        options.push({ name: 'QR', icon: 'grid', color: '#536AAF' });
        if (isUpgradeable) {
            options.push({
                name: 'Upgrade',
                icon: 'arrow-up-circle',
                color: '#536AAF',
            });
        }
        if (isReclaimable && giftedUserEmail !== userInfo?.email) {
            options.push({
                name: 'Reclaim',
                icon: 'corner-up-left',
                color: 'tomato',
            });
        }
        if (isTransferrable && !isTransferred) {
            options.push({
                name: 'Transfer',
                icon: 'corner-up-right',
                color: '#536AAF',
            });
        }
        return options;
    }, [
        ticket,
        ticketIsVip,
        isCheckedIn,
        isUpgraded,
        isReclaimable,
        giftedUserEmail,
        userInfo,
    ]);

    const stateText = useMemo(() => {
        if (userEmail === userInfo?.email && !giftedUserEmail) {
            return ticketState;
        } else if (
            ticketState === 'RECLAIMED' ||
            ticketState === 'FORCE_TRANSFERRED'
        ) {
            return `Gifted to ${giftedUserEmail}`;
        }
        return ticketState;
    }, [userEmail, giftedUserEmail, userInfo, ticketIsReclaimed, ticketState]);

    const hidePaymentInfo = useMemo(
        () =>
            giftedUserEmail === userInfo?.email ||
            (ticketIsReclaimed && userInfo?.email !== userEmail),
        [ticketIsReclaimed, giftedUserEmail, userInfo, userEmail]
    );

    return (
        <View style={classes.container}>
            <Animated.View style={styling} onLayout={onLayout}>
                <View style={classes.header}>
                    <TextHeader>Order ID #: {orderID}</TextHeader>
                    <View style={classes.actions}>
                        {availableActions.map(({ name, icon, color }, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={classes.action}
                                onPress={
                                    name === 'QR'
                                        ? () => expand(qrCode)
                                        : () =>
                                              selectModal(
                                                  name,
                                                  id,
                                                  ticket,
                                                  index
                                              )
                                }
                            >
                                <KwivrrIcon name={icon} color={color} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <Divider style={classes.divider} />
                <View
                    onLayout={onLayoutInfoContainer}
                    style={classes.infoContainer}
                >
                    <View style={classes.ticketInfo}>
                        <TextHeader style={classes.ticketInfoTitle}>
                            Ticket Status
                        </TextHeader>
                        <View style={classes.ticketStatus}>
                            <KwivrrIcon
                                size={16}
                                style={{ marginRight: 4 }}
                                name="check-circle"
                            />
                            <TextRegular>{stateText}</TextRegular>
                        </View>
                    </View>
                    <View style={classes.ticketInfo}>
                        <TextHeader style={classes.ticketInfoTitle}>
                            {userName}
                        </TextHeader>
                        <TextRegular>{userEmail}</TextRegular>
                    </View>
                </View>
                {charges && !hidePaymentInfo && (
                    <View style={classes.receiptContainer}>
                        <View style={classes.receiptInfo}>
                            <TextHeader style={classes.ticketInfoTitle}>
                                Charge Info
                            </TextHeader>
                            <View style={classes.receiptInfoRow}>
                                <TextRegular>
                                    {ticketTypeTitle} (x{charges.numTickets}):
                                </TextRegular>
                                <TextRegular>
                                    ${priceFormatting(charges.ticketTotal)}
                                </TextRegular>
                            </View>
                            <View style={classes.receiptInfoRow}>
                                <TextRegular>Sub Total:</TextRegular>
                                <TextRegular>
                                    ${priceFormatting(charges.subtotal)}
                                </TextRegular>
                            </View>
                            <View style={classes.receiptInfoRow}>
                                <TextRegular>Service Fee:</TextRegular>
                                <TextRegular>
                                    ${priceFormatting(charges.serviceFee)}
                                </TextRegular>
                            </View>
                            <View style={classes.receiptInfoRow}>
                                <TextRegular>Tax:</TextRegular>
                                <TextRegular>
                                    ${priceFormatting(charges.tax)}
                                </TextRegular>
                            </View>
                            <View style={classes.receiptInfoRow}>
                                <TextRegular>Total:</TextRegular>
                                <TextRegular>
                                    ${priceFormatting(charges.total)}
                                </TextRegular>
                            </View>
                        </View>
                    </View>
                )}
                {charges && !hidePaymentInfo && (
                    <View style={classes.paymentDetails}>
                        <TextHeader style={classes.ticketInfoTitle}>
                            Payment Details
                        </TextHeader>
                        <TextRegular style={classes.paymentDetailsRow}>
                            Name on Card: {charges.paymentDetails.nameOnCard}
                        </TextRegular>
                        <TextRegular style={classes.paymentDetailsRow}>
                            Card Ending In:{' '}
                            {charges.paymentDetails.lastFourDigits}
                        </TextRegular>
                        <TextRegular style={classes.paymentDetailsRow}>
                            Date: {defaultDateFormat(charges.purchaseDate)}
                        </TextRegular>
                    </View>
                )}
            </Animated.View>
            <TouchableOpacity onPress={expandCard} style={classes.expandArrow}>
                <Animated.View style={chevronStyle}>
                    <KwivrrIcon name="chevron-down" />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
}

export default PaymentInfo;
