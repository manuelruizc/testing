import React from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import ViewTicket from './ViewTicket';

export default function (props) {
    const { ticketId } = props;
    const query = useQuery('getEventTicket', { id: ticketId });
    return (
        <ResultQuery
            query={query}
            Success={ViewTicket}
            normalizeProps={(p) => {
                return {
                    ticketInfo: p,
                };
            }}
            {...props}
        />
    );
}
