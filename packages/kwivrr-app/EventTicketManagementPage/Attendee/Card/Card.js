import React, { useMemo, useRef, useState } from 'react';
import { Touchable, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Divider from 'kwivrr-ui/Divider';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useQRCode from 'kwivrr-hooks/useQRCode';

const eventStatus = {
    status: 'Checked In',
    username: 'Megan Benz',
    userEmail: 'megan.benz@gmail.com',
};

function Card({ status = eventStatus, ticket, openModal }) {
    const classes = useStyles(styles);
    const style = {
        width: '100%',
        overflow: 'hidden',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 12,
    };
    const { expand } = useQRCode();

    return (
        <View style={classes.container}>
            <View style={style}>
                <View style={classes.header}>
                    <TextHeader>Order ID #: {ticket.orderID}</TextHeader>
                    <View style={classes.actions}>
                        <TouchableOpacity
                            style={classes.action}
                            onPress={() => expand()}
                        >
                            <KwivrrIcon name="grid" color="#536AAF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.action}
                            onPress={() => openModal('Upgrade', ticket)}
                        >
                            <KwivrrIcon
                                name="arrow-up-circle"
                                color="#536AAF"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.action}
                            onPress={() => openModal('Transfer', ticket)}
                        >
                            <KwivrrIcon
                                name="corner-up-right"
                                color="#536AAF"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.action}
                            onPress={() => openModal('Reclaim', ticket)}
                        >
                            <KwivrrIcon name="corner-up-left" color="#FB5E64" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider style={classes.divider} />
                <View style={classes.infoContainer}>
                    <View style={classes.ticketInfo}>
                        <View style={classes.ticketStatus}>
                            <KwivrrIcon
                                size={16}
                                style={{ marginRight: 4 }}
                                name="check-circle"
                            />
                            <TextHeader style={classes.ticketInfoTitle}>
                                Ticket Status
                            </TextHeader>
                        </View>
                        <TextRegular>{ticket.status}</TextRegular>
                    </View>
                    <View style={classes.ticketInfo}>
                        <TextHeader style={classes.ticketInfoTitle}>
                            {ticket.username}
                        </TextHeader>
                        <TextRegular>{ticket.userEmail}</TextRegular>
                    </View>
                </View>
            </View>
        </View>
    );
}

Card.propTypes = {
    status: PropTypes.shape({
        status: PropTypes.string,
        username: PropTypes.string,
        userEmail: PropTypes.string,
    }).isRequired,
    ticket: PropTypes.shape({
        id: PropTypes.number,
        orderID: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        userEmail: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }),
    openModal: PropTypes.func.isRequired,
};

export default Card;
