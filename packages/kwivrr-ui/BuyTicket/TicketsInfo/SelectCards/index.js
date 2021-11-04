import React from 'react';
import useQuery from 'kwivrr-hooks/useQuery';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import SelectCards from './SelectCards';

export default function (props) {
    const query = useQuery('getDefaultCreditCardsBuyTicket', {});
    return (
        <ResultQuery
            query={query}
            Success={SelectCards}
            normalizeProps={(p) => {
                return {
                    cards: p.creditCards,
                };
            }}
            {...props}
        />
    );
}
