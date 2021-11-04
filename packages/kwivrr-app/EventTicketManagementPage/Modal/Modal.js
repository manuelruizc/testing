import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import AssingCredentialID from './AssignCredentialID';
import CancelRefund from './CancelRefund';
import ForceTransfer from './ForceTransfer';
import ReclaimTicket from './ReclaimTicket';
import TicketHistory from './TicketHistory';
import TransferTicket from './TransferTicket';
import UpgradeTicket from './UpgradeTicket';
import ViewTicket from './ViewTicket';
import SellCustomTicket from './SellCustomTicket';

function Modal({ type, ...rest }) {
    switch (type) {
        case 'assingCredentialID':
            return <AssingCredentialID {...rest} />;
        case 'cancelRefund':
            return <CancelRefund {...rest} />;
        case 'forceTransfer':
            return <ForceTransfer {...rest} />;
        case 'reclaimTicket':
            return <ReclaimTicket {...rest} />;
        case 'ticketHistory':
            return <TicketHistory {...rest} />;
        case 'transferTicket':
            return <TransferTicket {...rest} />;
        case 'upgradeTicket':
            return <UpgradeTicket {...rest} />;
        case 'viewTicket':
            return <ViewTicket {...rest} />;
        case 'sellCustomTicket':
            return <SellCustomTicket {...rest} />;
    }
}

Modal.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Modal;
