import React, { memo, useState, useEffect } from 'react';
import useActions from 'kwivrr-hooks/useActions';
import LiveStreamPage from './LiveStreamPage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const LivestreamEmbedPage = (props) => {
    const isFocused = useIsFocused();
    const { goBack } = useNavigation();
    const { eventId } = props;
    const [isloaded, setIsLoaded] = useState(false);
    const [event, setEvent] = useState(null);
    const { onPostEventAttendee } = useActions();

    useEffect(() => {
        if (isFocused) {
            onPostEventAttendee({ eventId })
                .then((event) => {
                    setEvent(event);
                    setIsLoaded(true);
                })
                .catch((error) => {
                    setIsLoaded(false);
                    goBack();
                });
        } else {
            setIsLoaded(false);
            setEvent(null);
        }
    }, [isFocused]);

    if (!isFocused) return null;

    if (isloaded) return <LiveStreamPage event={event} {...props} />;
    return null;
};

export default memo(LivestreamEmbedPage);
