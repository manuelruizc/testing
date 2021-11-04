import faker, { company } from 'faker';
import _ from 'lodash';
import moment from 'moment';
import delayResolve from 'kwivrr-common/delayResolve';
import {
    ACCOUNT_PERMISSION_NOTIFICATIONS,
    EVENT_NOTIFICATIONS,
    KWIVRR_MARKETING_NOTIFICATIONS,
    NOTIFICATION_CATEGORY,
    TICKET_NOTIFICATIONS,
} from '../types/notifications';

function createNotificationMessage(template) {
    const {
        image: { avatar },
        name: { findName },
        datatype: { uuid, number },
        company: { companyName },
        internet: { email },
    } = faker;

    const messages = {
        [ACCOUNT_PERMISSION_NOTIFICATIONS.EVENTMANAGER]: {
            message: '{{host_name}} Needs your help with \n{{event_name}}',
            message_vars: {
                host_name: findName(),
                event_name: companyName(),
            },
        },
        [EVENT_NOTIFICATIONS.EVENT_LIVE]: {
            message: "{{host_name}}'s event is live \n{{event_name}}",
            message_vars: {
                host_name: findName(),
                event_name: companyName(),
            },
        },
        [EVENT_NOTIFICATIONS.READY_TO_SELL]: {
            message: 'Your event is ready to sell \n{{event_name}}',
            message_vars: {
                event_name: companyName(),
            },
        },
        [EVENT_NOTIFICATIONS.REMINDER_1_HOUR]: {
            message: "{{host_name}}'s event is an hour away \n{{event_name}}",
            message_vars: {
                host_name: findName(),
                event_name: companyName(),
            },
        },
        [EVENT_NOTIFICATIONS.REMINDER_24_HOUR]: {
            message: "{{host_name}}'s event is a day away \n{{event_name}}",
            message_vars: {
                host_name: findName(),
                event_name: companyName(),
            },
        },
        [KWIVRR_MARKETING_NOTIFICATIONS.MARKETING]: {
            message: 'Kwivrr update 2.0 is now live',
            message_vars: {},
        },
        [TICKET_NOTIFICATIONS.TRANSFERRED]: {
            message:
                'You sent a ticket to {{recipient_email}} \n{{event_name}}',
            message_vars: {
                host_name: findName(),
                recipient_email: email(),
                event_name: companyName(),
            },
        },
        [TICKET_NOTIFICATIONS.TRANSFERRED_CLAIMED]: {
            message:
                '{{recipient_name}} accepted your ticket to\n{{event_link}}',
            message_vars: {
                recipient_name: findName(),
                event_link: companyName(),
            },
        },
    };
    const info = messages[template];
    const result = {
        message: info.message,
        // '{{recipient_avatar}} {{recipient_name}} accepted your ticket to\n{{event_link}} {{event_time}}',
        message_vars: {
            recipient_avatar: {
                type: 'avatar',
                asset_path:
                    template === KWIVRR_MARKETING_NOTIFICATIONS.MARKETING
                        ? require('kwivrr-assets/logo/Icon/JPG/Kwivrr_Icon_Reverse_GradientBG.jpg')
                        : avatar(),
            },
            event_link: {
                text: 'test',
                id: uuid(),
                type: 'event',
                resource_path: '/api/v1/events/1127',
            },
            ...info.message_vars,
        },
    };
    return result;
}

function createNotifications() {
    const {
        datatype: { number, uuid, boolean },
        name: { findName },
    } = faker;
    const times = [
        moment(new Date()).subtract(5, 'days'),
        moment(new Date()).subtract(4, 'days'),
        moment(new Date()).subtract(3, 'days'),
        moment(new Date()).subtract(2, 'days'),
        moment(new Date()).subtract(1, 'days'),
        moment(new Date()),
    ];
    const categories = [
        NOTIFICATION_CATEGORY.ACCOUNT,
        NOTIFICATION_CATEGORY.EVENT,
        NOTIFICATION_CATEGORY.KWIVRR,
        NOTIFICATION_CATEGORY.TICKET,
    ];
    const templates = {
        [NOTIFICATION_CATEGORY.ACCOUNT]: [
            ACCOUNT_PERMISSION_NOTIFICATIONS.EVENTMANAGER,
        ],
        [NOTIFICATION_CATEGORY.EVENT]: [
            EVENT_NOTIFICATIONS.EVENT_LIVE,
            EVENT_NOTIFICATIONS.READY_TO_SELL,
            EVENT_NOTIFICATIONS.REMINDER_1_HOUR,
            EVENT_NOTIFICATIONS.REMINDER_24_HOUR,
        ],
        [NOTIFICATION_CATEGORY.KWIVRR]: [
            KWIVRR_MARKETING_NOTIFICATIONS.MARKETING,
        ],
        [NOTIFICATION_CATEGORY.TICKET]: [
            TICKET_NOTIFICATIONS.TRANSFERRED,
            TICKET_NOTIFICATIONS.TRANSFERRED_CLAIMED,
        ],
    };

    const numberOfNotifications = number({ min: 12, max: 34 });
    const response = [];
    let todayDatesCounter = 0;
    function getEventTime() {
        let time = times[number({ min: 0, max: times.length - 1 })];
        const isToday =
            moment(new Date()).format('MM-DD-YYYY') ==
            moment(time).format('MM-DD-YYYY');
        const modify = !(isToday && todayDatesCounter === 0);
        if (isToday && todayDatesCounter === 0) {
            todayDatesCounter++;
        }
        if (!modify) return time;
        const add = isToday ? false : boolean();
        const hours = number({ min: 1, max: 14 });
        const timeModify = add
            ? moment(time).add(hours, hours > 1 ? 'hours' : 'hour')
            : moment(time).subtract(hours, hours > 1 ? 'hours' : 'hour');
        return timeModify;
    }
    for (let i = 0; i < numberOfNotifications; i++) {
        const category = categories[number({ min: 0, max: 3 })];
        let template = templates[category];
        template = template[number({ min: 0, max: template.length - 1 })];
        const messageVars = createNotificationMessage(template);
        const event_time = getEventTime();
        const obj = {
            id: uuid(),
            type: 'notification',
            attributes: {
                category,
                template,
                is_dismissed: false,
                ...messageVars,
            },
            event_time,
            order_event_time: moment(event_time).format('YYYY-MM-DD'),
            relationships: {
                user: {
                    data: {
                        id: '5267',
                        type: 'user',
                    },
                },
                notifiable: {
                    data: {
                        id: '6403',
                        type: 'event_ticket',
                    },
                },
            },
        };
        response.push(obj);
    }

    let notifications = _.chain(response)
        // Group the elements of Array based on `color` property
        .groupBy('order_event_time')
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
            value.sort(
                (d1, d2) =>
                    new Date(d2.event_time).getTime() -
                    new Date(d1.event_time).getTime()
            );
            return { date: key, notifications: value };
        })
        .value();
    // notifications = _.orderBy(notifications, ['date'], ['desc']);
    notifications.sort(
        (d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime()
    );
    return notifications;
}

export async function fetchUserNotifications() {
    return createNotifications();
}
