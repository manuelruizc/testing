import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import { TouchableOpacity, View } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import Touchable from 'kwivrr-ui/Touchable';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { createMessage, createTimeString } from './utils';
import {
    EVENT_NOTIFICATIONS,
    TICKET_NOTIFICATIONS,
} from 'kwivrr-common/data/types/notifications';
import { HOME, STACKS } from 'kwivrr-common/data/types/navigation';
import { useDropdowns } from 'kwivrr-common/MiniModalsContext';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import { getNotificationMessage } from './helper';
import { formatDate, formatDateOnlyTime } from 'kwivrr-common/dateFormats';
import Avatar from 'kwivrr-ui/Avatar';
import useTheme from 'kwivrr-hooks/useTheme';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function Notification({ item, dateTitle, navigationRef }) {
    const { userInfo } = useAuthCredentials();
    const {
        createdAt,
        eventId,
        eventName,
        type,
        withAttendingIcon,
        avatar,
        translationVars,
        eventTextColor,
    } = item;
    const classes = useStyles(styles, { linkTitle: false });
    const { closeNotifications } = useDropdowns();
    const { palette } = useTheme();
    const eventTextColors = {
        green: 'green',
        primary: palette.button.primary,
        default: palette.common.black,
    };
    // const { attributes } = item;
    // const { message_vars, message, template } = attributes;
    // const { recipient_avatar } = message_vars;
    // const isPressable = useMemo(() => {
    //     return (
    //         template === EVENT_NOTIFICATIONS.EVENT_LIVE ||
    //         template === EVENT_NOTIFICATIONS.REMINDER_24_HOUR ||
    //         template === EVENT_NOTIFICATIONS.REMINDER_1_HOUR ||
    //         template === TICKET_NOTIFICATIONS.TRANSFERRED_CLAIMED
    //     );
    // }, [template]);
    // const isUserEvent = useMemo(
    //     () => template === EVENT_NOTIFICATIONS.READY_TO_SELL,
    //     [EVENT_NOTIFICATIONS, userInfo]
    // );
    // const notificationMessage = useMemo(
    //     () => createMessage(message, message_vars, isPressable),
    //     [message, isPressable, message_vars, createMessage]
    // );
    // const time = useMemo(
    //     () => createTimeString(item.event_time),
    //     [item.event_time]
    // );
    // const onPress = () => {
    //     if (!isPressable) return;
    //     closeNotifications();
    //     navigationRef.current?.navigate(HOME.SPLASH, {
    //         isLive: template === EVENT_NOTIFICATIONS.EVENT_LIVE,
    //         // ticketsAvailable: 0,
    //         eventName: message_vars.event_name
    //             ? message_vars.event_name
    //             : message_vars.event_link,
    //         hostName: message_vars.recipient_name
    //             ? message_vars.recipient_name
    //             : message_vars.host_name,
    //         avatar: recipient_avatar.asset_path,
    //         eventStartDatetime: item.event_time,
    //         eventId: item.id,
    //         hostId: !isUserEvent ? faker.datatype.uuid() : userInfo.id,
    //     });
    // };
    const Container = true ? TouchableOpacity : View;
    const containerProps = useMemo(() => {
        if (true) {
            return {
                onPress: () => {
                    navigationRef.current?.navigate(HOME.SPLASH, {
                        eventId,
                    });
                    closeNotifications();
                },
                style: classes.pressableParentContainer,
                innerStyle: classes.container,
                key: faker.datatype.uuid(),
            };
        }
        return {
            style: classes.container,
        };
    }, []);

    return (
        <Container {...containerProps} style={classes.container}>
            <View style={classes.notificationInfo}>
                <View style={classes.leftData}>
                    <Avatar
                        source={{ uri: imageSourceWithoutCache(avatar) }}
                        resizeMode="cover"
                        style={classes.image}
                    />
                    <View style={classes.textData}>
                        <TextRegular style={classes.message} size={14}>
                            {getNotificationMessage(type, translationVars)}
                        </TextRegular>
                        <TextRegular color={eventTextColors[eventTextColor]}>
                            {eventName}
                        </TextRegular>
                    </View>
                </View>
            </View>
            <TextRegular style={classes.time}>
                {formatDateOnlyTime(createdAt)}
            </TextRegular>
        </Container>
    );
}

Notification.propTypes = {
    item: PropTypes.shape({
        username: PropTypes.string,
        type: PropTypes.any,
        linkTitle: PropTypes.string,
        time: PropTypes.string,
        finished: PropTypes.bool,
        image: PropTypes.string,
    }).isRequired,
};

export default memo(Notification);
