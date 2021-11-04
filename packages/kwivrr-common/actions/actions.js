import kwivrrApi from '../sdk';

const onLogin = (email, password) => {
    return kwivrrApi.login({
        email,
        password,
    });
};

const onLogout = () => {
    return kwivrrApi.logout();
};

const onUpdateUserAccount = (payload = {}) => {
    return kwivrrApi._updateUserAccount({ ...payload, id: 'me' });
};

const onCreateCreditCard = (payload = {}) => {
    return kwivrrApi._createCreditCard(payload);
};

const onCreateECheck = (payload = {}) => {
    return kwivrrApi._createECheck(payload);
};

const onCreatePayoutMethod = (payload = {}) => {
    return kwivrrApi._createPayoutMethod(payload);
};

const onDeleteCreditCard = (payload = {}) => {
    return kwivrrApi._deleteCreditCard(payload);
};

const onDeleteECheck = (payload = {}) => {
    return kwivrrApi._deleteECheck(payload);
};

const onDeletePayoutMethod = (payload = {}) => {
    return kwivrrApi._deletePayoutMethod(payload);
};

const onSetDefaultCreditCard = (payload = {}) => {
    return kwivrrApi._setDefaultCreditCard(payload);
};

const onSetDefaultEChecks = (payload = {}) => {
    return kwivrrApi._setDefaultECheck(payload);
};

const onUpdatePassword = (payload = {}) => {
    return kwivrrApi._updateUserPassword(payload);
};

const onUpdateUserEmail = (payload = {}) => {
    return kwivrrApi._updateUserEmail(payload);
};

const onAddShopItem = (payload = {}) => {
    return kwivrrApi.createFeaturedItem(payload);
};

const onChangeNotificationSettings = (payload = {}) => {
    return kwivrrApi._createUserPreference(payload);
};

const onSetDefaultPaymentOption = (payload = {}) => {
    return kwivrrApi._setDefaultPayoutMethod(payload);
};

const onCreateAccount = (payload = {}) => {
    return kwivrrApi._createUser(payload);
};

const onCreateEvent = (payload = {}) => {
    return kwivrrApi.createEvent(payload);
};

const onTransferTicket = (payload = {}) => {
    return kwivrrApi.transferEventTicket(payload);
};

const onReclaimTicket = (payload = {}) => {
    return kwivrrApi.reclaimEventTicket(payload);
};

const onCheckInPhysicalEventTicket = (payload = {}) => {
    return kwivrrApi.checkinPhysicalEventTicket(payload);
};

const onCheckInVirtualEventTicket = (payload = {}) => {
    return kwivrrApi.checkinVirtualEventTicket(payload);
};

const onUncheckEventTicket = (payload = {}) => {
    return kwivrrApi.unCheckinEventTicket(payload);
};

const onSetTicketCredentials = (payload = {}) => {
    return kwivrrApi.setEventTicketCredentials(payload);
};

const onDeleteFeaturedItem = (payload = {}) => {
    return kwivrrApi._deleteFeaturedItem(payload);
};

const onRevokeEventTicket = (payload = {}) => {
    return kwivrrApi.revokeEventTicket(payload);
};

const onCreateEventGroup = (payload = {}) => {
    return kwivrrApi.createEventGroup(payload);
};

const onDeleteEventGroup = (payload = {}) => {
    return kwivrrApi.deleteEventGroup(payload);
};

const onUpdateEventGroup = (payload = {}) => {
    return kwivrrApi.updateEventGroup(payload);
};

const onAddEventMessage = (payload = {}) => {
    return kwivrrApi.createEventMessage(payload);
};

const onNormalizeEventMessage = (payload = {}) => {
    return kwivrrApi.normalizeEventMessage(payload);
};

const onPurchaseEventTickets = (payload = {}) => {
    return kwivrrApi.purchaseEventTickets(payload);
};

const onCreateSpeakerProfile = (payload = {}) => {
    return kwivrrApi.createSpeakerProfile(payload);
};

const onUpgradeTicket = (payload = {}) => {
    return kwivrrApi.upgradeEventTicket(payload);
};

const onUpdateEvent = (payload = {}) => {
    return kwivrrApi.updateEvent(payload);
};

const onCloneEvent = (payload = {}) => {
    return kwivrrApi.cloneEvent(payload);
};

const onDeleteEvent = (payload = {}) => {
    return kwivrrApi.deleteEvent(payload);
};

const onSellCustomEventTickets = (payload = {}) => {
    return kwivrrApi.sellCustomEventTickets(payload);
};

const onCreateEventManager = (payload = {}) => {
    return kwivrrApi.createEventManager(payload);
};

const onDeleteEventManager = (payload = {}) => {
    return kwivrrApi.deleteEventManager(payload);
};

const onPostEventAttendee = (payload = {}) => {
    return kwivrrApi.postEventAttendee(payload);
};

const onBanEventAttendee = (payload = {}) => {
    return kwivrrApi.banEventAttendee(payload);
};

const onBlockEventAttendee = (payload = {}) => {
    return kwivrrApi.blockEventAttendee(payload);
};

const onMuteEventAttendee = (payload = {}) => {
    return kwivrrApi.muteEventAttendee(payload);
};

const onUnbanEventAttendee = (payload = {}) => {
    return kwivrrApi.unbanEventAttendee(payload);
};

const onUnblockEventAttendee = (payload = {}) => {
    return kwivrrApi.unblockEventAttendee(payload);
};

const onUnmuteEventAttendee = (payload = {}) => {
    return kwivrrApi.unmuteEventAttendee(payload);
};

const onDisjoinEventSpeaker = (payload = {}) => {
    return kwivrrApi.disjoinEventSpeaker(payload);
};

const onAssociateEventSpeaker = (payload = {}) => {
    return kwivrrApi.associateEventSpeaker(payload);
};

const onUpdateEventSpeaker = (payload = {}) => {
    return kwivrrApi.updateEventSpeaker(payload);
};

const props = {
    onDisjoinEventSpeaker,
    onAssociateEventSpeaker,
    onUpdateEventSpeaker,

    onAddShopItem,
    onAddEventMessage,
    onCloneEvent,
    onChangeNotificationSettings,
    onCheckInPhysicalEventTicket,
    onCheckInVirtualEventTicket,
    onCreateAccount,
    onCreateCreditCard,
    onCreateECheck,
    onCreateEvent,
    onCreateEventGroup,
    onCreateEventManager,
    onCreatePayoutMethod,
    onCreateSpeakerProfile,
    onDeleteCreditCard,
    onDeleteECheck,
    onDeleteEvent,
    onDeleteEventGroup,
    onDeleteEventManager,
    onDeleteFeaturedItem,
    onDeletePayoutMethod,
    onLogin,
    onLogout,
    onNormalizeEventMessage,
    onPostEventAttendee,
    onPurchaseEventTickets,
    onReclaimTicket,
    onRevokeEventTicket,
    onSellCustomEventTickets,
    onSetDefaultCreditCard,
    onSetDefaultEChecks,
    onSetDefaultPaymentOption,
    onSetTicketCredentials,
    onTransferTicket,
    onUncheckEventTicket,
    onUpdateEventGroup,
    onUpdateUserAccount,
    onUpdateUserEmail,
    onUpdatePassword,
    onUpgradeTicket,
    onUpdateEvent,

    onBanEventAttendee,
    onBlockEventAttendee,
    onMuteEventAttendee,
    onUnbanEventAttendee,
    onUnblockEventAttendee,
    onUnmuteEventAttendee,
};

export default props;
