import React from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import CancelRefund from './CancelRefund';

export default function (props) {
    const { ticketId } = props;
    const query = useQuery('getRevokeTicketRefundBreakdown', { id: ticketId });
    return (
        <ResultQuery
            query={query}
            Success={CancelRefund}
            normalizeProps={(p) => {
                return {
                    refundBreakdown: p.refundBreakdown,
                    creditCard: p.creditCard,
                    echeck: p.echeck,
                };
            }}
            {...props}
        />
    );
}
