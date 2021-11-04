import React from 'react';
import NotificationsSettings from './NotificationsSettings';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';

export default function () {
    const query = useQuery('getNotificationsSettings', { id: 'me' });
    return (
        <ResultQuery
            query={query}
            Success={NotificationsSettings}
            normalizeProps={(p) => {
                return {
                    settings: p.data.data,
                };
            }}
        />
    );
}
