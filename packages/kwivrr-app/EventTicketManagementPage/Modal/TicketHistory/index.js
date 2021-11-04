import React from 'react';
import useQuery from 'kwivrr-hooks/useQuery';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import TicketHistory from './TicketHistory';

export default function ({
    ticket,
    type,
    ticketId,
    ticketIndex,
    setTickets,
    ...rest
}) {
    const query = useQuery('getEventTicketHistory', { id: ticketId });
    return (
        <ResultQuery
            query={query}
            Success={TicketHistory}
            normalizeProps={(p) => {
                return {
                    ticketHistory: p.entries,
                };
            }}
            {...rest}
        />
    );
}
