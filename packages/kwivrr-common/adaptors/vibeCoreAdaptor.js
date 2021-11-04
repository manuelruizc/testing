import kwivrrApi from '../sdk';
import flattener from 'jsonapi-flattener';

const onFetchEvents = ({ queryKey }) => {
    const payload = queryKey[1] ? queryKey[1] : { scope: 'hosting' };
    // const payload = queryKey[1] ? queryKey[1] : { scope: 'hosting' };
    return kwivrrApi._getEvents(payload);
};

const onFetchEventsPublicMethod = ({ queryKey }) => {
    const payload = queryKey[1] ? queryKey[1] : { scope: 'hosting' };
    // const payload = queryKey[1] ? queryKey[1] : { scope: 'hosting' };
    return kwivrrApi.getEvents(payload);
};

const onFetchUserInfo = () => {
    return kwivrrApi._getUserAccount({ id: 'me' });
};

const onFetchCreditCards = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getDefaultCreditCard(payload);
};

const onFetchCreditCardsModal = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getPaymentChoices(payload);
};

const onFetchPaymentChoices = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getPaymentChoices(payload);
};

const onFetchEChecks = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getEChecks(payload);
};

const onFetchUserProfile = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getUserProfile(payload);
};

const onFetchPublicProfileProducts = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getFeaturedItems(payload);
};

const onFetchSearchEvents = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._searchEvents(payload);
};

const onFetchSearchUsers = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._searchUsers(payload);
};

const onFetchNotificationSettings = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getUserPreference(payload);
};

const onFetchEvent = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getEvent(payload);
};

const onFetchEventPublic = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getEvent(payload);
};

const onFetchEventCalendar = ({ queryKey }) => {
    // try {
    const payload = queryKey[1];
    // const a = await kwivrrApi._getEventCalendar(payload);
    return kwivrrApi.getEventCalendar(payload);
    // } catch (e) {
    //     alert(JSON.stringify(e.data.error));
    // }
};

const onFetchEventOverview = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getEventOverview(payload);
};

const onFetchDefaultPayoutMethods = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getPayoutMethods(payload);
};

const onFetchEventTicketsAttendee = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getEventGuestTickets(payload);
};

const onFetchEventTicketsHost = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getEventHostTickets(payload);
};

const onFetchUpgradeEventTicketForm = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getEventTicketUpgradeForm(payload);
};
const onFetchFeeds = ({ queryKey }) => {
    const payload = queryKey[1] ? queryKey[1] : {};
    return kwivrrApi.getFeeds(payload);
};

const onFetchEventReceipt = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getEventRecipt(payload);
};

const onFetchRevokeTicketRefundBreakdown = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getRevokeEventTicketRefundBreakdown(payload);
};

const onFetchGetEventTicket = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi._getEventTicket(payload);
};

const onFetchGroups = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getEventGroups(payload);
};

const onFetchEventMessages = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getEventMessages(payload);
};

const onFetchUpcomingHostedEvents = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getUpcomingHostedEvents(payload);
};

const onFetchUpcomingAttendingEvents = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getUpcomingAttendingEvents(payload);
};

const onFetchAttendedEvents = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getAttendedEvents(payload);
};

const onFetchEventTicketHistory = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getEventTicketHistory(payload);
};

const onFetchTicketUpgradeDetails = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getUpgradeEventTicketDetails(payload);
};

const onFetchEventTicket = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getEventTicket(payload);
};

const onFetchSearchSpeakerProfiles = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.searchSpeakerProfilesAndUsers(payload);
};

const onFetchEventSpeakers = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getEventSpeakers(payload);
};

const onFetchEventAttendees = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getEventAttendees(payload);
};

const onFetchNotifications = ({ queryKey }) => {
    const payload = queryKey[1];
    return kwivrrApi.getNotifications(payload);
};

const props = {
    onFetchAttendedEvents,
    onFetchCreditCards,
    onFetchCreditCardsModal,
    onFetchDefaultPayoutMethods,
    onFetchEChecks,
    onFetchEvent,
    onFetchEventAttendees,
    onFetchEventPublic,
    onFetchEventCalendar,
    onFetchEventOverview,
    onFetchEventReceipt,
    onFetchEventTicket,
    onFetchEventTicketsAttendee,
    onFetchEventTicketsHost,
    onFetchEvents,
    onFetchEventSpeakers,
    onFetchEventsPublicMethod,
    onFetchEventMessages,
    onFetchEventTicketHistory,
    onFetchFeeds,
    onFetchGetEventTicket,
    onFetchGroups,
    onFetchNotifications,
    onFetchNotificationSettings,
    onFetchPaymentChoices,
    onFetchPublicProfileProducts,
    onFetchRevokeTicketRefundBreakdown,
    onFetchSearchEvents,
    onFetchSearchUsers,
    onFetchSearchSpeakerProfiles,
    onFetchTicketUpgradeDetails,
    onFetchUpcomingAttendingEvents,
    onFetchUpcomingHostedEvents,
    onFetchUpgradeEventTicketForm,
    onFetchUserInfo,
    onFetchUserProfile,
};

export default props;
