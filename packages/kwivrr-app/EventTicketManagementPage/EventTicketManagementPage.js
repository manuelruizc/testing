import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Host from './Host';
import Attendee from './Attendee';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

function HostEventManagementPage(props) {
    const { userInfo } = useAuthCredentials();
    const { navigation, route } = props;
    const {
        event,
        eventName,
        hostName,
        hostAvatar,
        eventImage,
        eventStartDatetime,
        comingFromManagement,
        comingFrom,
        isHost = false,
        eventId,
    } = route?.params;
    const classes = useStyles(styles);

    return (
        <View style={classes.container}>
            {isHost ? (
                <Host
                    event={event}
                    comingFrom={comingFrom}
                    comingFromManagement={comingFromManagement}
                    event={event}
                    hostAvatar={hostAvatar}
                    eventName={eventName}
                    eventImage={eventImage}
                    eventStartDatetime={eventStartDatetime}
                    hostName={hostName}
                    eventId={eventId}
                />
            ) : (
                <Attendee
                    event={event}
                    comingFrom={comingFrom}
                    comingFromManagement={comingFromManagement}
                    event={event}
                    hostAvatar={hostAvatar}
                    eventName={eventName}
                    eventImage={eventImage}
                    eventStartDatetime={eventStartDatetime}
                    hostName={hostName}
                    eventId={eventId}
                />
            )}
        </View>
    );
}

HostEventManagementPage.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.object.isRequired,
    }).isRequired,
};

export default HostEventManagementPage;
