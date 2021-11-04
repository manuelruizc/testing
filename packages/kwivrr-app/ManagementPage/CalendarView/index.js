import React, { useEffect } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import CalendarView from './CalendarView';
import CalendarFallback from './CalendarFallback';

import useQuery from 'kwivrr-hooks/useQuery';
import useAppActions from 'kwivrr-hooks/useAppActions';
import moment from 'moment';

const startDate = moment(new Date()).startOf('month').format('YYYY-MM-DD');
const endDate = moment(new Date()).endOf('month').format('YYYY-MM-DD');

export default function (props) {
    const {
        ticketPurchased,
        clearAddedNewPurchasedEvent,
        addingNewHomeEvent,
        details,
    } = useAppActions();

    const query = useQuery('getEventCalendar', {
        startDate,
        endDate,
    });
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
        // if (ticketPurchased || addingNewHomeEvent) {
        //     refetch();
        //     clearAddedNewPurchasedEvent();
        // }
    }, [ticketPurchased, addingNewHomeEvent]);

    return (
        <ResultQuery
            query={query}
            Success={CalendarView}
            Loading={CalendarFallback}
            normalizeProps={(p) => {
                return {
                    events: p,
                };
            }}
            startDate={startDate}
            endDate={endDate}
            {...props}
        />
    );
}
