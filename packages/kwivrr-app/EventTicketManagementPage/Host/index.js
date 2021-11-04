import React from 'react';
import Host from './Host';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import HostFallback from './HostFallback';

export default function ({ eventId, ...rest }) {
    const query = useQuery('getEventTicketsHost', {
        // scope: 'host',
        // term: 'email=',
        eventId,
        searchTerm: '',
        page: 1,
        scope: 'host',
    });
    return (
        <ResultQuery
            query={query}
            Success={Host}
            Loading={HostFallback}
            normalizeProps={(p) => {
                return {
                    tickets: p.entries,
                    listSummary: p.listSummary,
                };
            }}
            eventId={eventId}
            {...rest}
        />
    );
}
