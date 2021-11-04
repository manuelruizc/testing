import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import AuthButton from 'kwivrr-ui/AuthButton';
import TextRegular from 'kwivrr-ui/TextRegular/TextRegular';
import useActions from 'kwivrr-hooks/useActions';
import styles from './styles';
import { Alert } from 'react-native';

function ReclaimTicket({ closeModal, ticket, ticketId, setFireRefetch }) {
    const { userEmail, currentTicketHolder } = ticket;
    const { onReclaimTicket } = useActions();
    const [loading, setLoading] = useState(false);
    const classes = useStyles(styles);
    const onReclaim = async () => {
        try {
            setLoading(true);
            await onReclaimTicket({ id: ticketId });
            setFireRefetch(true);
            setLoading(false);
            Alert.alert(
                'Ticket reclaimed',
                `The ticket with an id ${ticketId} was reclaimed successfully`,
                [
                    {
                        text: 'Ok',
                        onPress: closeModal,
                    },
                ]
            );
        } catch (e) {
            Alert.alert('Error on Reclaim', e.data.error);
            setLoading(false);
        }
    };
    return (
        <>
            <TextRegular style={classes.subTitle} size={14}>
                Reclaim ticket from {currentTicketHolder} back to {userEmail}?
            </TextRegular>
            <AuthButton
                onPress={onReclaim}
                backgroundColor="#F1201C"
                buttonStyle={classes.buttonStyle}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                isLoading={loading}
                activityIndicatorColor="white"
            >
                Reclaim Ticket
            </AuthButton>
            <TextRegular style={classes.cancel} onPress={closeModal}>
                Cancel
            </TextRegular>
        </>
    );
}

ReclaimTicket.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default ReclaimTicket;
