import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import { TICKET_STATE_ENUMS } from 'kwivrr-common/data/enum/tickets';
import capitalize from 'kwivrr-common/capitalize';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';

function ViewTicket({ closeModal, ticketInfo }) {
    const { orderId, ticketState, userEmail, userName, chargeInfo, qrCode } =
        ticketInfo;
    const classes = useStyles(styles);
    const {
        individualCharges: [
            {
                formattedServiceFee,
                formattedSubtotal,
                formattedTax,
                formattedTicketTotal,
                formattedTotal,
                id,
                numTickets,
                paymentDetails: { lastFourDigits, nameOnCard },
                purchaseDate,
                serviceFee,
                subtotal,
                tax,
                ticketTotal,
                ticketType,
                total,
            },
        ],
    } = chargeInfo;
    return (
        <View style={classes.container}>
            <View style={classes.subContainer}>
                <TextHeader style={classes.title} size={18}>
                    Order ID #: {orderId}
                </TextHeader>
                <View style={classes.infoContainer}>
                    <TextHeader style={classes.label} size={16}>
                        Ticket Status
                    </TextHeader>
                    <View style={classes.value}>
                        {/* <KwivrrIcon
                            name="check-circle"
                            size={16}
                            style={{ marginRight: 6 }}
                        /> */}
                        <TextRegular size={16}>
                            {TICKET_STATE_ENUMS[ticketState]}
                        </TextRegular>
                    </View>
                </View>
                <View style={classes.infoContainer}>
                    <TextHeader style={classes.label} size={16}>
                        {userEmail}
                    </TextHeader>
                    <TextRegular size={16}>{userName}</TextRegular>
                </View>
                <View style={classes.infoContainer}>
                    <TextHeader style={classes.label} size={16}>
                        Charge Info
                    </TextHeader>
                    <View style={classes.chargeInfoRow}>
                        <TextRegular>
                            {ticketType === 'vip'
                                ? 'VIP'
                                : capitalize(ticketType)}{' '}
                            Ticket (x{numTickets}):
                        </TextRegular>
                        <TextRegular>{formattedTicketTotal}</TextRegular>
                    </View>
                    <View style={classes.chargeInfoRow}>
                        <TextRegular>Sub Total:</TextRegular>
                        <TextRegular>{formattedSubtotal}</TextRegular>
                    </View>
                    <View style={classes.chargeInfoRow}>
                        <TextRegular>Service Fee:</TextRegular>
                        <TextRegular>{formattedServiceFee}</TextRegular>
                    </View>
                    <View style={classes.chargeInfoRow}>
                        <TextRegular>Tax:</TextRegular>
                        <TextRegular>{formattedTax}</TextRegular>
                    </View>
                    <View style={classes.chargeInfoRow}>
                        <TextRegular>Total:</TextRegular>
                        <TextRegular>{formattedTotal}</TextRegular>
                    </View>
                </View>
                <View style={classes.infoContainer}>
                    <TextHeader style={classes.label} size={16}>
                        Payment Details
                    </TextHeader>
                    <View style={classes.paymentDetailsRow}>
                        <TextRegular style={classes.paymentKey}>
                            Name on Card
                        </TextRegular>
                        <TextRegular>{nameOnCard}</TextRegular>
                    </View>
                    <View style={classes.paymentDetailsRow}>
                        <TextRegular style={classes.paymentKey}>
                            Card Ending In:
                        </TextRegular>
                        <TextRegular>{lastFourDigits}</TextRegular>
                    </View>
                </View>
            </View>
            <View style={classes.imageContainer}>
                <KwivrrImage
                    source={{ uri: qrCode }}
                    style={classes.image}
                    resizeMode="contain"
                />
            </View>
            <View style={classes.closeModalContainer}>
                <TextRegular onPress={closeModal}>Close</TextRegular>
            </View>
        </View>
    );
}

ViewTicket.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default ViewTicket;
