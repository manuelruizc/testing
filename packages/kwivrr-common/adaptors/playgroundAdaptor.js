import { getRandomFutureDate } from './playgroundHelpers';
import {
    eventsList,
    eventSearchResults,
    userSearchResults,
    userManagementSearchResults,
    attendeeSearchResults,
    notificationsList,
    getMyEventsList,
    hostTicketsList,
    userInfo,
    getPublicProfileUpcomingAttending,
    getPublicProfileUpcomingHosting,
    getPublicProfileAttendedEvents,
    ticketsList,
    getPublicProfileProducts,
    getPublicProfileFootage,
    languageList,
    futurePublicEventsList,
    usersList,
    surveysList,
    hostTicketOverview,
    paymentMethodsList,
    bankList,
    livestream,
    livestreamViewers,
    creditProfileInfo,
    creditHistory,
    notificationPreferences,
} from './playgroundData';
import { fetchUserNotifications } from 'kwivrr-common/data/fetch/notifications';
import delayResolve, { delayResolveData } from '../delayResolve';
import { userProfileInfo } from '../data/fetch/userprofile';
import { createUpcomingEvents } from '../data/fetch/events';
import { getFeaturedItems } from '../data/fetch/featureditems';
import { createGroupEvents } from '../data/fetch/groupevents';

const getUuid = () => Math.random();

const onFetchEvents = () => {
    return delayResolveData(eventsList);
};

const onFetchFuturePublicEvents = (adaptorPayload) => () => {
    console.log('##adaptorPayload', adaptorPayload);
    const {
        delayResolve,
        services: { kwivrrApi },
    } = adaptorPayload;

    console.log('##kwivrrApi', kwivrrApi);

    return delayResolve(futurePublicEventsList);
};

const onFetchNotifications = () => {
    return delayResolveData(fetchUserNotifications());
};

const onFetchCreditCards = () => {
    return delayResolveData([]);
};

const onFetchBankingInformation = () => {
    return delayResolveData([
        {
            id: 12312312,
            type: 'username',
            handler: 'meganhnedricks',
            brand: 'venmo',
            paymentType: 'online',
            defaultOption: true,
        },
        {
            id: 11239123,
            type: 'username',
            handler: 'meganhendricks',
            brand: 'cashapp',
            paymentType: 'online',
            defaultOption: false,
        },
    ]);
};

const onFetchEvent =
    ({ delayResolve }) =>
    (id) => {
        return delayResolve({
            ...eventsList.find((item) => item.id === parseInt(id)),
        });
    };

const onFetchMyEvents =
    ({ delayResolve }) =>
    () => {
        return delayResolve(getMyEventsList());
    };

const onFetchUserProfile = () => {
    return delayResolveData(userProfileInfo);
};

const onFetchPublicProfileUpcomingHosting = ({ queryKey }) => {
    //  const { id } = queryKey[1];
    return delayResolveData(createUpcomingEvents());
};

const onFetchPublicProfileUpcomingAttending = ({ queryKey }) => {
    //  const { id } = queryKey[1];
    return delayResolveData(createUpcomingEvents());
};

const onFetchPublicProfileAttendedEvents = ({ queryKey }) => {
    //  const { id } = queryKey[1];
    return delayResolveData(createUpcomingEvents());
};

const onFetchPublicProfileProducts = ({ queryKey }) => {
    //  const { id } = queryKey[1];
    return delayResolveData(getFeaturedItems());
};

const onFetchPublicProfileFootage =
    ({ delayResolve }) =>
    (userId) => {
        return delayResolve(getPublicProfileFootage(userId));
    };

const onFetchCreditProfileInfo =
    ({ delayResolve }) =>
    (userId) => {
        return delayResolve(creditProfileInfo);
    };

const onFetchCreditHistory =
    ({ delayResolve }) =>
    (userId) => {
        return delayResolve(creditHistory);
    };

const onFetchHostTickets =
    ({ delayResolve }) =>
    (eventId) => {
        return delayResolve(hostTicketsList(eventId));
    };

const onFetchTicketDetails =
    ({ delayResolve }) =>
    (eventId) => {
        return delayResolve({
            ...eventsList.find((item) => item.id === parseInt(eventId)),
            tickets: ticketsList,
        });
    };

const onFetchPurchaseTicketDetails =
    ({ delayResolve }) =>
    ({ isUpgrading, eventId, numTickets, ticketType, balancePaid }) => {
        const event = eventsList.find(({ id }) => id === parseInt(eventId));
        const format = (amount) => `$${amount.toFixed(2)}`;
        const generalTicketPrice = event.ticketData.ga.price;
        const vipTicketPrice = event.ticketData.vip.price;
        const ticketPrice =
            ticketType === 'general' ? generalTicketPrice : vipTicketPrice;
        const ticketTotal = ticketPrice * numTickets;
        const subtotal = isUpgrading
            ? ticketPrice * numTickets - generalTicketPrice
            : ticketPrice * numTickets;
        const serviceFee = 2.5;
        const tax = numTickets * 0.6;
        let total = subtotal + serviceFee + tax;
        if (isUpgrading) total = total - generalTicketPrice;

        const ret = {
            numTickets: numTickets,
            ticketType,
            ticketTotal: format(ticketTotal),
            ticketPrice: format(ticketPrice),
            subtotal: format(subtotal),
            serviceFee: format(serviceFee),
            tax: format(tax),
            total: format(total),
            generalTicketPrice: `-${format(generalTicketPrice)}`,
        };

        return delayResolve(ret);
    };

