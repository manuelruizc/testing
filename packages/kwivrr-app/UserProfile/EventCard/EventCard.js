import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import faker from 'faker';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import LiveBug from 'kwivrr-ui/LiveBug';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import TicketPill from 'kwivrr-ui/TicketPill';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import { HOME, STACKS, MANAGEMENT } from 'kwivrr-common/data/types/navigation';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import useTheme from 'kwivrr-hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import Touchable from 'kwivrr-ui/Touchable';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

const EventCard = ({ event, upcoming, hosting }) => {
    const {
        eventImageUrl,
        title,
        startDate,
        isLive,
        isSoldOut,
        userTickets,
        hostName,
        avatar,
        userTicketsCount,
        id: eventId,
        shareUrl,
    } = event;
    const { navigate } = useNavigation();
    const classes = useStyles(styles, { upcoming });
    const { openModal } = useShareModal();
    const { palette } = useTheme();
    const openShareModal = () => {
        openModal({
            eventImageUrl,
            eventName: title,
            eventStartDatetime: defaultDateFormat(startDate),
            eventId,
            shareUrl,
        });
    };
    const onPress = () => {
        if (userTicketsCount > 0) {
            const params = {
                eventImage: eventImageUrl,
                eventStartDatetime: defaultDateFormat(startDate),
                eventName: title,
                hostName,
                hostAvatar,
                comingFromManagement: true,
                comingFrom: HOME.USER_PROFILE,
                event,
            };
            return navigate(STACKS.MANAGEMENT, {
                params,
                screen: MANAGEMENT.EVENTMANAGEMENT,
            });
        }
    };
    const onSplashPress = () => {
        return navigate(HOME.SPLASH, {
            isLive,
            ticketsAvailable: userTickets,
            isSoldOut,
            eventImage: eventImageUrl,
            eventName: title,
            hostName,
            avatar,
            eventStartDatetime: defaultDateFormat(startDate),
            event,
            eventId,
        });
    };
    return (
        <View style={classes.card}>
            <Touchable
                onPress={upcoming ? onSplashPress : null}
                style={classes.cardImage}
                activeOpacity={upcoming ? 0.4 : 1}
            >
                <KwivrrImage
                    source={{ uri: imageSourceWithoutCache(eventImageUrl) }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                    includingKwivrrBackground
                />
                {isLive && <LiveBug />}
            </Touchable>
            <View style={classes.cardFooter}>
                <View style={classes.topInfo}>
                    <Touchable
                        onPress={upcoming ? onSplashPress : null}
                        style={classes.eventNameButton}
                        activeOpacity={upcoming ? 0.4 : 1}
                    >
                        <TextHeader
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={classes.eventName}
                        >
                            {title}
                        </TextHeader>
                    </Touchable>
                    {upcoming && !hosting && (
                        <View style={classes.topInfoOptions}>
                            {/* <TicketPill
                                onPress={onPress}
                                status={!isSoldOut}
                                tickets={userTicketsCount}
                            /> */}
                            <TouchableOpacity
                                style={{ marginLeft: 6 }}
                                onPress={openShareModal}
                            >
                                <KwivrrIcon
                                    name="upload"
                                    size={16}
                                    color={palette.button.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <TextRegular>{defaultDateFormat(startDate)}</TextRegular>
            </View>
        </View>
    );
};

export default EventCard;
