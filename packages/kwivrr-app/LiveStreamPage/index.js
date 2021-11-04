import React, { useEffect, useState } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import LiveStreamPage from './LiveStreamPage';
import useQuery from 'kwivrr-hooks/useQuery';
import { ActionCableProvider } from 'kwivrr-hooks/useActionCable';
import kwivrrApi from 'kwivrr-common/sdk';
import LiveStreamWrapper from './LiveStreamWrapper';

export default function ({ route, ...rest }) {
    const { eventId } = route.params;
    const query = useQuery('getEventPublicMethod', {
        id: eventId,
        with_chat: true,
    });
    const authable = kwivrrApi.authable;
    const [accessToken, setAccessToken] = useState(false);
    useEffect(() => {
        kwivrrApi.authable.getAccessToken().then((accessToken) => {
            setAccessToken(accessToken);
        });
    }, []);
    if (accessToken === false) return null; // block until promise resolves

    return (
        <ActionCableProvider
            url={`wss://zevents.dev.vibeoffice.com/cable/api/v1?access_token=${accessToken}`}
        >
            {/* <ResultQuery
                query={query}
                Success={LiveStreamPage}
                normalizeProps={(p) => {
                    return {
                        event: p,
                    };
                }}
                route={route}
                eventId={eventId}
                {...rest}
            /> */}
            <LiveStreamWrapper eventId={eventId} route={route} {...rest} />
        </ActionCableProvider>
    );
}
