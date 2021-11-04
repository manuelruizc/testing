import React, { useEffect } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import Header from './Header';
import HeaderFallback from './HeaderFallback';

export default function ({ eventId, ...rest }) {
    const query = useQuery('getEventPublicMethod', { id: eventId });

    return (
        <ResultQuery
            query={query}
            Success={Header}
            Loading={HeaderFallback}
            normalizeProps={(p) => {
                return {
                    event: p,
                };
            }}
            {...rest}
            eventId={eventId}
            refetch={query.refetch}
        />
    );
}
