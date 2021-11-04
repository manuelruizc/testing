import React from 'react';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import { TicketStatus } from 'kwivrr-common/data/types/status';
import { TICKET_STATE } from 'kwivrr-common/data/types/ticket';
import { userIsAdminOrEventManager } from 'kwivrr-common/userIsAdmin';

const options = [
    'Hide', // 0
    'Upgrade', // 1
    'Transfer', // 2
    'Reclaim', // 3
    // 'Force Transfer', // 4
    'Assign Credential ID', // 4
    'Cancel / Refund', // 5
    'View Ticket', // 6
    'Ticket History', // 7
    // 'Scan QR Code', // 8
];

export function isCheckedInCancelledOrCredited(status) {
    return (
        status === TICKET_STATE.CHECKED_IN ||
        status === TICKET_STATE.REVOKED ||
        status === TICKET_STATE.REFUNDED ||
        status === TICKET_STATE.PARTIALLY_REFUNDED
    );
}

export function isCancelledOrCredited(status) {
    return (
        status === TICKET_STATE.REVOKED ||
        status === TICKET_STATE.REFUNDED ||
        status === TICKET_STATE.PARTIALLY_REFUNDED
    );
}

export function filterTicketOptions(item, userType, hasEnded) {
    const {
        credentialsId,
        currentTicketHolder,
        generalPrice,
        hasVip,
        id,
        isActive,
        isCheckInable,
        isCheckedIn,
        isGenera,
        isPartiallyRefunded,
        isPendingTransfer,
        isReclaimable,
        isRefunded,
        isRevokable,
        isRevoked,
        isSetCredentialsable,
        isTransferrable,
        isTransferred,
        isUncheckInable,
        isUpgradeable,
        isVip,
        orderId,
        price,
        purchasedBy,
        purchasedDatetime,
        ticketState,
        ticketType,
        vipPrice,
    } = item;
    // console.log('isTransfer', isTransferrable);
    // console.log({ isVip, isCheckedIn });

    // is checked in
    // "isCheckInable": false,
    // "isCheckedIn": true,
    // "isUncheckInable": true,
    // "ticketState": "CHECKED_IN"

    // unchecked in
    //     "isCheckInable": true,
    //   "isCheckedIn": false,
    // "isUncheckInable": false,
    // "ticketState": "UNCHECKED_IN",

    const userIsAdminManager = true;
    const checkedInCancelledOrCredited =
        isCheckedInCancelledOrCredited(ticketState);
    const cancelledOrCredited = isCancelledOrCredited(ticketState);
    const ticketOptions = options;
    const isRevokedOrRefunded = isRevoked || isRefunded;
    const filteredOptions = ticketOptions.filter((opt, idx) => {
        if ((idx === 0 && isRevokedOrRefunded) || (idx === 0 && hasEnded)) {
            return false;
        }
        if (
            (idx === 1 && !isUpgradeable) ||
            (idx === 1 && isRevokedOrRefunded) ||
            (idx === 1 && hasEnded)
        ) {
            // if already VIP can't upgrade
            return false;
        }
        // if a ticket is already checked in, cancelled or is credited
        // TRANSFER
        if (
            (idx === 2 && cancelledOrCredited && !userIsAdminManager) ||
            (idx === 2 && isRevokedOrRefunded) ||
            (idx === 2 && !isTransferrable) ||
            (idx === 2 && hasEnded)
        ) {
            return false;
        }
        // if a ticket is already checked in, cancelled or is credited
        if (
            (idx === 3 &&
                checkedInCancelledOrCredited &&
                !userIsAdminManager) ||
            (idx === 3 && isRevokedOrRefunded) ||
            (idx === 3 && !isReclaimable) ||
            (idx === 3 && hasEnded)
        ) {
            // reclaim
            return false;
        }
        // Assign Credential
        if (
            (idx === 4 && cancelledOrCredited) ||
            (idx === 4 && isRevokedOrRefunded) ||
            (idx === 4 && !isSetCredentialsable) ||
            (idx === 4 && hasEnded)
        ) {
            return false;
        }
        if (
            (idx === 5 && isCheckedIn) ||
            (idx === 5 && isRevokedOrRefunded) ||
            (idx === 5 && hasEnded)
        ) {
            return false;
        }
        console.log('opt', opt);
        return true;
    });
    return filteredOptions;
}
