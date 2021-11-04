import React, { useEffect } from 'react';
import useQuery from 'kwivrr-hooks/useQuery';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import ListItem from './ListItem';
import useAppActions from 'kwivrr-hooks/useAppActions';
import ListItemFallback from './ListItemFallback';

export default function ({
    startDate,
    scope,
    refreshing,
    setRefreshing,
    ...rest
}) {
    const {
        ticketPurchased,
        clearAddedNewPurchasedEvent,
        addingNewHomeEvent,
        details,
    } = useAppActions();
    const query = useQuery('getEventsPublic', { scope, page: 1 }, 'List-Items');
    const { refetch } = query;

    useEffect(() => {
        if (details.screen === null && details.action === null) {
            return;
        }
        if (
            details.screen === 'ListView' &&
            details.action === 'delete' &&
            addingNewHomeEvent
        ) {
            return;
        }
        if (ticketPurchased || addingNewHomeEvent) {
            refetch();
            clearAddedNewPurchasedEvent();
        }
    }, [ticketPurchased, addingNewHomeEvent, details]);

    useEffect(() => {
        refetch();
        setRefreshing(false);
    }, [refreshing]);

    return (
        <ResultQuery
            query={query}
            Success={ListItem}
            Loading={ListItemFallback}
            normalizeProps={(p) => {
                return {
                    events: p.entries,
                    listSummary: p.listSummary,
                    criteriaSummary: p.criteriaSummary,
                };
            }}
            scope={scope}
            daySelected={startDate}
            {...rest}
        />
    );
}
