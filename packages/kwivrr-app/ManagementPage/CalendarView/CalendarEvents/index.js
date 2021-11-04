import React, { useEffect } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import CalendarEvents from './CalendarEvents';
import CardFallback from '../../CardFallback';
import { View } from 'react-native';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useAppActions from 'kwivrr-hooks/useAppActions';

export default function ({ startDate, scope, ...rest }) {
    const {
        ticketPurchased,
        clearAddedNewPurchasedEvent,
        addingNewHomeEvent,
        details,
    } = useAppActions();

    const query = useQuery(
        'getEventsPublic',
        { scope, page: 1, startDate },
        'Calendarview'
    );

    useEffect(() => {
        if (details.screen === null && details.action === null) {
            return;
        }
        if (
            details.screen === 'CalendarView' &&
            details.action === 'delete' &&
            addingNewHomeEvent
        ) {
            return;
        }
        if (ticketPurchased || addingNewHomeEvent) {
            query.refetch();
            clearAddedNewPurchasedEvent();
        }
    }, [ticketPurchased, addingNewHomeEvent, details]);

    return (
        <ResultQuery
            query={query}
            Success={CalendarEvents}
            Loading={CalendarEventsFallback}
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

const CalendarEventsFallback = () => {
    const { screenWidth } = useDimensions();
    return (
        <View
            style={{
                width: screenWidth,
                borderRadius: 12,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 12,
            }}
        >
            {new Array(3).fill(null).map((_, index) => (
                <CardFallback key={index} />
            ))}
        </View>
    );
};
