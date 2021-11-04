export const getNotificationMessage = (type, messageVars) => {
    const Notifications = {
        event_ready_to_sell: () => 'Your event is ready to book!',
        ticket_event_reminder_24_hours: ({ host_name }) => {
            return `${host_name}’s event is a day away`;
        },
        ticket_event_reminder_1_hour: ({ host_name }) => {
            return `${host_name}’s event starts in an hour`;
        },
        ticket_event_live: ({ host_name }) => {
            return `${host_name}’s event is live`;
        },
        ticket_transferred_recipient: ({ purchaser_name }) => {
            return `${purchaser_name} sent you a ticket`;
        },
        ticket_transferred_original: ({ recipient_name }) => {
            return `You sent a ticket to ${recipient_name}`;
        },
        ticket_transferred_claimed: ({ recipient_name }) => {
            return `${recipient_name} accepted your ticket`;
        },
        account_event_manage_invite: ({ event_name, host_name }) => {
            return `You are invited to manage Event ${event_name} by ${host_name}`;
        },
    };
    return Notifications[type](messageVars);
};
