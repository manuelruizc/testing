import React from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import NotificationsContainer from './NotificationsContainer';

export default function (props) {
    const query = useQuery('getNotifications', { page: 1 });
    return (
        <ResultQuery
            query={query}
            Success={NotificationsContainer}
            normalizeProps={(p) => {
                return {
                    initialNotifications: p.entries,
                };
            }}
            {...props}
        />
    );
}
