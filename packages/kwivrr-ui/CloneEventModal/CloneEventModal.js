import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import AuthButton from 'kwivrr-ui/AuthButton';
import { MANAGEMENT } from 'kwivrr-common/data/types/navigation';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';
import useActions from 'kwivrr-hooks/useActions';
import useTheme from 'kwivrr-hooks/useTheme';
import useAppActions from 'kwivrr-hooks/useAppActions';

const CloneEventModal = ({ eventId, closeModal }) => {
    const { onCloneEvent } = useActions();
    const { addNewEvent } = useAppActions();
    const [loading, setLoading] = useState(false);
    const { navigate } = useNavigation();
    const { palette } = useTheme();
    const classes = useStyles(styles);
    const [title, setTitle] = useState('');
    const navigateTo = (eventId) => {
        const params = {
            comingFromManagement: true,
            comingFrom: false,
            eventId,
            isHost: true,
        };
        return navigate(MANAGEMENT.EVENTMANAGEMENT, params);
    };

    const cloneEvent = async () => {
        try {
            setLoading(true);
            const response = await onCloneEvent({ id: eventId, title });
            addNewEvent('CloneEvent');
            const { id } = response;
            setLoading(false);
            closeModal();
            navigateTo(id);
        } catch (e) {
            setLoading(false);
            Alert.alert(
                'There was an error while cloning the event.',
                'Try again.'
            );
            console.log(e);
        }
    };

    return (
        <View style={classes.container}>
            <InputComponent
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={{ width: '80%', marginBottom: 32 }}
                label="Title"
                placeholder="Event title"
                inputStyle={classes.inputStyle}
                touched={true}
                error={title.length === 0 ? 'Required' : undefined}
            />
            <AuthButton
                disabled={title.length === 0}
                style={{ ...classes.button }}
                buttonStyle={{ ...classes.buttonStyle }}
                textFontSize={18}
                textColor="#FFFFFF"
                backgroundColor={palette.button.primary}
                uppercase={false}
                onPress={cloneEvent}
                isLoading={loading}
                activityIndicatorColor="#FFFFFF"
            >
                Clone Event
            </AuthButton>
        </View>
    );
};

export default CloneEventModal;
