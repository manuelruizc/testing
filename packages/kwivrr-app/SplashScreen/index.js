import React from 'react';
import useQuery from 'kwivrr-hooks/useQuery';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import SplashScreen from './SplashScreen';

export default function ({ route }) {
    const { eventId } = route.params;
    const query = useQuery('getEventPublicMethod', { id: eventId });
    return (
        <ResultQuery
            query={query}
            Success={SplashScreen}
            route={route}
            eventId={eventId}
        />
    );
}
