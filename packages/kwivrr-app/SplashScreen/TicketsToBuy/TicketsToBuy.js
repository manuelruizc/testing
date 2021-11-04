import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Ticket from './Ticket';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { priceFormatting } from 'kwivrr-common/priceFormatter';

function TicketsSection({
    generalTicket,
    VIPTicket,
    openModal,
    setTicketType,
}) {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            {Number(generalTicket.price) !== 0 && (
                <Ticket
                    title="General"
                    price={priceFormatting(generalTicket.price)}
                    description={generalTicket.description}
                    openModal={() => {
                        setTicketType('general');
                        openModal();
                    }}
                    isSoldOut={!generalTicket.hasTickets}
                />
            )}
            {Number(VIPTicket.price) !== 0 && (
                <Ticket
                    title="VIP"
                    price={priceFormatting(VIPTicket.price)}
                    description={VIPTicket.description}
                    openModal={() => {
                        setTicketType('VIP');
                        openModal();
                    }}
                    isSoldOut={!VIPTicket.hasTickets}
                />
            )}
        </View>
    );
}

TicketsSection.propTypes = {
    ticketsToBuy: PropTypes.array,
};

export default TicketsSection;
