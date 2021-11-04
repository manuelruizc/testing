import React from 'react';
import useQuery from 'kwivrr-hooks/useQuery';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import AttendeeModalSuccess from './AttendeeModalSuccess';

export default function ({ eventId, ...rest }) {
    const query = useQuery('getEventAttendees', { eventId });
    return (
        <ResultQuery
            query={query}
            Success={AttendeeModalSuccess}
            normalizeProps={(p) => {
                return {
                    apiAttendees: p.entries,
                    listSummary: p.listSummary,
                    criteriaSummary: p.criteriaSummary,
                };
            }}
            {...rest}
            eventId={eventId}
        />
    );
}
