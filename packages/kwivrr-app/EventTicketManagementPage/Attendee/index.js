import React, { useState } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import Attendee from './Attendee';
import AttendeeFallback from './AttendeeFallback';

export default function ({ eventId, ...rest }) {
    const [page, setPage] = useState(1);
    const query = useQuery('getEventTicketsAttendee', {
        eventId,
        // scope: 'own',
        term: '',
        page: page,
    });
    return (
        <ResultQuery
            query={query}
            Success={Attendee}
            Loading={AttendeeFallback}
            normalizeProps={(p) => {
                return {
                    apiTickets: p.entries,
                    listSummary: p.listSummary,
                };
            }}
            eventId={eventId}
            {...rest}
            page={page}
            setPage={setPage}
        />
    );
}
