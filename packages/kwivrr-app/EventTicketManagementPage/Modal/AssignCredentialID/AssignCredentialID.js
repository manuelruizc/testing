import React, { useMemo, useState } from 'react';
import { Alert, Switch, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import InputComponent from 'kwivrr-ui/InputComponent';
import TextRegular from 'kwivrr-ui/TextRegular/TextRegular';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import styles from './styles';
import AuthButton from 'kwivrr-ui/AuthButton';
import KwivrrSwitch from 'kwivrr-ui/KwivrrSwitch';
import useActions from 'kwivrr-hooks/useActions';

function AssignCredentialID({
    closeModal,
    ticket,
    ticketIndex,
    setTickets,
    ticketId,
}) {
    const classes = useStyles(styles);
    const {
        onSetTicketCredentials,
        onCheckInPhysicalEventTicket,
        onCheckInVirtualEventTicket,
        onUncheckEventTicket,
    } = useActions();
    const { credentialsId } = ticket;
    const [credentialID, setCredentialID] = useState(
        credentialsId ? credentialsId : ''
    );
    const [checkIn, setCheckIn] = useState(ticket.isCheckedIn);
    const [loading, setLoading] = useState(false);
    const onAssignCredential = async () => {
        try {
            setLoading(true);
            await onSetTicketCredentials({
                id: ticketId,
                credentialsId: credentialID,
            });
            let isCheckedInNewValue = ticket.isCheckedIn;
            if (ticket.isCheckedIn !== checkIn) {
                alert('do something!');
            }
            setTickets((prevTickets) => {
                prevTickets[ticketIndex].credentialsId = credentialID;
                console.log(prevTickets[ticketIndex].credentialsId);
                return [...prevTickets];
            });
            setLoading(false);
            Alert.alert('New credentials assigned', '', [
                { onPress: closeModal },
            ]);
        } catch (e) {
            console.log('error', e);
            setLoading(false);
            alert('Error');
        }
    };
    const credentialIDLength = useMemo(() => {
        if (!credentialID) return false;
        return credentialID.length < 5 && credentialID.length > 0;
    }, [credentialID]);
    return (
        <>
            <View style={classes.orderContainer}>
                <TextSubHeader size={18} style={classes.subHeader}>
                    Ticket ID #: {ticket.credentialsId}
                </TextSubHeader>
                <View style={classes.infoContainer}>
                    <InputComponent
                        onChangeText={(text) => setCredentialID(text)}
                        value={credentialID}
                        maxLength={6}
                        placeholder="6 Digit Credential #"
                        style={{
                            width: '52%',
                            borderWidth: 1,
                            borderColor: credentialIDLength
                                ? 'tomato'
                                : 'transparent',
                            borderRadius: 8,
                        }}
                        inputStyle={classes.inputStyle}
                        keyboardType="decimal-pad"
                    />
                    <View style={classes.switchContainer}>
                        <TextRegular size={16} style={{ marginRight: 12 }}>
                            Check In
                        </TextRegular>
                        <KwivrrSwitch
                            value={checkIn}
                            onChange={() => setCheckIn((prev) => !prev)}
                        />
                    </View>
                </View>
            </View>
            <AuthButton
                backgroundColor="#3551A1"
                buttonStyle={classes.buttonStyle}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                onPress={onAssignCredential}
                disabled={!(credentialID?.length === 6)}
                isLoading={loading}
            >
                Assign Credential ID
            </AuthButton>
            <TextRegular onPress={closeModal} style={classes.back}>
                Back
            </TextRegular>
        </>
    );
}

AssignCredentialID.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default AssignCredentialID;
