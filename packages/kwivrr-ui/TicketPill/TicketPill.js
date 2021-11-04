import React, { useMemo } from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import KwivrrIcon from '../KwivrrIcon';
import TextRegular from '../TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { AUTH_STATE } from 'kwivrr-common/AuthContext';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import useWaitList from 'kwivrr-hooks/useWaitList';

function TicketPill({
    status = false,
    tickets = 0,
    hasWaitList = true,
    onPress = null,
    eventInfo,
    eventId,
}) {
    const { palette } = useTheme();
    const { isAndroid } = usePlatform();
    const { openWaitListModal } = useWaitList();
    const classes = useStyles(styles);
    const { userInfo, setAuthState, userIsLogged } = useAuthCredentials();
    const pillStatus = useMemo(() => {
        if (!userInfo) return false;
        return status;
    }, [status, userInfo]);
    const color = useMemo(() => {
        const { blue, green, gray, waitlist } = palette.pillsColors;
        if (tickets > 0 && userIsLogged) {
            return green;
        }
        if ((tickets === 0 && status) || status) {
            return blue;
        }
        if (hasWaitList && !status) return waitlist;
        return gray;
    }, [pillStatus, tickets, status]);
    const ticketsCount = useMemo(() => {
        if (!userIsLogged) return -1;
        return tickets;
    }, [tickets, userIsLogged]);

    if (status && onPress) {
        const onPressFunction =
            status && !userInfo
                ? () => {
                      Alert.alert(
                          'You need to log in',
                          'You need to log in or sign up to buy tickets',
                          [
                              {
                                  text: 'Cancel',
                                  style: 'cancel',
                              },
                              {
                                  text: 'OK',
                                  onPress: () =>
                                      setAuthState(AUTH_STATE.LOGIN_IN),
                              },
                          ]
                      );
                  }
                : onPress;
        return (
            <TouchableOpacity onPress={onPressFunction}>
                <View
                    style={[classes.pillContainer, { backgroundColor: color }]}
                >
                    <KwivrrIcon
                        name="check-circle"
                        color="#FFFFFF"
                        size={isAndroid ? 15 : 14}
                        style={{
                            marginRight: ticketsCount > 0 ? 4 : 0,
                        }}
                    />
                    <TextRegular size={13} color="#FFFFFF">
                        {ticketsCount > 0 && tickets}
                    </TextRegular>
                </View>
            </TouchableOpacity>
        );
    }

    if (!status && userInfo) {
        const onPress = () => {
            openWaitListModal(eventInfo);
        };
        return (
            <TouchableOpacity onPress={onPress}>
                <View
                    style={[classes.pillContainer, { backgroundColor: color }]}
                >
                    <KwivrrIcon
                        name="check-circle"
                        color="#FFFFFF"
                        size={isAndroid ? 15 : 14}
                        style={{
                            marginRight: ticketsCount > 0 ? 4 : 0,
                        }}
                    />
                    <TextRegular size={13} color="#FFFFFF">
                        {ticketsCount > 0 && tickets}
                    </TextRegular>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <View style={[classes.pillContainer, { backgroundColor: color }]}>
            <KwivrrIcon
                name="check-circle"
                color="#FFFFFF"
                size={isAndroid ? 15 : 14}
                style={{ marginRight: tickets > 0 ? 4 : 0 }}
            />
            {tickets > 0 && (
                <TextRegular size={13} color="#FFFFFF">
                    {ticketsCount > 0 && tickets}
                </TextRegular>
            )}
        </View>
    );
}

TicketPill.propTypes = {
    status: PropTypes.bool,
    tickets: PropTypes.number,
    hasWaitList: PropTypes.bool,
    onPress: PropTypes.func,
    eventInfo: PropTypes.shape({
        eventImage: PropTypes.string.isRequired,
        eventStartDatetime: PropTypes.string.isRequired,
        eventName: PropTypes.string.isRequired,
        hostName: PropTypes.string.isRequired,
        hostAvatar: PropTypes.string.isRequired,
    }).isRequired,
};

export default TicketPill;
