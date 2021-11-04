import React, { useEffect, useState } from 'react';
import useQuery from 'kwivrr-hooks/useQuery';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import CardSection from './CardSection';
import useAppActions from 'kwivrr-hooks/useAppActions';

export default function (props) {
    const {
        ticketPurchased,
        clearAddedNewPurchasedEvent,
        addingNewHomeEvent,
        details,
    } = useAppActions();
    const { scope = 'hosting', start_date = '2021-05-05' } = props;
    const query = useQuery('getEventsPublic', { scope, page: 1 }, 'Card-View');
    const { refetch } = query;

    useEffect(() => {
        if (details.screen === null && details.action === null) {
            return;
        }
        if (
            details.screen === 'CardView' &&
            details.action === 'delete' &&
            addingNewHomeEvent
        ) {
            return;
        }
        if (ticketPurchased || addingNewHomeEvent) {
            // console.log('yessss');
            refetch();
            clearAddedNewPurchasedEvent();
        }
    }, [ticketPurchased, addingNewHomeEvent, details]);

    return (
        <ResultQuery
            query={query}
            Success={CardSection}
            {...props}
            normalizeProps={(p) => {
                return {
                    events: p.entries,
                    listSummary: p.listSummary,
                    criteriaSummary: p.criteriaSummary,
                };
            }}
        />
    );
}
