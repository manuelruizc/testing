import React, { useReducer } from 'react';
import { Switch, View } from 'react-native';
import PropTypes from 'prop-types';
import SettingsLayout from 'kwivrr-ui/SettingsLayout';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrSwitch from 'kwivrr-ui/KwivrrSwitch';
import { useNavigation } from '@react-navigation/core';
import useActions from 'kwivrr-hooks/useActions';

function getInitialState() {
    return {
        registeredEvent: false,
        oneHour: false,
        twentyFourHours: false,
        kwivrrMarketing: false,
    };
}

const initialState = getInitialState();

const ACTIONS = {
    REGISTERED_EVENT: 'REGISTERED_EVENT',
    ONE_HOUR: 'ONE_HOUR',
    TWENTY_FOUR_HOURS: 'TWENTY_FOUR_HOURS',
    KWIVRR_MARKETING: 'KWIVRR_MARKETING',
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.REGISTERED_EVENT:
            return {
                ...state,
                registeredEvent: !state.registeredEvent,
            };
        case ACTIONS.ONE_HOUR:
            return {
                ...state,
                oneHour: !state.oneHour,
            };
        case ACTIONS.TWENTY_FOUR_HOURS:
            return {
                ...state,
                twentyFourHours: !state.twentyFourHours,
            };
        case ACTIONS.KWIVRR_MARKETING:
            return {
                ...state,
                kwivrrMarketing: !state.kwivrrMarketing,
            };
        default:
            throw new Error();
    }
}

const postKeys = {
    registeredEvent: 'registered_event_start',
    oneHour: 'registered_event_1_hour_before',
    twentyFourHours: 'registered_event_24_hours_before',
    kwivrrMarketing: 'registered_event_is_live',
};

function Notifications({ settings }) {
    const { goBack } = useNavigation();
    const { onChangeNotificationSettings } = useActions();
    const {
        registered_event_start: registeredEvent,
        registered_event_1_hour_before: oneHour,
        registered_event_24_hours_before: twentyFourHours,
        registered_event_is_live: kwivrrMarketing,
    } = settings.attributes;
    const [state, dispatch] = useReducer(reducer, {
        registeredEvent,
        oneHour,
        twentyFourHours,
        kwivrrMarketing,
    });
    const classes = useStyles(styles);
    const updateSettings = (key, newValue) => {
        const _key = postKeys[key];
        onChangeNotificationSettings({ id: 'me', [_key]: newValue });
    };

    return (
        <SettingsLayout onPress={goBack}>
            <TextHeader size={18} style={classes.title}>
                Notifications
            </TextHeader>
            <View style={classes.optionContainer}>
                <TextRegular size={16}>Registered Event Starts</TextRegular>
                <KwivrrSwitch
                    onChange={() =>
                        dispatch({ type: ACTIONS.REGISTERED_EVENT })
                    }
                    onValueChange={(value) =>
                        updateSettings('registeredEvent', value)
                    }
                    value={state.registeredEvent}
                />
            </View>
            <View style={classes.optionContainer}>
                <TextRegular size={16}>
                    1 Hour Until Registered Event
                </TextRegular>
                <KwivrrSwitch
                    onChange={() => dispatch({ type: ACTIONS.ONE_HOUR })}
                    onValueChange={(value) => updateSettings('oneHour', value)}
                    value={state.oneHour}
                />
            </View>
            <View style={classes.optionContainer}>
                <TextRegular size={16}>
                    24 Hours Until Registered Event
                </TextRegular>
                <KwivrrSwitch
                    onChange={() =>
                        dispatch({ type: ACTIONS.TWENTY_FOUR_HOURS })
                    }
                    onValueChange={(value) =>
                        updateSettings('twentyFourHours', value)
                    }
                    value={state.twentyFourHours}
                />
            </View>
            <View style={classes.optionContainer}>
                <TextRegular size={16}>Event Is Live</TextRegular>
                <KwivrrSwitch
                    onChange={() =>
                        dispatch({ type: ACTIONS.KWIVRR_MARKETING })
                    }
                    onValueChange={(value) =>
                        updateSettings('kwivrrMarketing', value)
                    }
                    value={state.kwivrrMarketing}
                />
            </View>
        </SettingsLayout>
    );
}

Notifications.propTypes = {
    navigation: PropTypes.object,
};

export default Notifications;
