import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import LiveBug from 'kwivrr-ui/LiveBug';
import KwivrrImage from 'kwivrr-ui/KwivrrImage/KwivrrImage';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { HOME } from 'kwivrr-common/data/types/navigation';

function EventImage({
    source,
    isLive,
    ticketsAvailable,
    isSoldOut,
    bookable,
    eventImage,
    eventName,
    hostName,
    avatar,
    eventStartDatetime,
    event,
    eventId,
    eventIndex,
    setEvents,
    hasImage,
}) {
    const { navigate } = useNavigation();
    const classes = useStyles(styles);

    return (
        <View style={classes.eventImage}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                    navigate(HOME.SPLASH, {
                        eventId: event.id,
                        eventIndex,
                        setEvents,
                        splashFromHome: true,
                    })
                }
            >
                <KwivrrImage
                    style={classes.image}
                    source={source}
                    resizeMode="cover"
                    includingKwivrrBackground
                    hasImage={hasImage}
                />
            </TouchableOpacity>
            {isLive && (
                <LiveBug
                    onPress={() =>
                        navigate(HOME.SPLASH, {
                            eventId: eventId,
                            eventIndex,
                            setEvents,
                            splashFromHome: true,
                        })
                    }
                />
            )}
        </View>
    );
}

// refactor this
EventImage.propTypes = {
    source: PropTypes.any,
    isLive: PropTypes.any,
    ticketsAvailable: PropTypes.any,
    isSoldOut: PropTypes.any,
    bookable: PropTypes.any,
    eventImage: PropTypes.any,
    eventName: PropTypes.any,
    hostName: PropTypes.any,
    avatar: PropTypes.any,
    eventStartDatetime: PropTypes.any,
    event: PropTypes.any,
};

export default EventImage;