const onFetchUserManagementSearchResults =
    ({ delayResolve }) =>
    (searchTerm) => {
        return delayResolve(userManagementSearchResults);
    };

const onFetchAttendeeSearchResults =
    ({ delayResolve }) =>
    ({ searchTerm, startDate, endDate }) => {
        return delayResolve(attendeeSearchResults);
    };

const onFetchEventSearchResults =
    ({ delayResolve }) =>
    (searchTerm) => {
        return delayResolve(eventSearchResults);
    };

const onFetchUserSearchResults =
    ({ delayResolve }) =>
    (searchTerm) => {
        return delayResolve(userSearchResults);
    };

const onSearchSubmit =
    ({ delayResolve }) =>
    (term) => {
        return delayResolve();
    };

const onSellCustomTicket =
    ({ delayResolve }) =>
    (customTicketDetails) => {
        return delayResolve();
    };

const onTransferTicket =
    ({ delayResolve }) =>
    (transferDetails) => {
        return delayResolve();
    };

const onReclaimTicket =
    ({ delayResolve }) =>
    (transferDetails) => {
        return delayResolve();
    };

const onAssignCredentialId =
    ({ delayResolve }) =>
    (credentialIdDetails) => {
        return delayResolve();
    };

const onCancelTicket =
    ({ delayResolve }) =>
    (cancelTicketDetails) => {
        return delayResolve();
    };

const onDeleteEvent =
    ({ delayResolve }) =>
    (eventId) => {
        return delayResolve();
    };

const onChangeUserName =
    ({ delayResolve }) =>
    (newUserName) => {
        return delayResolve();
    };

const onChangeUserAvatar =
    ({ delayResolve }) =>
    ({ userId, avatarUrl }) => {
        return delayResolve();
    };

const onChangeUserBanner =
    ({ delayResolve }) =>
    ({ userId, bannerUrl }) => {
        return delayResolve();
    };

const onAddShopItem =
    ({ delayResolve }) =>
    ({ userId, product }) => {
        return delayResolve();
    };

const onAddCreditCard =
    ({ delayResolve }) =>
    ({ userId, fullCard }) => {
        return delayResolve();
    };

const onAddBankAccount =
    ({ delayResolve }) =>
    ({ userId, newBankAccount }) => {
        return delayResolve();
    };

const onChangeUserTagline =
    ({ delayResolve }) =>
    (newUserTagline) => {
        return delayResolve();
    };

const onChangeUserPassword =
    ({ delayResolve }) =>
    (newUserPassword) => {
        return delayResolve();
    };

const onChangeUserEmail =
    ({ delayResolve }) =>
    (newUserEmail) => {
        return delayResolve();
    };

const onChangeUserPhone =
    ({ delayResolve }) =>
    (newUserPhone) => {
        return delayResolve();
    };

const onChangeShopLink =
    ({ delayResolve }) =>
    (newShopLink) => {
        return delayResolve();
    };

const onChangeFacebookLink =
    ({ delayResolve }) =>
    (newFacebookLink) => {
        return delayResolve();
    };

const onChangeInstagramLink =
    ({ delayResolve }) =>
    (newInstagramLink) => {
        return delayResolve();
    };

const onChangeTwitterLink =
    ({ delayResolve }) =>
    (newTwitterLink) => {
        return delayResolve();
    };

const onFetchUserInfo = ({ queryKey }) => {
    const { id } = queryKey[1];
    return delayResolveData(userInfo);
};

const onFetchLanguageList =
    ({ delayResolve }) =>
    () => {
        return delayResolve(languageList);
    };

const onFetchBankList =
    ({ delayResolve }) =>
    () => {
        return delayResolve(bankList);
    };

const onLogin =
    ({ delayResolve }) =>
    ({ username, password }) => {
        return delayResolve({
            accessToken: '12345access',
            refreshToken: '456refresh',
            expires: 7200,
            created: 1623081467,
        });
    };

const onLogout =
    ({ delayResolve }) =>
    () => {
        return delayResolve();
    };

const onCheckInTicket =
    ({ delayResolve }) =>
    ({ eventId, orderId }) => {
        return delayResolve();
    };

const onUncheckInTicket =
    ({ delayResolve }) =>
    ({ eventId, orderId }) => {
        return delayResolve();
    };

