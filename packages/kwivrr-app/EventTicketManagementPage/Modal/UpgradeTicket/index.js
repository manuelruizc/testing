import React from 'react';
import UpgradeTicket from './UpgradeTicket';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';

export default function (props) {
    const { ticketId } = props;
    const query = useQuery(
        'getUpgradeEventTicketDetails',
        { id: ticketId },
        'UpgradeModal'
    );
    return (
        <ResultQuery
            query={query}
            Success={UpgradeTicket}
            normalizeProps={(p) => {
                return {
                    ticketInfo: p,
                };
            }}
            {...props}
        />
    );
}
