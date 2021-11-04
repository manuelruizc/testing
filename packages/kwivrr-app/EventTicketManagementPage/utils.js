export const modalsInfo = {
    Upgrade: {
        // modalStyle: {  },
        // modalInnerStyle: {  },
        usingScrollView: true,
        scrollViewKeyboard: true,
    },
    Transfer: {
        modalStyle: {},
        modalInnerStyle: {
            paddingBottom: 32,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        usingScrollView: false,
        scrollViewKeyboard: false,
    },
    Reclaim: {
        modalStyle: {},
        modalInnerStyle: {
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        usingScrollView: false,
        scrollViewKeyboard: false,
    },
    'Force Transfer': {
        modalStyle: {},
        modalInnerStyle: {},
        usingScrollView: true,
        scrollViewKeyboard: true,
    },
    'Assign Credential ID': {
        modalStyle: {},
        modalInnerStyle: {
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        usingScrollView: false,
        scrollViewKeyboard: false,
    },
    'Cancel / Refund': {
        modalStyle: {
            paddingVertical: 12,
        },
        modalInnerStyle: {
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        usingScrollView: false,
        scrollViewKeyboard: false,
    },
    'View Ticket': {
        name: 'Upgrade',
        modalStyle: { height: '96%' },
        modalInnerStyle: {
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        usingScrollView: true,
        scrollViewKeyboard: false,
    },
    'Ticket History': {
        name: 'Upgrade',
        modalStyle: { height: '96%' },
        modalInnerStyle: {
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        usingScrollView: false,
        scrollViewKeyboard: false,
        absoluteCloseButton: false,
    },
    'Sell Custom Tickaet': {
        name: 'Custom Ticket',
        modalStyle: {
            // paddingVertical: 'auto',
            height: 'auto',
        },
        // modalInnerStyle: {
        //     // paddingVertical: 22,
        //     alignItems: 'center',
        //     justifyContent: 'center',
        // },
        usingScrollView: true,
        scrollViewKeyboard: true,
        absoluteCloseButton: true,
    },
    'Sell Custom Ticket': {
        modalStyle: { paddingVertical: 12 },
        modalInnerStyle: {
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 32,
        },
        usingScrollView: true,
        scrollViewKeyboard: true,
        absoluteCloseButton: true,
    },
};

export const onSelectModal = (openModal, value) => {
    switch (value) {
        case 'Check In':
            selectFunction();
            break;
        case 'Uncheck In':
            selectFunction();
            break;
        case 'Upgrade':
            openModal('upgradeTicket', 'Upgrade Ticket');
            break;
        case 'Transfer':
            openModal('transferTicket', 'Transfer Ticket');
            break;
        case 'Reclaim':
            openModal('reclaimTicket', 'Reclaim Ticket');
            break;
        case 'Force Transfer':
            openModal('forceTransfer', 'Force Transfer');
            break;
        case 'Assign Credential ID':
            openModal('assingCredentialID', 'Assign Credential ID');
            break;
        case 'Cancel / Refund':
            openModal('cancelRefund', 'Cancel Ticket');
            break;
        case 'View Ticket':
            openModal('viewTicket', 'View Ticket');
            break;
        case 'Ticket History':
            openModal('ticketHistory', 'Ticket History');
            break;
        case 'Sell Custom Ticket':
            openModal('sellCustomTicket', 'Custom Ticket');
            break;
        default:
            return;
    }
};

export const _ticketData = [
    {
        id: 1,
        orderID: '0001',
        ticketHolder: 'ben.anderson@gmail.com',
        username: 'Ben Anderson',
        ticketStatus: 'Attending',
        purchasedBy: 'ben.anderson@gmail.com',
        purchasedDateTime: '03/27/2021, 06:34 AM',
        ticketType: 'General',
        ticketPrice: (5.0).toFixed(2),
        credentialID: '-',
    },
    {
        id: 4,
        orderID: '0001',
        ticketHolder: 'jon.johnson@gmail.com',
        username: 'Jon Johnson',
        ticketStatus: 'Gifted',
        purchasedBy: 'ben.anderson@gmail.com',
        purchasedDateTime: '03/27/2021, 10:34 AM',
        ticketType: 'General',
        ticketPrice: (5.0).toFixed(2),
        credentialID: '-',
        otherData: '123123',
        otherNumberData: 123,
        otherBoolenaData: false,
        otherUndefinedData: undefined,
        otherNullData: null,
    },
    {
        id: 6,
        orderID: '0006',
        ticketHolder: 'karla.weston@gmail.com',
        username: 'Karla Weston',
        ticketStatus: 'VIP',
        purchasedBy: 'karla.weston@gmail.com',
        purchasedDateTime: '03/27/2021, 10:34 AM',
        ticketType: 'General',
        ticketPrice: (12.0).toFixed(2),
        credentialID: '-',
        otherData: '123123',
        otherNumberData: 123,
        otherBoolenaData: false,
        otherUndefinedData: undefined,
        otherNullData: null,
    },
    {
        id: 2,
        orderID: '0011',
        ticketHolder: 'mary.johnson@gmail.com',
        username: 'Mary Johnson',
        ticketStatus: 'Gifted',
        purchasedBy: 'ben.anderson@gmail.com',
        purchasedDateTime: '03/27/2021, 10:34 AM',
        ticketType: 'General',
        ticketPrice: (5.0).toFixed(2),
        credentialID: '-',
        otherData: '123123',
        otherNumberData: 123,
        otherBoolenaData: false,
        otherUndefinedData: undefined,
        otherNullData: null,
    },
];