const onUpgradeTicket =
    ({ delayResolve }) =>
    ({ eventId, orderId }) => {
        return delayResolve();
    };

const onSearchUsers =
    ({ delayResolve }) =>
    (term) => {
        return delayResolve(usersList);
    };

const onFetchSurveys =
    ({ delayResolve }) =>
    (eventId) => {
        return delayResolve(surveysList);
    };

const onFetchHostTicketOverview =
    ({ delayResolve }) =>
    (eventId) => {
        return delayResolve(hostTicketOverview);
    };

const onFetchUserPaymentMethods =
    ({ delayResolve }) =>
    (userId) => {
        return delayResolve(paymentMethodsList);
    };

const onFetchLivestream =
    ({ delayResolve }) =>
    (eventId) => {
        return delayResolve(livestream);
    };

const onFetchLivestreamViewers =
    ({ delayResolve }) =>
    (eventId) => {
        return delayResolve(livestreamViewers);
    };

const onFetchNotificationPreferences =
    ({ delayResolve }) =>
    (userId) => {
        return delayResolve(notificationPreferences);
    };

const onUpdateNotificationPreferences =
    ({ delayResolve }) =>
    (userId) => {
        return delayResolve();
    };

const onAddSurvey =
    ({ delayResolve }) =>
    ({ survey, eventId }) => {
        const hasAnswerChoices = survey.answerChoices.length;
        return delayResolve({
            id: getUuid(),
            type: hasAnswerChoices ? 'poll' : 'open',
            questionText: survey.questionText,
            results: hasAnswerChoices
                ? survey.answerChoices.map((choice, idx) => ({
                      id: idx,
                      label: choice,
                      percentChosen: 0,
                      isMostChosen: false,
                  }))
                : [],
        });
    };

const onDeleteSurvey =
    ({ delayResolve }) =>
    ({ survey, eventId }) => {
        return delayResolve();
    };

const onDeleteCreditCard =
    ({ delayResolve }) =>
    ({ creditCardId, userId }) => {
        return delayResolve();
    };

const onDeleteBankAccount =
    ({ delayResolve }) =>
    ({ bankAccountId, userId }) => {
        return delayResolve();
    };

const onCreateUser =
    ({ delayResolve }) =>
    (payload) => {
        return delayResolve();
    };

const onCreateEvent =
    ({ delayResolve }) =>
    (payload) => {
        return delayResolve();
    };

const onGiveCredits =
    ({ delayResolve }) =>
    (payload) => {
        return delayResolve({
            id: getUuid(),
            dateProvided: new Date(),
            expiry: getRandomFutureDate(),
            usage: 'Lorem',
            ...payload,
        });
    };

const onFetchGroups = ({ queryKey }) => {
    //  const { id } = queryKey[1];
    return delayResolveData(createGroupEvents());
};

const props = {
    onFetchEvents,
    onFetchNotifications,
    onFetchHostTickets,
    onFetchEvent,
    onFetchMyEvents,
    onFetchTicketDetails,
    onFetchEventSearchResults,
    onFetchUserSearchResults,
    onSearchSubmit,
    onChangeUserName,
    onChangeUserAvatar,
    onFetchPublicProfileUpcomingHosting,
    onFetchPublicProfileUpcomingAttending,
    onFetchPublicProfileAttendedEvents,
    onFetchPublicProfileProducts,
    onFetchPublicProfileFootage,
    onLogin,
    onFetchUserInfo,
    onFetchPurchaseTicketDetails,
    onFetchLanguageList,
    onSellCustomTicket,
    onTransferTicket,
    onReclaimTicket,
    onAssignCredentialId,
    onDeleteEvent,
    onFetchFuturePublicEvents,
    onCancelTicket,
    onChangeUserEmail,
    onChangeUserTagline,
    onChangeUserPassword,
    onCheckInTicket,
    onUncheckInTicket,
    onUpgradeTicket,
    onChangeUserPhone,
    onChangeShopLink,
    onChangeTwitterLink,
    onChangeFacebookLink,
    onChangeInstagramLink,
    onChangeUserBanner,
    onAddShopItem,
    onSearchUsers,
    onFetchSurveys,
    onFetchHostTicketOverview,
    onFetchUserPaymentMethods,
    onAddCreditCard,
    onFetchBankList,
    onAddBankAccount,
    onLogout,
    onFetchLivestream,
    onFetchLivestreamViewers,
    onAddSurvey,
    onDeleteSurvey,
    onDeleteCreditCard,
    onDeleteBankAccount,
    onCreateUser,
    onCreateEvent,
    onFetchUserManagementSearchResults,
    onFetchAttendeeSearchResults,
    onFetchCreditProfileInfo,
    onFetchCreditHistory,
    onGiveCredits,
    onFetchNotificationPreferences,
    onUpdateNotificationPreferences,
    onFetchUserProfile,
    onFetchGroups,
    onFetchBankingInformation,
};

export default props;
