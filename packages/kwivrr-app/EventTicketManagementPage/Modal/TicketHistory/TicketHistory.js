import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import TextRegular from 'kwivrr-ui/TextRegular/TextRegular';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';

const ICON = {
    REVOKED: {
        name: 'x',
        color: '#E53935',
    },
    UNCHECKED_IN: {
        name: 'circle',
        color: '#E53935',
    },
    CHECKED_IN: {
        name: 'check-circle',
        color: '#009688',
    },
    REFUNDED: {
        name: 'check-circle',
        color: '#009688',
    },
    PARTIALLY_REFUNDED: {
        name: 'dollar-sign',
        color: '#009688',
    },
    PURCHASED: {
        name: 'shopping-cart',
        color: '#009688',
    },
    UPGRADED: {
        name: 'arrow-up',
        color: '#009688',
    },
    RECLAIMED: {
        name: 'arrow-left',
        color: '#E53935',
    },
    CREDENTIALS_SET: {
        name: 'user-check',
        color: '#009688',
    },
    CLAIMED: {
        name: 'arrow-right',
        color: '#009688',
    },
    PENDING_TRANSFER: {
        name: 'hash',
        color: '#009688',
    },
    FORCE_TRANSFERRED: {
        name: 'corner-up-left',
        color: '#E53935',
    },
    SOLD: {
        name: 'hash',
        color: '#009688',
    },
    SOLD_CUSTOM: {
        name: 'shopping-bag',
        color: '#009688',
    },
};

function TicketHistory({ closeModal, ticketHistory }) {
    const classes = useStyles(styles);
    // <View style={classes.eventRow}>
    //     <KwivrrIcon style={classes.eventIcon} name="x" color="red" size={30} />
    //     <View style={classes.eventInfoContainer}>
    //         <TextRegular size={13} color="rgba(0, 0, 0, 0.3)">
    //             02/16/2021, 10:30 AM
    //         </TextRegular>
    //         <TextRegular size={16}>Event canceled (no credit)</TextRegular>
    //     </View>
    // </View>;
    return (
        <View style={classes.container}>
            <View style={classes.infoContainer}>
                <TextSubHeader style={classes.subHeader} size={16}>
                    Order ID #: 0001
                </TextSubHeader>
                <View style={classes.scrollViewContainer}>
                    <ScrollView>
                        {ticketHistory.map(
                            ({ action, actionDate, text }, index) => (
                                <View style={classes.eventRow}>
                                    <KwivrrIcon
                                        style={classes.eventIcon}
                                        name={ICON[action].name}
                                        color={ICON[action].color}
                                        size={30}
                                    />
                                    <View style={classes.eventInfoContainer}>
                                        <TextRegular
                                            size={13}
                                            color="rgba(0, 0, 0, 0.3)"
                                        >
                                            {defaultDateFormat(actionDate)}
                                        </TextRegular>
                                        <TextRegular size={26}>
                                            {text}
                                        </TextRegular>
                                    </View>
                                </View>
                            )
                        )}
                    </ScrollView>
                </View>
            </View>
            <View style={classes.close}>
                <TouchableOpacity onPress={closeModal}>
                    <TextRegular>Close</TextRegular>
                </TouchableOpacity>
            </View>
        </View>
    );
}

TicketHistory.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default TicketHistory;
