import React from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import StreamPage from './StreamPage';

export default function (props) {
    const { eventId } = props.route.params;
    const query = useQuery('getEventPublicMethod', { id: eventId });
    return (
        <ResultQuery
            query={query}
            Success={StreamPage}
            normalizeProps={(p) => {
                return {
                    event: p,
                };
            }}
            {...props}
            eventId={eventId}
        />
    );
}
