import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';
import NotificationSection from '../NotificationSection';
import TextRegular from 'kwivrr-ui/TextRegular';
import {
    formatDate,
    notificationsHeaderDateFormat,
} from 'kwivrr-common/dateFormats';
import TextHeader from 'kwivrr-ui/TextHeader';
import Notification from '../Notification';
import { groupBy, orderBy } from 'lodash';
import moment from 'moment';

function NotificationsContainer({ data, navigationRef, initialNotifications }) {
    const classes = useStyles(styles);
    const hasNotifications = !!initialNotifications.length;

    const notificationsObj = useMemo(() => {
        const dateOrderedNotifications = orderBy(
            initialNotifications,
            ['createdAt'],
            ['desc']
        );
        return groupBy(dateOrderedNotifications, function (notification) {
            return moment(notification.createdAt).format('MM/DD/YYYY');
        });
        return initialNotifications.reduce((acc, notification, idx) => {
            const createdAtFull = new Date(notification.createdAt);

            const date = formatDate(createdAtFull);
            acc[date] = {
                stamp: createdAtFull,
                notifications: acc[date]?.notifications.length
                    ? [...acc[date].notifications, notification]
                    : [notification],
            };
            return acc;
        }, {});
    }, [initialNotifications]);

    // console.log(notificationsObj);

    // return <></>;

    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isYesterday = (date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        return (
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
        );
    };

    const getDateHeader = (date) => {
        if (isToday(new Date(date))) return 'Today';
        if (isYesterday(new Date(date))) return 'Yesterday';
        return notificationsHeaderDateFormat(date);
    };

    if (!hasNotifications) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextRegular size={16}>No notifications to show</TextRegular>
            </View>
        );
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={classes.scrollView}
            contentContainerStyle={classes.contentContainerStyle}
        >
            {hasNotifications &&
                Object.keys(notificationsObj).map((item) => {
                    console.log('itemin', notificationsObj[item]);
                    return (
                        <View key={item}>
                            <TextHeader style={classes.title} size={18}>
                                {getDateHeader(item)}
                            </TextHeader>
                            {notificationsObj[item].map((notification) => (
                                <Notification
                                    item={notification}
                                    key={notification.id}
                                    onClose={() => {}}
                                    navigationRef={navigationRef}
                                />
                            ))}
                        </View>
                    );
                })}
            {/* {initialNotifications.map((item, index) => {
                return (
                    <NotificationSection
                        key={index}
                        navigationRef={navigationRef}
                        item={item}
                        index={index}
                    />
                );
            })} */}
        </ScrollView>
    );
}

export default NotificationsContainer;
