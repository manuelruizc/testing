import React, { memo, useEffect, useMemo, useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import TextRegular from 'kwivrr-ui/TextRegular/TextRegular';
import KwivrrCreditLogo from './KwivrrCreditLogo';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import AuthButton from 'kwivrr-ui/AuthButton';
import RefundOptions from './RefundOptions';
import LoadingUI from 'kwivrr-ui/LoadingUI';
import useFetch from 'kwivrr-hooks/useFetch';
import TextHeader from 'kwivrr-ui/TextHeader';
import { fetchCancelRefund } from 'kwivrr-common/data/fetch/modals';
import useActions from 'kwivrr-hooks/useActions';

function CancelRefund({
    closeModal,
    ticket,
    refundBreakdown,
    creditCard,
    echeck,
    ticketId,
    setFireRefetch,
}) {
    const { onRevokeEventTicket } = useActions();
    const classes = useStyles(styles);
    const [isLoading, setIsLoading] = useState(false);
    const [ticketWasRefunded, setTicketWasRefunded] = useState(false);
    const [refund, setRefund] = useState(false);
    const [onlyCredits, setOnlyCredits] = useState(false);
    const [warningMessageActive, setWarningMessageActive] = useState(false);
    const onCancel = async () => {
        try {
            setIsLoading(true);
            const payload = { id: ticketId };
            if (!refund && !warningMessageActive) {
                return setWarningMessageActive(true);
            }
            if (!refund && warningMessageActive) {
                payload.refundType = 'none';
            } else if (onlyCredits) {
                payload.refundType = 'kwivrrCredit';
            } else {
                payload.refundType = 'default';
            }
            const response = await onRevokeEventTicket(payload);
            console.log('response', response);
            const alertTitle =
                payload.refundType === 'default'
                    ? 'Ticket Refunded'
                    : 'Ticket Revoked';
            const alertMessage =
                payload.refundType === 'default'
                    ? 'Your ticket has been refunded successfully'
                    : 'Your ticket has been revoked successfully';
            setFireRefetch(true);
            setIsLoading(false);
            setTicketWasRefunded(true);
            Alert.alert(alertTitle, alertMessage, [
                {
                    onPress: () => {
                        closeModal();
                    },
                },
            ]);
        } catch (e) {
            setIsLoading(false);
            Alert.alert(
                'There was an error trying to revoke/refund your ticket'
            );
        }
    };

    const BlockDetails = useMemo(() => {
        if (!onlyCredits && refundBreakdown.creditCard === 0) {
            setOnlyCredits(true);
            return '';
        }
        if (
            !onlyCredits &&
            refundBreakdown.creditCard > 0 &&
            refundBreakdown.kwivrrCredit === 0
        ) {
            return (
                <View style={classes.blockDetails}>
                    <TextRegular>
                        {`Issue refund of $${refundBreakdown.creditCard} to card ${creditCard.lastFour}`}
                    </TextRegular>
                </View>
            );
        }
        if (
            !onlyCredits &&
            refundBreakdown.creditCard > 0 &&
            refundBreakdown.kwivrrCredit > 0
        ) {
            return (
                <View style={classes.blockDetails}>
                    <TextRegular>
                        {`Issue refund? ${refundBreakdown.creditCard} to card ${creditCard.last4}. ${refundBreakdown.kwivrrCredit}`}
                    </TextRegular>
                    <KwivrrCreditLogo style={{ width: 24, height: 24 }} />
                    <TextRegular>credit(s).</TextRegular>
                </View>
            );
        }
        if (onlyCredits && refundBreakdown.creditCard > 0) {
            return (
                <View style={classes.blockDetails}>
                    <TextRegular>
                        {`Issue refund of ${
                            refundBreakdown.creditCard +
                            refundBreakdown.kwivrrCredit
                        }`}
                    </TextRegular>
                    <KwivrrCreditLogo style={{ width: 24, height: 24 }} />
                    <TextRegular>credit(s) to account?</TextRegular>
                </View>
            );
        }
        if (onlyCredits && refundBreakdown.creditCard === 0) {
            return (
                <View style={classes.blockDetails}>
                    <TextRegular>{`Issue refund of ${refundBreakdown.kwivrrCredit}`}</TextRegular>
                    <KwivrrCreditLogo style={{ width: 24, height: 24 }} />
                    <TextRegular>credit(s) to account?</TextRegular>
                </View>
            );
        }
        return '';
    }, [refundBreakdown, creditCard, refund, onlyCredits, setOnlyCredits]);

    useEffect(() => {
        if (!refund) {
            setWarningMessageActive(false);
        }
    }, [refund, setWarningMessageActive]);

    return (
        <>
            <TextSubHeader size={18} style={classes.subHeader}>
                Order ID #: {ticket.orderId}
            </TextSubHeader>
            <RefundOptions
                label="Issue Refund"
                onChange={() => setRefund((prev) => !prev)}
                value={refund}
            />
            {warningMessageActive && !refund && (
                <TextRegular style={classes.warningMessage}>
                    Are you sure you want to <TextHeader>cancel</TextHeader>{' '}
                    this ticket{' '}
                    <TextHeader>without issuing a refund or credit?</TextHeader>
                </TextRegular>
            )}
            {refund && refundBreakdown.creditCard > 0 && (
                <RefundOptions
                    label="Issue only credits?"
                    credits
                    onChange={() => setOnlyCredits((prev) => !prev)}
                    value={onlyCredits}
                    disabled={refundBreakdown.creditCard === 0}
                />
            )}
            {refund && BlockDetails}
            <AuthButton
                // disabled={option === CancelOptions.EMPTY}
                disabled={ticketWasRefunded}
                isLoading={isLoading}
                backgroundColor="#F1201C"
                activeOpacity={0.5}
                buttonStyle={classes.buttonStyle}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                onPress={onCancel}
                style={classes.cancel}
            >
                Cancel Ticket
            </AuthButton>
            <TextRegular onPress={closeModal} style={classes.back}>
                Back
            </TextRegular>
        </>
    );
}

CancelRefund.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default memo(CancelRefund);
