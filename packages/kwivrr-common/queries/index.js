import adaptors from 'kwivrr-common/adaptors';

const queries = {
    getFeeds: adaptors.onFetchFeeds,
    getUpgradeTicketForm: adaptors.onFetchUpgradeEventTicketForm,
    getEventTicketsAttendee: adaptors.onFetchEventTicketsAttendee,
    getEventTicketsHost: adaptors.onFetchEventTicketsHost,
    getDefaultCreditCards: adaptors.onFetchCreditCards,
    getDefaultCreditCardsBuyTicket: adaptors.onFetchCreditCardsModal,
    getDefaultEChecks: adaptors.onFetchEChecks,
    getEvents: adaptors.onFetchEvents,
    getEventsPublic: adaptors.onFetchEventsPublicMethod,
    getEvent: adaptors.onFetchEvent,
    getEventPublicMethod: adaptors.onFetchEventPublic,
    getEventTicketHistory: adaptors.onFetchEventTicketHistory,
    getGroupEvents: adaptors.onFetchGroups,
    getBankingAccounts: adaptors.onFetchBankingInformation,
    getSearchEvents: adaptors.onFetchSearchEvents,
    getSearchUsers: adaptors.onFetchSearchUsers,
    getNotifications: adaptors.onFetchNotifications,
    getPublicProfileUpcomingHosting:
        adaptors.onFetchPublicProfileUpcomingHosting,
    getPublicProfileUpcomingAttending:
        adaptors.onFetchPublicProfileUpcomingAttending,
    getPublicProfileAttendedEvents: adaptors.onFetchPublicProfileAttendedEvents,
    getPublicProfileProducts: adaptors.onFetchPublicProfileProducts,
    getPaymentChoices: adaptors.onFetchPaymentChoices,
    getNotificationsSettings: adaptors.onFetchNotificationSettings,
    getEventCalendar: adaptors.onFetchEventCalendar,
    getEventOverview: adaptors.onFetchEventOverview,
    getRevokeTicketRefundBreakdown: adaptors.onFetchRevokeTicketRefundBreakdown,
    getDefaultPayoutMethods: adaptors.onFetchDefaultPayoutMethods,
    getEventAttendees: adaptors.onFetchEventAttendees,
    // getEventTicket: adaptors.onFetchGetEventTicket,
    getUpcomingHostedEvents: adaptors.onFetchUpcomingHostedEvents,
    getUpcomingAttendingEvents: adaptors.onFetchUpcomingAttendingEvents,
    getAttendedEvents: adaptors.onFetchAttendedEvents,
    getUpgradeEventTicketDetails: adaptors.onFetchTicketUpgradeDetails,
    getEventTicket: adaptors.onFetchEventTicket,
    searchSpeakers: adaptors.onFetchSearchSpeakerProfiles,
    getEventSpeakers: adaptors.onFetchEventSpeakers,
    getPublicProfileFootage:
        ({ onFetchPublicProfileFootage, queryPrefix }) =>
        (userId) => ({
            payload: {
                func: () => onFetchPublicProfileFootage(userId),
            },
            payloadKey: `${queryPrefix}onFetchPublicProfileFootage(${userId})`,
            basePayloadKey: `${queryPrefix}onFetchPublicProfileFootage`,
        }),
    getNotificationPreferences:
        ({ onFetchNotificationPreferences, queryPrefix }) =>
        (userId) => ({
            payload: {
                func: () => onFetchNotificationPreferences(userId),
            },
            payloadKey: `${queryPrefix}onFetchNotificationPreferences(${userId})`,
            basePayloadKey: `${queryPrefix}onFetchNotificationPreferences`,
            listenFor: (payload) => {
                const { event, helpers } = payload;
                switch (event.eventCode) {
                    case 'NOTIFICATION_PREFERENCES_UPDATED': {
                        return helpers.updateQueryData((data) => ({
                            ...data,
                            ...event.payload,
                        }));
                    }
                }
            },
        }),
    getCreditProfileInfo:
        ({ onFetchCreditProfileInfo, queryPrefix }) =>
        (userId) => ({
            payload: {
                func: () => onFetchCreditProfileInfo(userId),
            },
            payloadKey: `${queryPrefix}onFetchCreditProfileInfo(${userId})`,
            basePayloadKey: `${queryPrefix}onFetchCreditProfileInfo`,
            listenFor: (payload) => {
                const { event, helpers } = payload;
                switch (event.eventCode) {
                    case 'CREDITS_GIVEN': {
                        return helpers.updateQueryData((data) => {
                            const ret = {
                                ...data,
                                numCredits:
                                    data.numCredits + event.payload.numCredits,
                            };
                            return ret;
                        });
                    }
                }
            },
        }),
    getCreditHistory:
        ({ onFetchCreditHistory, queryPrefix }) =>
        (userId) => ({
            payload: {
                func: () => onFetchCreditHistory(userId),
            },
            payloadKey: `${queryPrefix}onFetchCreditHistory(${userId})`,
            basePayloadKey: `${queryPrefix}onFetchCreditHistory`,
            listenFor: (payload) => {
                const { event, helpers } = payload;
                switch (event.eventCode) {
                    case 'CREDITS_GIVEN': {
                        return helpers.updateQueryData((data) => {
                            data.creditHistory.push(event.payload);
                            return data;
                        });
                    }
                }
            },
        }),
    getMyEvents:
        ({ onFetchMyEvents, queryPrefix }) =>
        () => ({
            payload: {
                func: () => onFetchMyEvents(),
            },
            payloadKey: `${queryPrefix}onFetchMyEvents()`,
            basePayloadKey: `${queryPrefix}onFetchMyEvents`,
        }),
    getTicketDetails:
        ({ onFetchTicketDetails, queryPrefix }) =>
        (eventId) => ({
            payload: {
                func: () => onFetchTicketDetails(eventId),
            },
            payloadKey: `${queryPrefix}onFetchTicketDetails(${eventId})`,
            basePayloadKey: `${queryPrefix}onFetchTicketDetails`,
        }),
    getPurchaseTicketDetails:
        ({ onFetchPurchaseTicketDetails, queryPrefix }) =>
        ({ isUpgrading, eventId, numTickets, ticketType }) => ({
            payload: {
                func: () =>
                    onFetchPurchaseTicketDetails({
                        isUpgrading,
                        eventId,
                        numTickets,
                        ticketType,
                    }),
            },
            payloadKey: `${queryPrefix}onFetchPurchaseTicketDetails({ isUpgrading: ${isUpgrading}, eventId: ${eventId}, numTickets: ${numTickets}, ticketType: ${ticketType}})`,
            basePayloadKey: `${queryPrefix}onFetchPurchaseTicketDetails`,
        }),
    getHostTickets:
        ({ onFetchHostTickets, queryPrefix }) =>
        (eventId) => ({
            payload: {
                func: () => onFetchHostTickets(eventId),
            },
            payloadKey: `${queryPrefix}onFetchHostTickets(${eventId})`,
            basePayloadKey: `${queryPrefix}onFetchHostTickets`,
        }),
    getUserManagementSearchResults:
        ({ onFetchUserManagementSearchResults, queryPrefix }) =>
        (searchTerm) => ({
            payload: {
                func: () => onFetchUserManagementSearchResults({ searchTerm }),
            },
            payloadKey: `${queryPrefix}onFetchUserManagementSearchResults(${searchTerm})`,
            basePayloadKey: `${queryPrefix}onFetchUserManagementSearchResults`,
        }),
    getAttendeeSearchResults:
        ({ onFetchAttendeeSearchResults, queryPrefix }) =>
        ({ searchTerm, startDate, endDate }) => ({
            payload: {
                func: () =>
                    onFetchAttendeeSearchResults({
                        searchTerm,
                        startDate,
                        endDate,
                    }),
            },
            payloadKey: `${queryPrefix}onFetchAttendeeSearchResults({ searchTerm: ${searchTerm}, startDate: ${startDate}, endDate: ${endDate},)`,
            basePayloadKey: `${queryPrefix}onFetchAttendeeSearchResults`,
        }),
    getEventSearchResults:
        ({ onFetchEventSearchResults, queryPrefix }) =>
        (searchTerm) => ({
            payload: {
                func: () => onFetchEventSearchResults({ searchTerm }),
            },
            payloadKey: `${queryPrefix}onFetchEventSearchResults(${searchTerm})`,
            basePayloadKey: `${queryPrefix}onFetchEventSearchResults`,
        }),
    getUserSearchResults:
        ({ onFetchUserSearchResults, queryPrefix }) =>
        (searchTerm) => ({
            payload: {
                func: () => onFetchUserSearchResults({ searchTerm }),
            },
            payloadKey: `${queryPrefix}onFetchUserSearchResults(${searchTerm})`,
            basePayloadKey: `${queryPrefix}onFetchUserSearchResults`,
        }),
    getUserProfile: adaptors.onFetchUserProfile,
    getEventReceipt: adaptors.onFetchEventReceipt,
    getLanguageList:
        ({ onFetchLanguageList, queryPrefix }) =>
        () => ({
            payload: onFetchLanguageList,
            payloadKey: `${queryPrefix}onFetchLanguageList`,
        }),
    getBankList:
        ({ onFetchBankList, queryPrefix }) =>
        () => ({
            payload: onFetchBankList,
            payloadKey: `${queryPrefix}onFetchBankList`,
        }),
    getUserInfo: adaptors.onFetchUserInfo,
    getUserPaymentMethods:
        ({ onFetchUserPaymentMethods, queryPrefix }) =>
        () => ({
            payload: onFetchUserPaymentMethods,
            payloadKey: `${queryPrefix}onFetchUserPaymentMethods`,
            listenFor: (payload) => {
                const { event, helpers } = payload;
                switch (event.eventCode) {
                    case 'BANK_ACCOUNT_ADDED': {
                        return helpers.updateQueryData((data) => ({
                            ...data,
                            bankAccounts: [
                                ...data.bankAccounts,
                                event.payload.bankAccount,
                            ],
                        }));
                    }
                    case 'BANK_ACCOUNT_DELETED': {
                        const { bankAccountId } = event.payload;
                        return helpers.updateQueryData((data) => {
                            return {
                                ...data,
                                bankAccounts: data.bankAccounts.filter(
                                    (acct) => acct.id !== bankAccountId
                                ),
                            };
                        });
                    }
                    case 'CREDIT_CARD_ADDED': {
                        return helpers.updateQueryData((data) => ({
                            ...data,
                            creditCards: [
                                ...data.creditCards,
                                event.payload.fullCard,
                            ],
                        }));
                    }
                    case 'CREDIT_CARD_DELETED': {
                        const { creditCardId } = event.payload;
                        return helpers.updateQueryData((data) => {
                            return {
                                ...data,
                                creditCards: data.creditCards.filter(
                                    (card) => card.id !== creditCardId
                                ),
                            };
                        });
                    }
                }
            },
        }),
    getSurveys:
        ({ onFetchSurveys, queryPrefix }) =>
        (eventId) => ({
            payload: {
                func: () => onFetchSurveys(eventId),
            },
            payloadKey: `${queryPrefix}onFetchSurveys(${eventId})`,
            basePayloadKey: `${queryPrefix}onFetchSurveys`,
            listenFor: (payload) => {
                const { event, helpers } = payload;
                switch (event.eventCode) {
                    case 'SURVEY_ADDED': {
                        return helpers.updateQueryData((data) => {
                            data.unshift(event.payload.survey);
                            return data;
                        });
                    }
                    case 'SURVEY_DELETED': {
                        const { surveyId } = event.payload;
                        return helpers.updateQueryData((data) => {
                            return data.filter(
                                (survey) => survey.id !== surveyId
                            );
                        });
                    }
                }
            },
        }),
    getHostTicketOverview:
        ({ onFetchHostTicketOverview, queryPrefix }) =>
        (eventId) => ({
            payload: {
                func: () => onFetchHostTicketOverview(eventId),
            },
            payloadKey: `${queryPrefix}onFetchHostTicketOverview(${eventId})`,
            basePayloadKey: `${queryPrefix}onFetchHostTicketOverview`,
        }),
    getLivestream:
        ({ onFetchLivestream, queryPrefix }) =>
        (eventId) => ({
            payload: {
                func: () => onFetchLivestream(eventId),
            },
            payloadKey: `${queryPrefix}onFetchLivestream(${eventId})`,
            basePayloadKey: `${queryPrefix}onFetchLivestream`,
        }),
    getLivestreamViewers:
        ({ onFetchLivestreamViewers, queryPrefix }) =>
        (eventId) => ({
            payload: {
                func: () => onFetchLivestreamViewers(eventId),
            },
            payloadKey: `${queryPrefix}onFetchLivestreamViewers(${eventId})`,
            basePayloadKey: `${queryPrefix}onFetchLivestreamViewers`,
        }),
};

export default queries;
